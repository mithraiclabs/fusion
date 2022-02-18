
import {
  useConnectedWallet
} from '@saberhq/use-solana';
import PortfolioOverview from '../components/PortfolioOverview';
import IndexIntroGuest from '../components/IndexIntroGuest';
import styles from '../styles/Home.module.scss';
import Contributor from './Contributor';
import ProjectDetail from '../components/ProjectDetail';

const Home = () => {
  // const wallet = useConnectedWallet();
  return (
    <section className={styles.home}>
      {
        //<IndexIntroGuest/>
        // wallet?.connected ? 
        <PortfolioOverview/> 
        // : <IndexIntroGuest /> 
      }
    </section>
  )
}

export default Home;
