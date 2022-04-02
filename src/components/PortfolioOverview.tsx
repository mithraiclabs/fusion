import React, { useCallback, useEffect, useState } from "react";
import { useConnectedWallet, useSolana } from "@saberhq/use-solana";
import { PsyAmericanIdl } from "@mithraic-labs/psy-american";
import styles from "../styles/PortfolioOverview.module.scss";
import { Program, Provider } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { getAllWalletOptions, loadMintInfo } from "../lib/utils";
import projectList from "../content/projectList";
import { CircularProgress } from "@material-ui/core";
import { MintInfoWithKey, ProjectOptions } from "../types";
import ProjectOverview from "./ProjectOverview";
import Wallet from "./Wallet";
import { DateSelector } from "./DatePicker.module";
import ProjectDetail from "./ProjectDetail";
import projectOptionsData from "../content/ProjectOptionsData";
import mintInfosList, {mintInfoRecord} from "../content/MintInfos";

const PortfolioOverview = () => {
  const wallet = useConnectedWallet();
  const { provider } = useSolana();
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingMints, setLoadingMints] = useState(true);
  // const [projectOptions, setProjectOptions] = useState<
  //   Record<string, ProjectOptions>
  // >({});
  // const [mintInfos, setMintInfos] = useState<Record<string, MintInfoWithKey>>(
  //   {}
  // );

 

  // useEffect(() => {
  //   setLoadingProjects(true);
  //   if (wallet && wallet.connected) {
  //     // TODO put the Program into a higher order component
  //     const anchorProvider = new Provider(provider.connection, wallet, {});
  //     const program = new Program(
  //       PsyAmericanIdl,
  //       new PublicKey("R2y9ip6mxmWUj4pt54jP2hz2dgvMozy9VTSwMWE7evs"),
  //       anchorProvider
  //     );
  //     (async () => {
  //       // on wallet connect get all the options the user holds https://github.com/mithraiclabs/psyoptions-management/issues/3
  //       const temp = await getAllWalletOptions(program, projectList);
  //       setProjectOptions(temp);
  //       setLoadingProjects(false);
  //     })();
  //   }
  // }, [provider.connection, wallet]);

  // // Load the MintInfo for all non-option SPL Tokens. This is necessary to display strike prices
  // useEffect(() => {
  //   (async () => {
  //     // const mints = await loadMintInfo(
  //     //   provider.connection,
  //     //   Object.values(projectOptions)
  //     // );
  //     setMintInfos(mintInfos);
  //     setLoadingMints(false);
  //   })();
  // }, [provider.connection, projectOptions]);

  // console.log('mi',mintInfos)

  return (
    <div className="top">
      <div className={styles["Parent"]}>
        <div className={styles["child2"]}>
          <h3>PORTFOLIO OVERVIEW</h3>
          {/* {loadingProjects 
          // || Object.keys(mintInfos).length <= 0 
          ? (
            <div>
              <CircularProgress />
            </div>
          ) : (
            projectOptionsData.map((projectOption, index) => (
              <div>
                <ProjectOverview
                  key={projectOption.project.name}
                  project={projectOption.project}
                  optionAccounts={projectOption.options}
                  mintInfos={mintInfoRecord}
                />
              </div>
            ))
          )} */}
          {projectList.map((project) => (
                <ProjectOverview
                  project={project}
                />
            ))}
        </div>
        <div className={styles["walletContainer"]}>
          <Wallet />
        </div>
      </div>
    </div>
  );
};

export default PortfolioOverview;
