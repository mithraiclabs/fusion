
import {
  useConnectedWallet
} from '@saberhq/use-solana';
import IndexIntroUser from '../components/IndexIntroUser';
import IndexIntroGuest from '../components/IndexIntroGuest';
import styles from '../styles/Home.module.scss';

const Home = () => {
  const wallet = useConnectedWallet();
  return (
    <div className={styles.home}>
      {
        wallet?.connected ? <IndexIntroUser /> : <IndexIntroGuest /> 
      }
    </div>
  )
}

export default Home;
