import { Program } from '@project-serum/anchor';
import { getAllOptionAccounts, PsyAmericanIdl } from "@mithraic-labs/psy-american";
import { AccountInfo, AccountLayout, TOKEN_PROGRAM_ID } from '@solana/spl-token';

export const getAllWalletOptions = async (program: Program) => {
  // Load all the PsyOptions option markets
  const optionMarkets = await getAllOptionAccounts(program);
  console.log('*** optionMarkets', optionMarkets);
  // Load all SPL Mint addresses of the connected wallet
  const resp = await program.provider.connection.getTokenAccountsByOwner(program.provider.wallet.publicKey, {programId: TOKEN_PROGRAM_ID});
  const tokenAccounts = resp.value.map(({account}) => AccountLayout.decode(account.data) as AccountInfo);
  console.log('*** token accounts = ', tokenAccounts);
  // TODO: Filter option markets by optionMint if the user's tokens include the optionMint
};