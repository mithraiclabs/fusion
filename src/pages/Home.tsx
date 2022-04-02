import PortfolioOverview from '../components/PortfolioOverview';
import styles from '../styles/Home.module.scss';

const Home = () => {
  return (
    <section className={styles.home}>
      {
        <PortfolioOverview/> 
      }
    </section>
  )
}

export default Home;
