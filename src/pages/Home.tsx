import PageWrapper from "../components/PageWrapper/PageWrapper";
import PortfolioOverview from "../components/PortfolioOverview";
import styles from "../styles/Home.module.scss";

const Home = () => {
  return (
    <PageWrapper>
      <section className={styles.home}>{<PortfolioOverview />}</section>
    </PageWrapper>
  );
};

export default Home;
