
import {
  useConnectedWallet
} from '@saberhq/use-solana';
import TreasuryFormNew from '../components/TreasuryFormNew';
import styles from '../styles/Treasury.module.scss';
import styles_app from '../styles/app.module.scss';
import { Link } from 'react-router-dom';

const TreasuryNew = () => {
  const wallet = useConnectedWallet();
  return (
    <section className={styles.treasury}>
      <nav className={styles_app['nav-breadcrumbs']}>
        <Link to="/">
          <span>Home</span>
        </Link>
        <Link to="/treasury">
          <span>Treasury</span>
        </Link>
        <Link to="/treasury/new">
          <span>New</span>
        </Link>
       </nav>
      {
        wallet?.connected ?
          <>
            <h1>New Treasury</h1>
            <TreasuryFormNew />
          </>
        : <>Let's connect your wallet</> 
      }
    </section>
  )
}

export default TreasuryNew;
