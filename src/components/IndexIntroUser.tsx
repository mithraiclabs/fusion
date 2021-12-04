
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  useConnectedWallet, useSolana
} from '@saberhq/use-solana';
import { PsyAmericanIdl } from "@mithraic-labs/psy-american";
import styles from '../styles/IndexIntroUser.module.scss';
import { Program, Provider } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import { getAllWalletOptions } from '../lib/getAllWalletOptions';


const IndexIntroUser = () => {
  const wallet = useConnectedWallet();
  const {
    walletProviderInfo,
    disconnect,
    provider,
    network
  } = useSolana();
  // TODO put the Program into a higher order component
  useEffect(() => {
    // TODO: on wallet connect get all the options the user holds https://github.com/mithraiclabs/psyoptions-management/issues/3
    if (wallet && wallet.connected) {
      const anchorProvider = new Provider(provider.connection, wallet, {});
      const program = new Program(PsyAmericanIdl, new PublicKey('R2y9ip6mxmWUj4pt54jP2hz2dgvMozy9VTSwMWE7evs'), anchorProvider);
      ;(async () => {
        const options = await getAllWalletOptions(program);
      })();
    }
  }, [provider.connection, wallet])
  return (
    <div className={styles["index-intro-user"]}>
      <section>
        <div className='psy-button-group'>
          <Link to="/contributor">
            <h2>Contributor</h2>
            <ul>
              <li>Community member</li>
              <li>Employee</li>
              <li>Team member</li>
              <li>Investor</li>
            </ul>
          </Link>
          <Link to="/treasury">
            <h2>Treasury</h2>
            <ul>
              <li>Founder</li>
              <li>Community leader</li>
              <li>Org manager</li>
              <li>Content creator</li>
            </ul>
          </Link>
        </div>
      </section>
    </div>
  )
};

export default IndexIntroUser;
