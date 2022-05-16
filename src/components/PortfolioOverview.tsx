import ProjectOverview from "./ProjectOverview";
import { ConnectWalletButton } from "./ConnectWalletButton";
import { useRecoilValue } from "recoil";
import { selectOwnedProjects } from "../recoil";

const PortfolioOverview = () => {
  const ownedProjects = useRecoilValue(selectOwnedProjects);
  return (
    <div className="top">
      <h3>PORTFOLIO OVERVIEW</h3>
      {ownedProjects.map((project) => (
        <ProjectOverview key={project.mintAddress} project={project} />
      ))}
      <div>
        <ConnectWalletButton />
      </div>
    </div>
  );
};

export default PortfolioOverview;
