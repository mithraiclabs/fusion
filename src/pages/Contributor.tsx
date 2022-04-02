

import { Link } from 'react-router-dom';
import styles_app from '../styles/app.module.scss';
import styles from '../styles/Contributor.module.scss';
import ProjectDetail from '../components/ProjectDetail';
import React, { useCallback, useEffect, useState } from 'react';
import {
  useConnectedWallet
} from '@saberhq/use-solana';
import { Wallet } from '@project-serum/anchor';

// export default NewOrEdit;

const Contributor = () => {
  const wallet = useConnectedWallet();
  return (
  
    <div className="project">
    <nav className={styles_app["nav-breadcrumbs"]}>
      <Link to="/">
        <span>Portfolio Overview</span>
      </Link>
      <Link to="/contributor">
        <span>Project</span>
      </Link>
    </nav>
    {wallet?.connected ? (
      <h1>hi</h1>
    ) : (
      <>Let's connect your wallet</>
    )}
  </div>
  )
}

export default Contributor;
