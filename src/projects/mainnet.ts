import { Project } from "../types";

export const mainnetProjects: Record<string, Project> = {
  BzwRWwr1kCLJVUUM14fQthP6FJKrGpXjw3ZHTZ6PQsYa: {
    name: "PsyOptions",
    description: "A DO focused on the democratization of finance",
    logo: "https://user-images.githubusercontent.com/32071703/149460918-3694084f-2a37-4c95-93d3-b5aaf078d444.png",
    serumUsdMarket: "9WDPi1uZVxBwZY4NXy7A3nGfxAzxvNaS56iHk3cBhQ3U",
    serumProgramId: "9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin",
    mintAddress: "BzwRWwr1kCLJVUUM14fQthP6FJKrGpXjw3ZHTZ6PQsYa",
    symbol: "PSY",
    website: "https://psyoptions.io/",
    twitter: "https://twitter.com/psyoptions",
    discord: "https://discord.gg/3ggjk2Rw",
    suggestedActions: ["JupiterAg", "PsyFinance"],
  },
  SLNDpmoWTVADgEdndyvWzroNL7zSi1dF9PC3xHGtPwp: {
    name: "Solend",
    description:
      "Solend is the autonomous interest rate machine for lending on Solana",
    logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SLNDpmoWTVADgEdndyvWzroNL7zSi1dF9PC3xHGtPwp/logo.png",
    serumUsdMarket: "F9y9NM83kBMzBmMvNT18mkcFuNAPhNRhx7pnz9EDWwfv",
    serumProgramId: "9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin",
    mintAddress: "SLNDpmoWTVADgEdndyvWzroNL7zSi1dF9PC3xHGtPwp",
    primaryColor: "#E79940",
    symbol: "SLND",
    website: "https://solend.fi/",
    twitter: "https://twitter.com/solendprotocol",
    discord: "https://discord.com/invite/solend",
    suggestedActions: ["Solend", "JupiterAg"],
  },
  GePFQaZKHcWE5vpxHfviQtH5jgxokSs51Y5Q4zgBiMDs: {
    name: "Jungle Finance",
    description:
      "The liquid farming and staking solution for Solana-based assets.",
    logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/etCPUaMghWobVwxug5Vgxb6r3A7DEBdLKUywrnDrJeZ/logo.png",
    serumUsdMarket: "8TAd5ARuq5mYdY3t3PamRaE5Gf95JqgSpVmgTDwYyVXY",
    serumProgramId: "9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin",
    mintAddress: "GePFQaZKHcWE5vpxHfviQtH5jgxokSs51Y5Q4zgBiMDs",
    symbol: "JFI",
    website: "https://jungledefi.io/",
    twitter: "https://twitter.com/jungledefi",
    discord: "https://discord.com/invite/2DWjx5NywE",
    suggestedActions: ["JupiterAg"],
  },
  "9tzZzEHsKnwFL1A3DyFJwj36KnZj3gZ7g4srWp9YTEoh": {
    name: "Arb Protocol",
    description: "ARB is a decentralized arbitrage protocol.",
    mintAddress: "9tzZzEHsKnwFL1A3DyFJwj36KnZj3gZ7g4srWp9YTEoh",
    symbol: "ARB",
    serumUsdMarket: "Hc4YSWQMii3smLVRacH1JbPVH65ifBtoj4rGjVWKXmAs",
    serumProgramId: "9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin",
    logo: "https://raw.githubusercontent.com/ARBProtocol/arbprotocol/main/IMG_3600.png",
    website: "https://arbsolana.gitbook.io/arb-protocol/",
    twitter: "https://twitter.com/ArbProtocol",
    discord: "https://discord.com/invite/M4F8RKqgce",
    suggestedActions: ["JupiterAg"],
  },
  cxxShYRVcepDudXhe7U62QHvw8uBJoKFifmzggGKVC2: {
    name: "SolChicks",
    description: "The Best Play to Earn Crypto Fantasy Game on Solana",
    mintAddress: "cxxShYRVcepDudXhe7U62QHvw8uBJoKFifmzggGKVC2",
    symbol: "CHICKS",
    primaryColor: "#FAA046",
    serumUsdMarket: "Eg8a9ZicLPSyak4CiXfiMeJK6jmHq57Xx5ag5GY6vcDj",
    serumProgramId: "9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin",
    logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/cxxShYRVcepDudXhe7U62QHvw8uBJoKFifmzggGKVC2/logo.png",
    website: "https://www.solchicks.io/",
    twitter: "https://twitter.com/SolChicksNFT",
    discord: "https://discord.com/invite/solchicks",
    suggestedActions: ["JupiterAg"],
  },
};

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
