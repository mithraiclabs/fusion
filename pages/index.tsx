import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/globals.module.scss';

// For first iterations, a sketch of some marketing content
// Will change. Stay tuned 🚀

import IndexIntroSketch from '../components/IndexIntroSketch';

const Home: NextPage = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <IndexIntroSketch />
      </div>
    </div>
  )
}

export default Home;
