import { Program } from "@project-serum/anchor";
import {
  getAllOptionAccounts,
} from "@mithraic-labs/psy-american";
import {
  AccountInfo,
  AccountLayout,
  TOKEN_PROGRAM_ID,
  u64,
} from "@solana/spl-token";
import { Project, ProjectOptions, TokenAccount } from "../types";
import { PublicKey } from "@solana/web3.js";

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
    console.log('** decoded', decoded)
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
  console.log('*** matches', matches)
  return matches;
};
