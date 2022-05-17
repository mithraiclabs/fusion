import { BN } from "@project-serum/anchor";
import { MintLayout, u64 } from "@solana/spl-token";
import { MintInfoWithKey, ProjectOptions, OptionAccount } from "../types";
import { Connection, PublicKey } from "@solana/web3.js";
import { OptionMarket } from "@mithraic-labs/psy-american";
import { Tokens } from "@mithraic-labs/psy-token-registry";

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
    if (mintInfo.mintAuthorityOption === 0) {
      mintInfo.mintAuthority = null;
    } else {
      mintInfo.mintAuthority = new PublicKey(mintInfo.mintAuthority);
    }

    mintInfo.supply = u64.fromBuffer(mintInfo.supply);
    mintInfo.isInitialized = mintInfo.isInitialized !== 0;

    if (mintInfo.freezeAuthorityOption === 0) {
      mintInfo.freezeAuthority = null;
    } else {
      mintInfo.freezeAuthority = new PublicKey(mintInfo.freezeAuthority);
    }
    mintInfos[mintAddressArr[index]] = {
      ...mintInfo,
      pubkey: new PublicKey(mintAddressArr[index]),
    };
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
  return d.toLocaleDateString() + " " + d.toLocaleTimeString();
};

export function displayStrikePrice(optionMarket: OptionMarket): string {
  const tokens = Tokens["mainnet"];
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
