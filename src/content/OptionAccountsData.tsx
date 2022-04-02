import optionMarketData from './OptionMarketData';
import tokenAccountData from './TokenAccountData';
import {OptionAccount} from '../types';

const optionAccountsData: OptionAccount[] = [];

for (let i = 0; i < 9; i += 1) {
    optionAccountsData.push({
        optionMarket: optionMarketData[i],
        tokenAccount: tokenAccountData[i]
    })
}

export default optionAccountsData;