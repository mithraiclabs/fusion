
import React, { useCallback, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import {
  LAMPORTS_PER_SOL
} from '@solana/web3.js';
import styles_header from '../styles/Header.module.scss';
import LogoImg from './Images/psyoptions-logo-light.png';
import { useConnectedWallet } from "@saberhq/use-solana";
import "../styles/Portfolio.scss";
import classNames from 'classnames';
import { Project } from '../types';
import { Box, makeStyles } from '@material-ui/core';
//below are the imports for the market pull
import { Market } from '@project-serum/serum'
import {
  Connection,
  Commitment,
  PublicKey
} from '@solana/web3.js';


const connection = new Connection(
  'https://api.devnet.solana.com',
  'processed' as Commitment,
);

// - Attributes for Header
// - Name
// - Description (longer) - doesnt make sense to add here
// - Token price
// - Most same stuff as card
// - Signifier if trending up/down/neutral

const HoldingHeader: React.FC<{
    project: Project;
}> = ({project}) => {

    // Below is setting up the market to get the token's price

    let total_bid_price = 0;
    let total_ask_price = 0;
    let bid_count = 0;
    let ask_count = 0;


    (async () => {
      const market = await Market.load(
        connection,
        new PublicKey(project.serumMarketAddress),
        {},
        new PublicKey(project.serumProgramId),
      );

      //fetching order books
      const bids = await market.loadBids(connection);
      const asks = await market.loadAsks(connection);

       

      //L2 orderbook data
      for (const [price, size] of bids.getL2(20)) {
        total_bid_price += price;
        bid_count += 1;
        console.log(price, size);
      }

      //L3 (Documentation from psyop was not working, improvised with this)
      for (const [price, size] of asks.getL2(20)) {
        total_ask_price += price;
        ask_count += 1;
        console.log(price,size);
      }

    })();
    
    const price = (total_bid_price + total_ask_price)/(bid_count+ask_count);
    console.log(price);
    

    return (
        <div className="holding-header"
            style = {{display : "flex"}}
        >
            <h1>{project.name}</h1>
            <img src = {project.logo}></img>
            <h1>{project.symbol}</h1>
            <br/>
            <h1>Price: {price}</h1>
            
               
    
        </div>
      );
};


export default HoldingHeader;
