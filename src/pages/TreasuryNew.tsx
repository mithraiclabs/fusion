
import {
  useConnectedWallet
} from '@saberhq/use-solana';
import TreasuryFormNew from '../components/TreasuryFormNew';
import styles from '../styles/Treasury.module.scss';
import styles_app from '../styles/app.module.scss';
import { Link } from 'react-router-dom';

//{styles_app['nav-breadcrumbs']}

/**
 *       <nav className={styles_app['nav-breadcrumbs']}>

       </nav>
 * 
 * 
 * 
 */
const TreasuryNew = () => {
  const wallet = useConnectedWallet();
  return (
    <section className={styles.treasury}>
      <div>
      <Link to="/">
          <span>Home</span>
        </Link>
        <Link to="/treasury">
          <span>Treasury</span>
        </Link>
        <Link to="/treasury/new">
          <span>New Grant</span>
        </Link>

      </div>

      {
        wallet?.connected ?
          <>
            <TreasuryFormNew />
          </>
        : <>Let's connect your wallet</> 
      }
    </section>
  )
}

export default TreasuryNew;
