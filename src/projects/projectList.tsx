import { NetworkNames, Project } from "../types";
import { devnetProjects } from "./devnet";
import { mainnetProjects } from "./mainnet";

const projectList: Record<NetworkNames, Record<string, Project>> = {
  mainnet: mainnetProjects,
  devnet: devnetProjects,
  testnet: {},
};

export default projectList;

// Solend test option Dec 30, 2022 $2 CALL
// [
//   {
//       "expiration": 1672387200,
//       "optionMarketAddress": "ALSHaW3zrAD2jWKTSc6AWRRKhwgeS4o6Z5eBYmvcd2uP",
//       "optionContractMintAddress": "4No6cT82hTMd4sFAmuPj38iU8UtkB9sbHgm6y37FpVsL",
//       "optionWriterTokenMintAddress": "HXPudGHL5dqf8EgfSXFDqehLfkxmCzZCYs2jorkt9UxF",
//       "quoteAssetMint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
//       "quoteAssetPoolAddress": "2ysJVAAmqug97JwK9j7qSLutLEgSZiMjAH9ezk4Mb6e5",
//       "underlyingAssetMint": "SLNDpmoWTVADgEdndyvWzroNL7zSi1dF9PC3xHGtPwp",
//       "underlyingAssetPoolAddress": "HwVvNCTi78czneFMMR9RkEyicRZm6EQbZjVtkKyge1xP",
//       "underlyingAssetPerContract": "1000000",
//       "quoteAssetPerContract": "2000000",
//       "psyOptionsProgramId": "R2y9ip6mxmWUj4pt54jP2hz2dgvMozy9VTSwMWE7evs"
//   }
// ]
