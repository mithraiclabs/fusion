import { useCallback, useEffect, useState } from "react";
import * as React from "react";
import { ConnectWalletButton } from "@gokiprotocol/walletkit";
import { useConnectedWallet, useSolana } from "@saberhq/use-solana";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import styles from "../styles/Wallet.module.scss";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import EyeImg from "./eye-button.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { MintInfoWithKey, OptionAccounts, Project } from "../types";
import Wallet from "./Wallet";
//import Paper from '@mui/material/Paper';
// or
import { Paper } from '@mui/material';
import {
  displayExpiration,
  displayHeader,
  displayProjectSymbol,
  displayQuoteToken,
  displayStrikePrice,
  displayUnderlyingAmt,
} from "../lib/optionMarketUtils";


  const ProjectDetail: React.FC<{
    acctNumber: number;
    project: Project;
    optionAccounts: OptionAccounts[];
    mintInfos: Record<string, MintInfoWithKey>;
  }> = ({
    acctNumber,
    project,
    optionAccounts,
    mintInfos
  }) => {
  //{wallet?.publicKey?.toString()}
  
  
function createData(
  underlyingAmt: string,
  projectSymbol: any,
  strikePrice: string,
  quoteToken: string,
  expiration: string
) {
  return { underlyingAmt, projectSymbol, strikePrice, quoteToken, expiration };
}



const rows = [
  createData(
    displayUnderlyingAmt(optionAccounts[acctNumber].optionMarket, mintInfos[optionAccounts[acctNumber].optionMarket.underlyingAssetMint.toString()]), 
    displayProjectSymbol(project), 
    displayStrikePrice(optionAccounts[acctNumber].optionMarket, mintInfos[optionAccounts[acctNumber].optionMarket.underlyingAssetMint.toString()], mintInfos[optionAccounts[acctNumber].optionMarket.quoteAssetMint.toString()]),
    displayQuoteToken(mintInfos[optionAccounts[acctNumber].optionMarket.quoteAssetMint.toString()]), 
    displayExpiration(optionAccounts[acctNumber].optionMarket)
    )
];
  
  
  
  
  return (
    <nav className="top">
      <div className="graph"></div>
      <div className="details">
        <div className="optionsDetails">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Underlying Amount</TableCell>
                  <TableCell align="right">Project Symbol</TableCell>
                  <TableCell align="right">Strike Price</TableCell>
                  <TableCell align="right">Quote Token</TableCell>
                  <TableCell align="right">Expiration</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.projectSymbol}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >

                    <TableCell align="right">{row.underlyingAmt}</TableCell>
                    <TableCell align="right">{row.projectSymbol}</TableCell>
                    <TableCell align="right">{row.strikePrice}</TableCell>
                    <TableCell align="right">{row.quoteToken}</TableCell>
                    <TableCell component="th" scope="row">
                      {row.expiration}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="wallet">
          <Wallet />
        </div>
      </div>
    </nav>
  );
};

export default ProjectDetail;
