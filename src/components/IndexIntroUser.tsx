
import styles from '../styles/IndexIntroUser.module.scss';
import { Link } from 'react-router-dom';

const IndexIntroUser = () => {
  return (
    <div className={styles["index-intro-user"]}>
      <section>
        <div className='psy-button-group'>
          <Link to="/contributor">
            <h2>Contributor</h2>
            <ul>
              <li>Community member</li>
              <li>Employee</li>
              <li>Team member</li>
              <li>Investor</li>
            </ul>
          </Link>
          <Link to="/treasury">
            <h2>Treasury</h2>
            <ul>
              <li>Founder</li>
              <li>Community leader</li>
              <li>Org manager</li>
              <li>Content creator</li>
            </ul>
          </Link>
        </div>
      </section>
    </div>
  )
};

export default IndexIntroUser;
