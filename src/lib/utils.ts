import { BN } from "@project-serum/anchor";
import { Mint, MintLayout } from "@solana/spl-token2";
import { MintInfoWithKey, NetworkNames, ProjectOptions } from "../types";
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { OptionMarket } from "@mithraic-labs/psy-american";
import { Tokens } from "@mithraic-labs/psy-token-registry";
import { NetworkKeys, TokenAccountWithKey } from "../recoil";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { AccountLayout, Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";

const dtf = Intl.DateTimeFormat(undefined, { timeZoneName: "short" });

export const mapNetworkTypes = (key: NetworkKeys): NetworkNames => {
  switch (key) {
    case WalletAdapterNetwork.Mainnet:
      return "mainnet";
    case WalletAdapterNetwork.Devnet:
      return "devnet";
    default:
      return "mainnet";
  }
};
/**
 *
 * A human readable number for the amount of tokens that will be received if all contracts are
 * exercised.
 *
 * @param optionMeta
 * @param tokenAccount
 * @param network
 * @returns
 */
export const tokensToReceive = (
  optionMeta: OptionMarket,
  tokenAccount: TokenAccountWithKey,
  network: NetworkNames = "mainnet"
) => {
  const u64Amount = optionMeta.underlyingAmountPerContract.muln(
    Number(tokenAccount.amount)
  );
  // Factor in the underlying decimals
  const tokens = Tokens[network];
  const underlyingToken = tokens[optionMeta.underlyingAssetMint.toString()];
  const amount = u64Amount.toNumber() / Math.pow(10, underlyingToken.decimals);
  return { amount, symbol: underlyingToken.symbol };
};

/**
 *
 * A human readable number for the amount it will require to exercise the contracts
 * @param optionMeta
 * @param tokenAccount
 * @param network
 * @returns
 */
export const costToExercise = (
  optionMeta: OptionMarket,
  tokenAccount: TokenAccountWithKey,
  network: NetworkNames = "mainnet"
) => {
  const u64Amount = optionMeta.quoteAmountPerContract.muln(
    Number(tokenAccount.amount)
  );
  // Factor in the quote decimals
  const tokens = Tokens[network];
  const quoteToken = tokens[optionMeta.quoteAssetMint.toString()];
  const amount = u64Amount.toNumber() / Math.pow(10, quoteToken.decimals);
  return { amount, symbol: quoteToken.symbol };
};

export const loadMintInfo = async (
  connection: Connection,
  projectOptions: ProjectOptions[]
): Promise<Record<string, MintInfoWithKey>> => {
  // Extract all the unique mints from the projects and options
  const mintAddresses: Record<string, PublicKey> = {};
  projectOptions.forEach(({ project, options }) => {
    if (!mintAddresses[project.mintAddress]) {
      mintAddresses[project.mintAddress] = new PublicKey(project.mintAddress);
    }
    options.forEach(({ optionMarket }) => {
      if (!mintAddresses[optionMarket.underlyingAssetMint.toString()]) {
        mintAddresses[optionMarket.underlyingAssetMint.toString()] =
          optionMarket.underlyingAssetMint;
      }
      if (!mintAddresses[optionMarket.quoteAssetMint.toString()]) {
        mintAddresses[optionMarket.quoteAssetMint.toString()] =
          optionMarket.quoteAssetMint;
      }
    });
  });

  const mintInfos: Record<string, MintInfoWithKey> = {};
  const mintAddressArr = Object.keys(mintAddresses);
  const resp = await connection.getMultipleAccountsInfo(
    Object.values(mintAddresses)
  );
  resp.forEach((info, index) => {
    if (!info) return;
    const mintInfo = MintLayout.decode(info.data);
    console.log("*** decoded mintInfo", mintInfo);
    const val: Mint = {
      address: new PublicKey(mintAddressArr[index]),
      mintAuthority: mintInfo.mintAuthority ? mintInfo.mintAuthority : null,
      supply: mintInfo.supply,
      decimals: mintInfo.decimals,
      isInitialized: mintInfo.isInitialized,
      freezeAuthority: mintInfo.freezeAuthority,
    };
    return val;
  });

  return mintInfos;
};

export const bnToFloat = (
  amount: BN,
  decimals: number,
  decimalsToKeep: number = 2
) => {
  if (decimalsToKeep > decimals) {
    throw new Error("decimalsToKeep cannot be greater than decimals");
  }
  return (
    amount.div(new BN(10).pow(new BN(decimals - decimalsToKeep))).toNumber() /
    Math.pow(10, decimalsToKeep)
  );
};

export const displayExpirationDate = (optionMarket: OptionMarket) => {
  const d = new Date(optionMarket.expirationUnixTimestamp.toNumber() * 1_000);
  const timezoneAbbrev = dtf
    .formatToParts(d)
    .find((part) => part.type === "timeZoneName")?.value;
  return `${d.toLocaleDateString()} ${d
    .toLocaleTimeString()
    .substring(0, 5)} ${timezoneAbbrev}`;
};

export function displayStrikePrice(
  optionMarket: OptionMarket,
  network: NetworkNames
): string {
  const tokens = Tokens[network];
  const quoteToken = tokens[optionMarket.quoteAssetMint.toString()];
  const underlyingToken = tokens[optionMarket.underlyingAssetMint.toString()];
  const strike = calculateStrike(
    optionMarket.underlyingAmountPerContract,
    optionMarket.quoteAmountPerContract,
    quoteToken.decimals,
    underlyingToken.decimals
  );
  return `${strike.toFixed(2)} ${quoteToken.symbol}`;
}

export function calculateStrike(
  underlyingAmount: BN,
  quoteAmount: BN,
  quoteDecimals: number,
  underlyingDecimals: number
): number {
  const netDecimals = underlyingDecimals - quoteDecimals;
  let strike: number;
  if (netDecimals > 0) {
    strike =
      quoteAmount.mul(new BN(10).pow(new BN(netDecimals))).toNumber() /
      underlyingAmount.toNumber();
  } else {
    strike =
      quoteAmount
        .div(new BN(10).pow(new BN(Math.abs(netDecimals))))
        .toNumber() / underlyingAmount.toNumber();
  }
  return strike;
}

export const PSY_PROGRAM_ID = new PublicKey(
  "R2y9ip6mxmWUj4pt54jP2hz2dgvMozy9VTSwMWE7evs"
);

export const WRAPPED_SOL_ADDRESS =
  "So11111111111111111111111111111111111111112";

export async function initializeTokenAccountTx({
  connection,
  extraLamports = 0,
  payerKey,
  mintPublicKey,
  owner,
  rentBalance,
}: {
  connection: Connection;
  extraLamports?: number;
  payerKey: PublicKey;
  mintPublicKey: PublicKey;
  owner: PublicKey;
  rentBalance: number;
}): Promise<{ transaction: Transaction; newTokenAccount: Keypair }> {
  const newAccount = new Keypair();
  const transaction = new Transaction();

  let _rentBalance = rentBalance;
  if (!rentBalance) {
    _rentBalance = await connection.getMinimumBalanceForRentExemption(
      AccountLayout.span
    );
  }

  transaction.add(
    SystemProgram.createAccount({
      fromPubkey: payerKey,
      newAccountPubkey: newAccount.publicKey,
      lamports: _rentBalance + extraLamports,
      space: AccountLayout.span,
      programId: TOKEN_PROGRAM_ID,
    })
  );

  transaction.add(
    Token.createInitAccountInstruction(
      TOKEN_PROGRAM_ID,
      mintPublicKey,
      newAccount.publicKey,
      owner
    )
  );

  return { transaction, newTokenAccount: newAccount };
}
