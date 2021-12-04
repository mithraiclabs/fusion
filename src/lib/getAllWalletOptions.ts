import { Program } from '@project-serum/anchor';
import { getAllOptionAccounts, PsyAmericanIdl } from "@mithraic-labs/psy-american";

export const getAllWalletOptions = async (program: Program) => {
  // Load all the PsyOptions option markets
  const optionMarkets = await getAllOptionAccounts(program);
  console.log('*** optionMarkets', optionMarkets);
};