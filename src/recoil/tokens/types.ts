import { BN } from "@project-serum/anchor";

export type OrderBookInfo = [number, number, BN, BN][];

export type SerumOrderBook = { bids: OrderBookInfo; asks: OrderBookInfo };
