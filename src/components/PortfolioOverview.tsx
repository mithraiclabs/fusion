import styles from "../styles/PortfolioOverview.module.scss";
import ProjectOverview from "./ProjectOverview";
import { ConnectWalletButton } from "./ConnectWalletButton";
import { useRecoilValue } from "recoil";
import { selectOwnedProjects } from "../recoil";

const PortfolioOverview = () => {
  const ownedProjects = useRecoilValue(selectOwnedProjects);
  return (
    <div className="top">
      <div className={styles["Parent"]}>
        <div className={styles["child2"]}>
          <h3>PORTFOLIO OVERVIEW</h3>
          {/* {loadingProjects 
          // || Object.keys(mintInfos).length <= 0 
          ? (
            <div>
              <CircularProgress />
            </div>
          ) : (
            projectOptionsData.map((projectOption, index) => (
              <div>
                <ProjectOverview
                  key={projectOption.project.name}
                  project={projectOption.project}
                  optionAccounts={projectOption.options}
                  mintInfos={mintInfoRecord}
                />
              </div>
            ))
          )} */}
          {ownedProjects.map((project) => (
                <ProjectOverview
                  key={project.mintAddress}
                  project={project}
                />
            ))}
        </div>
        <div className={styles["walletContainer"]}>
          <ConnectWalletButton />
        </div>
      </div>
    </div>
  );
};

export default PortfolioOverview;
