import { Project } from "../types";

export const devnetProjects: Record<string, Project> = {
  BzwRWwr1kCLJVUUM14fQthP6FJKrGpXjw3ZHTZ6PQsYa: {
    name: "PsyOptions",
    description: "A DO focused on the democratization of finance",
    logo: "https://user-images.githubusercontent.com/32071703/149460918-3694084f-2a37-4c95-93d3-b5aaf078d444.png",
    serumUsdMarket: "4Kz8UGuHLnng9x2hL5XMbPtxkqo8ubGzXenbbGjNVwW8",
    serumProgramId: "DESVgJVGajEgKGXhb6XmqDHGz3VjdgP7rEVESBgxmroY",
    mintAddress: "BzwRWwr1kCLJVUUM14fQthP6FJKrGpXjw3ZHTZ6PQsYa",
    symbol: "PSY",
    primaryColor: "#513471",
    website: "https://psyoptions.io/",
    twitter: "https://twitter.com/psyoptions",
    discord: "https://discord.gg/3ggjk2Rw",
    suggestedActions: ["PsyFinance", "Solend", "JupiterAg"],
  },
  C6kYXcaRUMqeBF5fhg165RWU7AnpT9z92fvKNoMqjmz6: {
    description: "Plain old BTC",
    mintAddress: "C6kYXcaRUMqeBF5fhg165RWU7AnpT9z92fvKNoMqjmz6",
    symbol: "BTC",
    name: "Wrapped Bitcoin (Sollet)",
    serumUsdMarket: "A8YFbxQYFVqKZaoYJLLUVcQiWP7G2MeEgW5wsAQgMvFw",
    serumProgramId: "DESVgJVGajEgKGXhb6XmqDHGz3VjdgP7rEVESBgxmroY",
    primaryColor: "#E79940",
    website: "https://bitcoin.org/en/",
    twitter: "https://bitcoin.org/en/",
    discord: "https://bitcoin.org/en/",
    logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E/logo.png",
    suggestedActions: ["PsyFinance"],
  },
  So11111111111111111111111111111111111111112: {
    description: "Solana",
    mintAddress: "So11111111111111111111111111111111111111112",
    symbol: "SOL",
    name: "Solana",
    serumUsdMarket: "A8YFbxQYFVqKZaoYJLLUVcQiWP7G2MeEgW5wsAQgMvFw",
    serumProgramId: "DESVgJVGajEgKGXhb6XmqDHGz3VjdgP7rEVESBgxmroY",
    primaryColor: "#9411c5",
    website: "https://bitcoin.org/en/",
    twitter: "https://bitcoin.org/en/",
    discord: "https://bitcoin.org/en/",
    logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
    suggestedActions: ["PsyFinance"],
  },
};

// Example PSY Dec 30, 2022 $1 CALL
//
// {
//   "expiration": 1672387200,
//   "optionMarketAddress": "Ap8vsZspKn3oGBhf166oJR5pcMcg7JS2b7TAh1yfSmg6",
//   "optionContractMintAddress": "CXw17p9L54GYFyexH1iyzh4UA4gpWmB2NHXAXE3LtrXT",
//   "optionWriterTokenMintAddress": "J9Youf5vRd1cYtbxmpak17z4x1L9acKQ3FsuUoi2wBFv",
//   "quoteAssetMint": "E6Z6zLzk8MWY3TY8E87mr88FhGowEPJTeMWzkqtL6qkF",
//   "quoteAssetPoolAddress": "8EmojcEX7WjVgtEcaRWiYWMrDRG5wJKQ7aoHTvuAn4et",
//   "underlyingAssetMint": "BzwRWwr1kCLJVUUM14fQthP6FJKrGpXjw3ZHTZ6PQsYa",
//   "underlyingAssetPoolAddress": "8FJ7yEfYKhwrs7jKABvdDQYKYkgD4A7qE1xym1owiidY",
//   "underlyingAssetPerContract": "1000000000",
//   "quoteAssetPerContract": "100",
//   "psyOptionsProgramId": "R2y9ip6mxmWUj4pt54jP2hz2dgvMozy9VTSwMWE7evs"
// }
