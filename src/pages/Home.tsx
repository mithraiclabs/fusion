
import {
  useConnectedWallet
} from '@saberhq/use-solana';
import PortfolioOverview from '../components/PortfolioOverview';
import IndexIntroGuest from '../components/IndexIntroGuest';
import styles from '../styles/Home.module.scss';
import Treasury from './Treasury';
import Contributor from './Contributor';
//import OptionOverview from '../components/OptionOverview';

const Home = () => {
  const wallet = useConnectedWallet();
  return (
    <section className={styles.home}>
      {
        //wallet?.connected ? <PortfolioOverview /> : <IndexIntroGuest /> 
        //wallet?.connected ? <Contributor /> : <IndexIntroGuest />
        
      }
    </section>
  )
}

export default Home;
