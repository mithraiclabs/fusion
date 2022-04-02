
import {MintInfoWithKey} from '../types';
import { PublicKey } from "@solana/web3.js";
import { u64 } from '@solana/spl-token';

import projectOptionsData from './ProjectOptionsData';

const mintInfosList: MintInfoWithKey[] = [
    {
        pubkey: new PublicKey(13241),
        mintAuthority: new PublicKey(91472),
        supply: new u64(10241),
        decimals: 5,
        isInitialized: true,
        freezeAuthority: null
    },
    {
        pubkey: new PublicKey(12341),
        mintAuthority: new PublicKey(93472),
        supply: new u64(10231),
        decimals: 3,
        isInitialized: true,
        freezeAuthority: null
    },
    {
        pubkey: new PublicKey(77341),
        mintAuthority: new PublicKey(98372),
        supply: new u64(13251),
        decimals: 4,
        isInitialized: true,
        freezeAuthority: null
    }
]

export default mintInfosList;

export const mintInfoRecord: Record<string, MintInfoWithKey> = {};
 
projectOptionsData.forEach((projectOption, index) => {
    mintInfoRecord[projectOption.project.mintAddress] = mintInfosList[index];
});