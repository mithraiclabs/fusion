
import {
  useConnectedWallet
} from '@saberhq/use-solana';
import { Link } from 'react-router-dom';
import styles_app from '../styles/app.module.scss';

// import NewOrEdit from '../components/NewOrEdit';
import styles from '../styles/Treasury.module.scss';

const NewOrEdit = () => (
  <section className={styles['treasury']}>
    <div>
      <div className='psy-button-group'>
        <Link to="/treasury/new">
          <h2>New</h2>
        </Link>
      </div>
      <ul>
        <li><Link to="/treasury"><span>New Grant</span></Link></li>
        <li><Link to="/treasury"><span>New Treasury Account</span></Link></li>
      </ul>
    </div>
    <div>
      <div className='psy-button-group'>
        <Link to="/treasury/edit">
          <h2>Edit</h2>
        </Link>
      </div>
      <ul>
        <li><Link to="/treasury"><span>Dww1F52LaLe3...2LaaTs</span></Link></li>
        <li><Link to="/treasury"><span>ftW3L5aTaLet...fmMdfqr</span></Link></li>
        <li><Link to="/treasury"><span>4Fww82543aLeL...h2M82</span></Link></li>
        <li><Link to="/treasury"><span>Lwwk55eLaLe3...m4Mdfqr</span></Link></li>
      </ul>
    </div>
  </section>
);
// export default NewOrEdit;

const Treasury = () => {
  const wallet = useConnectedWallet();
  return (
    <div className={styles.treasury}>
      <nav className={styles_app['nav-breadcrumbs']}>
        <Link to="/">
          <span>Home</span>
        </Link>
        <Link to="/treasury">
          <span>Treasury</span>
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

export default Treasury;
