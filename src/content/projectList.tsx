import { Project } from "../types"

const projectList: Project[] = [
  {
    key: "mangomarkets",
    name: "Mango Markets",
    description: "Trade spot margined and perpetual futures markets, permissionless and all on-chain. Mango wants to merge the liquidity and usability of CeFi with the permissionless innovation of DeFi. All our work is open source for anyone to use and contribute.",
    logo: "https://mango.markets/img/logo_mango.svg",
    mintAddress: "C6kYXcaRUMqeBF5fhg165RWU7AnpT9z92fvKNoMqjmz6",
    symbol: "MNGO",
    serumSpotMarket: "3d4rzwpy9iGdCZvgxcu7B1YocYffVLsQXPXkBZKt2zLc",
    website: "https://mango.markets/",
    twitter: "https://twitter.com/mangomarkets",
    discord: "https://discord.com/invite/2uwjsBc5yw"
  }, 
  {
    key: "psyoptions",
    name: "PsyOptions",
    description: "Completely trustless American style options",
    logo: "https://user-images.githubusercontent.com/32071703/149460918-3694084f-2a37-4c95-93d3-b5aaf078d444.png",
    serumSpotMarket: "",
    mintAddress: "BzwRWwr1kCLJVUUM14fQthP6FJKrGpXjw3ZHTZ6PQsYa",
    symbol: "PSY",
    website: "https://psyoptions.io/",
    twitter: "https://twitter.com/psyoptions",
    discord: "https://discord.gg/3ggjk2Rw"
  },
  {
    key: "jungle-finance",
    name: "Jungle Finance",
    description: "The liquid farming and staking solution for Solana-based assets.",
    logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/etCPUaMghWobVwxug5Vgxb6r3A7DEBdLKUywrnDrJeZ/logo.png",
    serumSpotMarket: "",
    mintAddress: "",
    symbol: "JFI",
    website: "https://jungledefi.io/",
    twitter: "https://twitter.com/jungledefi",
    discord: "https://discord.com/invite/2DWjx5NywE"
  }
]

export default projectList;