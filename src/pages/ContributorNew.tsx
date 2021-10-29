
import {
  useConnectedWallet
} from '@saberhq/use-solana';
import ContributorFormNew from '../components/ContributorFormNew';
import styles from '../styles/Contributor.module.scss';
import styles_app from '../styles/app.module.scss';
import { Link } from 'react-router-dom';

const ContributorNew = () => {
  const wallet = useConnectedWallet();
  return (
    <section className={styles.contributor}>
      <nav className={styles_app['nav-breadcrumbs']}>
        <Link to="/">
          <span>Home</span>
        </Link>
        <Link to="/contributor">
          <span>Contributor</span>
        </Link>
        <Link to="/contributor/new">
          <span>New Grant</span>
        </Link>
       </nav>
      {
        wallet?.connected ?
          <>
            <ContributorFormNew />
          </>
        : <>Let's connect your wallet</> 
      }
    </section>
  )
}

export default ContributorNew;
