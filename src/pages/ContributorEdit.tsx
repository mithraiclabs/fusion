
import {
  useConnectedWallet
} from '@saberhq/use-solana';
import ContributorFormEdit from '../components/ContributorFormEdit';
import styles from '../styles/Contributor.module.scss';
import styles_app from '../styles/app.module.scss';
import { Link } from 'react-router-dom';

type CEProps = {
  match: any;
};

const ContributorEdit: React.FC<CEProps> = ({
  match
}) => {
  const publicKey = match.params.publicKey;
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
        <Link to="/contributor/edit">
          <span>Edit</span>
        </Link>
       </nav>
      {
        wallet?.connected ?
          <>
            <ContributorFormEdit publicKey={publicKey} />
          </>
        : <>Let's connect your wallet</> 
      }
    </section>
  )
}

export default ContributorEdit;
