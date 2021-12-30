
import {
  useConnectedWallet
} from '@saberhq/use-solana';
import { Link } from 'react-router-dom';
import styles_app from '../styles/app.module.scss';
import styles_grid from '../styles/Grid.module.scss';

// //https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Aligning_Items_in_a_Flex_Container
// import NewOrEdit from '../components/NewOrEdit';
import styles from '../styles/Contributor.module.scss';

const NewOrEdit = () => (
  <section className={styles.contributor}>
    <p>The contributor example shows grid style (where treasury example shows list)</p>
    <div>
      <div className='psy-button-group'>
        <Link to="/contributor/new">
          <h2>Unlock</h2>
        </Link>
      </div>
      <div className={styles_grid.grid}>
        <div className={styles_grid['grid-item']}>
          PsyOptions
        </div>
        <div className={styles_grid['grid-item']}>
          Crypto Punks
        </div>
      </div>
    </div>
    <div>
      <div className='psy-button-group'>
        <Link to="/contributor/edit/8aVM1bTQ2cWcL7m9bXrWs6eBjdb16yxABgD6paZ6p23X">
          <h2>Exercise</h2>
        </Link>
      </div>
      <div className={styles_grid.grid}>
        <div className={styles_grid['grid-item']}>
          Carrot Coin
        </div>
        <div className={styles_grid['grid-item']}>
          Friktion
        </div>
        <div className={styles_grid['grid-item']}>
          Tap Finance
        </div>
      </div>
    </div>
  </section>
);
// export default NewOrEdit;

const Contributor = () => {
  const wallet = useConnectedWallet();
  return (
    <div className={styles.contributor}>
      <nav className={styles_app['nav-breadcrumbs']}>
        <Link to="/">
          <span>Home</span>
        </Link>
        <Link to="/contributor">
          <span>Contributor</span>
        </Link>
       </nav>
      {
        wallet?.connected ?
          <NewOrEdit />
        : <>Let's connect your wallet</> 
      }
    </div>
  )
}

export default Contributor;
