
import {
  useConnectedWallet
} from '@saberhq/use-solana';
import { Link } from 'react-router-dom';
import styles_app from '../styles/app.module.scss';

// import NewOrEdit from '../components/NewOrEdit';
import styles from '../styles/Treasury.module.scss';

const NewOrEdit = () => (
  <section className={styles['treasury']}>
    <p>The treasury example shows list style (where Contributor example shows grid). <br />Could be a toggle, between grid and list</p>
    <div>
      <div className='psy-button-group'>
        <Link to="/treasury/new">
          <h2>New</h2>
        </Link>
      </div>
      <ul>
        <li><Link to="/treasury/new"><span>New Grant</span></Link></li>
        <li><Link to="/treasury/new"><span>New Treasury Account</span></Link></li>
      </ul>
    </div>
    <div>
      <div className='psy-button-group'>
        <Link to="/treasury/edit/8aVM1bTQ2cWcL7m9bXrWs6eBjdb16yxABgD6paZ6p23X">
          <h2>Edit</h2>
        </Link>
      </div>
      <ul>
        <li><Link to="/treasury"><span>8aVM1bTQ2cWcL7m9bXrWs6eBjdb16yxABgD6paZ6p23X</span></Link></li>
        <li><Link to="/treasury"><span>XEoiNBmSd4237Ab9pL93bUp7NGPRt89s5aL9zPTn7Vc</span></Link></li>
        <li><Link to="/treasury"><span>62QaQyjWFRzChmL3vdvs6wnVzvQKSxChXTFB9Ba6TxJd</span></Link></li>
        <li><Link to="/treasury"><span>FTQJ6gdFhW6batYCe6yoKtWXAG8aArD75syQAYx65w5K</span></Link></li>
        <li><Link to="/treasury"><span>Dn8MGapLhLhcJT3Bx4Cg5xHCfcGNxURzHwMGWFmE7vEd</span></Link></li>
        <li><Link to="/treasury"><span>HBd4sxaBRhyWnS3JM5CzwmNCdaVYn61fBWWTSA2xeBuC</span></Link></li>
        <li><Link to="/treasury"><span>EZtmM6wPqRGPEikmq6KrJ4qfNvUWw7PHDZwdW5L6i9TD</span></Link></li>
        <li><Link to="/treasury"><span>53AcUARPAgAiBFd5PsKsxEH82UxkQb5MeNk6cuA6Z8uz</span></Link></li>
        <li><Link to="/treasury"><span>C11DiWoq3qechBYaejoxwGB3rXvaGSj6gMe6HsiQ25j4</span></Link></li>
        <li><Link to="/treasury"><span>CaQXi4YTM3JtXDGL7rGFKdbRQsVABGY5nFYX94TN2msT</span></Link></li>
        <li><Link to="/treasury"><span>CaQXi4YTM3JtXDGL7rGFKdbRQsVABGY5nFYX94TN2msT</span></Link></li>
        <li><Link to="/treasury"><span>En4iimG1iquAd3DGM9XvfbGEfwp1wSL2bJ8ugt7CE4Wx</span></Link></li>
        <li><Link to="/treasury"><span>Ea9FRnQ5KriW7QJkjH6DYoww8WhnvJ6xK9Dk1Pzw8Wzd</span></Link></li>
        <li><Link to="/treasury"><span>BFRZwBCG8cLTtGw5UXr5pf2qwJaGApS8qwvUydFuoVxH</span></Link></li>
        <li><Link to="/treasury"><span>9hkMcypyQgtfkGK3pTRFTMdb1386PxjPxTXheXuPF3uX</span></Link></li>
        <li><Link to="/treasury"><span>EGoNCktkgDh2GwgNJQSvEUAthcHyw2Jty177sP1Vu53S</span></Link></li>
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
