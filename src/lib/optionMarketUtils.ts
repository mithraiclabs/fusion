import { OptionMarket } from "@mithraic-labs/psy-american";
import { Project } from "../types";

/**
 * Return a human readable display header for an option.
 * 
 * TODO: We need the Mint info from the tokens to calculate the strike in a human readable format.
 * 
 * @param project - The Project associated with the optionMarket
 * @param optionMarket - The OptionMarket for the held option
 * @returns 
 */
export const displayHeader = (project: Project, optionMarket: OptionMarket): string => {
  const expirationDate = new Date(optionMarket.expirationUnixTimestamp.toNumber() * 1000);
  return `${project.symbol} STRIKE ${expirationDate.getFullYear()}-${expirationDate.getMonth()}-${expirationDate.getDay()}`
}