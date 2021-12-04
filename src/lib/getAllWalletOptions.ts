import { Program } from '@project-serum/anchor';
import { getAllOptionAccounts, OptionMarketWithKey, PsyAmericanIdl } from "@mithraic-labs/psy-american";
import { AccountInfo, AccountLayout, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Project } from '../types';
import { PublicKey } from '@solana/web3.js';

export const getAllWalletOptions = async (program: Program, projects: Project[]) => {
  console.log('*** projects', projects)
  // Load all the PsyOptions option markets
  const optionMarkets = await getAllOptionAccounts(program);
  console.log('*** optionMarkets', optionMarkets);
  // Load all SPL Mint addresses of the connected wallet
  const resp = await program.provider.connection.getTokenAccountsByOwner(program.provider.wallet.publicKey, {programId: TOKEN_PROGRAM_ID});
  const tokenAccounts: Record<string, AccountInfo> = {};
  resp.value.forEach(({account}) => {
    const tokenAccount = AccountLayout.decode(account.data) as AccountInfo;
    // TODO: The types here are incorrect. See if there is a better way to decode the token account
    tokenAccounts[new PublicKey(tokenAccount.mint).toString()] = tokenAccount;
  });
  
  const matches: Record<string,{
    optionMarket: OptionMarketWithKey;
    tokenAccount: AccountInfo;
  }[]> = {};

  // NOTE: This only gets Long Calls
  optionMarkets.forEach(optionMarket => {
    // Check if the underlyingMint is apart of a known project
    const project = projects.find(project => optionMarket.underlyingAssetMint.toString() === project.mintAddress);
    if (!project) return;
    // Check if the wallet contains the option
    const tokenAccount = tokenAccounts[optionMarket.optionMint.toString()]
    if (!tokenAccount) return;

    const match = {
      optionMarket,
      tokenAccount
    };
    if (Array.isArray(matches[project.key])) {
      matches[project.key].push(match);
    } else {
      matches[project.key] = [match]
    }
    console.log('*** matches', matches);
    return matches;
  })
};