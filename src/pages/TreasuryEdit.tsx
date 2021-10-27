
import {
  useConnectedWallet
} from '@saberhq/use-solana';
import styles from '../styles/Treasury.module.scss';
import styles_app from '../styles/app.module.scss';
import { Link } from 'react-router-dom';

const TreasuryEdit = () => {
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
        <Link to="/treasury/edit">
          <span>Edit</span>
        </Link>
       </nav>
      {
        wallet?.connected ?
          <>
            <h1>Edit</h1>
            <p>Placeholder</p>
          </>
        : <>Let's connect your wallet</> 
      }
    </section>
  )
}

export default TreasuryEdit;
