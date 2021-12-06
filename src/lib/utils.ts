import { Program } from "@project-serum/anchor";
import {
  getAllOptionAccounts,
} from "@mithraic-labs/psy-american";
import {
  AccountLayout,
  MintInfo,
  MintLayout,
  TOKEN_PROGRAM_ID,
  u64,
} from "@solana/spl-token";
import { Project, ProjectOptions, TokenAccount } from "../types";
import { Connection, PublicKey } from "@solana/web3.js";

export const getAllWalletOptions = async (
  program: Program,
  projects: Project[]
) => {
  // Load all the PsyOptions option markets
  const optionMarkets = await getAllOptionAccounts(program);
  // Load all SPL Mint addresses of the connected wallet
  const resp = await program.provider.connection.getTokenAccountsByOwner(
    program.provider.wallet.publicKey,
    { programId: TOKEN_PROGRAM_ID }
  );
  const tokenAccounts: Record<string, TokenAccount> = {};
  resp.value.forEach(({ account, pubkey }) => {
    const decoded = AccountLayout.decode(account.data);
    // Not sure if there is a better way to decode this info
    const tokenAccount: TokenAccount = {
      address: pubkey,
      mint: new PublicKey(decoded.mint),
      owner: new PublicKey(decoded.owner),
      amount: new u64(decoded.amount),
      delegate: new PublicKey(decoded.delegate),
      isInitialized: decoded.state === 1,
      isNative: decoded.isNativeOption === 1,
      delegatedAmount: new u64(decoded.delegatedAmount),
      closeAuthority: new PublicKey(decoded.closeAuthority)
    };
    tokenAccounts[new PublicKey(tokenAccount.mint).toString()] = tokenAccount;
  });

  const matches: Record<string, ProjectOptions> = {};

  // NOTE: This only gets Long Calls
  optionMarkets.forEach((optionMarket) => {
    // Check if the underlyingMint is apart of a known project
    const project = projects.find(
      (project) =>
        optionMarket.underlyingAssetMint.toString() === project.mintAddress
    );
    if (!project) return;
    // Check if the wallet contains the option
    const tokenAccount = tokenAccounts[optionMarket.optionMint.toString()];
    if (!tokenAccount) return;

    const match = {
      optionMarket,
      tokenAccount,
    };
    if (matches[project.key] && Array.isArray(matches[project.key].options)) {
      matches[project.key].options.push(match);
    } else {
      matches[project.key] = {
        project: project,
        options: [match],
      };
    }
  });
  return matches;
};


export const loadMintInfo = async (
  connection: Connection,
  projectOptions: ProjectOptions[]
) => {
  // Extract all the unique mints from the projects and options
  const mintAddresses: Record<string, PublicKey> = {};
  projectOptions.forEach(({project, options}) => {
    if (!mintAddresses[project.mintAddress]) {
      mintAddresses[project.mintAddress] = new PublicKey(project.mintAddress);
    }
    options.forEach(({optionMarket}) => {
      if (!mintAddresses[optionMarket.underlyingAssetMint.toString()]) {
        mintAddresses[optionMarket.underlyingAssetMint.toString()] = optionMarket.underlyingAssetMint;
      } 
      if (!mintAddresses[optionMarket.quoteAssetMint.toString()]) {
        mintAddresses[optionMarket.quoteAssetMint.toString()] = optionMarket.quoteAssetMint;
      }
    })
  })
  
  const mintInfos: Record<string, MintInfo> = {};
  const mintAddressArr = Object.keys(mintAddresses);
  const resp = await connection.getMultipleAccountsInfo(Object.values(mintAddresses));
  resp.forEach((info, index) => {
    if (!info)
      return;
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
    mintInfos[mintAddressArr[index]] = mintInfo;
  });

  return mintInfos;
};