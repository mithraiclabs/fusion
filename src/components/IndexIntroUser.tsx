
import { useEffect, useState } from 'react';
import {
  useConnectedWallet, useSolana
} from '@saberhq/use-solana';
import { PsyAmericanIdl } from "@mithraic-labs/psy-american";
import styles from '../styles/IndexIntroUser.module.scss';
import { Program, Provider } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import { getAllWalletOptions } from '../lib/getAllWalletOptions';
import projectList from '../content/projectList.json';
import { CircularProgress } from '@material-ui/core';
import { Project, ProjectOptions } from '../types';
import ProjectOverview from './ProjectOverview';


const IndexIntroUser = () => {
  const wallet = useConnectedWallet();
  const {
    walletProviderInfo,
    disconnect,
    provider,
    network
  } = useSolana();
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projectOptions, setProjectOptions] = useState<Record<string,ProjectOptions>>({});
  useEffect(() => {
    setLoadingProjects(true);
    if (wallet && wallet.connected) {
      // TODO put the Program into a higher order component
      const anchorProvider = new Provider(provider.connection, wallet, {});
      const program = new Program(PsyAmericanIdl, new PublicKey('R2y9ip6mxmWUj4pt54jP2hz2dgvMozy9VTSwMWE7evs'), anchorProvider);
      ;(async () => {
        // on wallet connect get all the options the user holds https://github.com/mithraiclabs/psyoptions-management/issues/3
        const temp = await getAllWalletOptions(program, projectList);
        setProjectOptions(temp);
        setLoadingProjects(false);

      })();
    }
  }, [provider.connection, wallet])
  return (
    <div className={styles["index-intro-user"]}>
      <section>
        <div className='psy-button-group'>
          {
            loadingProjects ? 
            <CircularProgress/> : Object.keys(projectOptions).map(key => <ProjectOverview key={key} project={projectOptions[key].project} optionAccounts={projectOptions[key].options}/>)
          }
        </div>
      </section>
    </div>
  )
};

export default IndexIntroUser;
