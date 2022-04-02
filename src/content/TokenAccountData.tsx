import {TokenAccount} from '../types';
import { PublicKey } from '@solana/web3.js';

import { u64 } from '@solana/spl-token';

const tokenData: TokenAccount[] =
[
    {
        address: new PublicKey(1),
        mint: new PublicKey(1),
        owner: new PublicKey(1),
        amount: new u64(1),
        delegate: new PublicKey(1),
        isInitialized: true,
        isNative: true,
        delegatedAmount: new u64(1),
        closeAuthority: new PublicKey(1)
    },
    {
        address: new PublicKey(2),
        mint: new PublicKey(2),
        owner: new PublicKey(2),
        amount: new u64(2),
        delegate: new PublicKey(2),
        isInitialized: true,
        isNative: true,
        delegatedAmount: new u64(2),
        closeAuthority: new PublicKey(2)
    },{
        address: new PublicKey(3),
        mint: new PublicKey(3),
        owner: new PublicKey(3),
        amount: new u64(3),
        delegate: new PublicKey(3),
        isInitialized: true,
        isNative: true,
        delegatedAmount: new u64(3),
        closeAuthority: new PublicKey(3)
    },{
        address: new PublicKey(4),
        mint: new PublicKey(4),
        owner: new PublicKey(4),
        amount: new u64(4),
        delegate: new PublicKey(4),
        isInitialized: true,
        isNative: true,
        delegatedAmount: new u64(4),
        closeAuthority: new PublicKey(4)
    },{
        address: new PublicKey(5),
        mint: new PublicKey(5),
        owner: new PublicKey(5),
        amount: new u64(5),
        delegate: new PublicKey(5),
        isInitialized: true,
        isNative: true,
        delegatedAmount: new u64(5),
        closeAuthority: new PublicKey(5)
    },{
        address: new PublicKey(6),
        mint: new PublicKey(6),
        owner: new PublicKey(6),
        amount: new u64(6),
        delegate: new PublicKey(6),
        isInitialized: true,
        isNative: true,
        delegatedAmount: new u64(6),
        closeAuthority: new PublicKey(6)
    },{
        address: new PublicKey(7),
        mint: new PublicKey(7),
        owner: new PublicKey(7),
        amount: new u64(7),
        delegate: new PublicKey(7),
        isInitialized: true,
        isNative: true,
        delegatedAmount: new u64(7),
        closeAuthority: new PublicKey(7)
    },{
        address: new PublicKey(8),
        mint: new PublicKey(8),
        owner: new PublicKey(8),
        amount: new u64(8),
        delegate: new PublicKey(8),
        isInitialized: true,
        isNative: true,
        delegatedAmount: new u64(8),
        closeAuthority: new PublicKey(8)
    },{
        address: new PublicKey(9),
        mint: new PublicKey(9),
        owner: new PublicKey(9),
        amount: new u64(9),
        delegate: new PublicKey(9),
        isInitialized: true,
        isNative: true,
        delegatedAmount: new u64(9),
        closeAuthority: new PublicKey(9)
    },
]

export default tokenData;