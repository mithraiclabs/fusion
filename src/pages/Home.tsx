
import {
  useConnectedWallet
} from '@saberhq/use-solana';
import PortfolioOverview from '../components/PortfolioOverview';
//import TreasuryFormNew from '../components/TreasuryFormNew';
import IndexIntroGuest from '../components/IndexIntroGuest';
import styles from '../styles/Home.module.scss';
import TreasuryFormNew from '../components/TreasuryFormNew';
import Treasury from './Treasury';
import Contributor from './Contributor';
import TreasuryFormEdit from '../components/TreasuryFormEdit';
import ContributorNew from './ContributorNew';

const Home = () => {
  const wallet = useConnectedWallet();
  return (
    <section className={styles.home}>
      {
        //wallet?.connected ? <PortfolioOverview /> : <IndexIntroGuest /> 
        wallet?.connected ? <Contributor /> : <IndexIntroGuest />
        //<PortfolioOverview/>
      }
    </section>
  )
}

export default Home;
