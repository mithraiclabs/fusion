import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import styles from "../styles/ProjectOverviewModal.module.scss";
import graph from "./Images/graph.png";
import ProjectDetail from "./ProjectDetail";
import { MintInfoWithKey, OptionAccount, Project } from "../types";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 600,
  bgcolor: "rgb(16,16,22)",
  border: "1px solid #ffffff",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px"
};

const ProjectOverviewModal: React.FC<{
  projectVal: Project;
  optionAccVal: OptionAccount;
  mintInfoVal: Record<string, MintInfoWithKey>;
}> = ({ projectVal, optionAccVal, mintInfoVal }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button className="modalOpener" onClick={handleOpen}>
        Exercise Option
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.modalFlex}>
          <Box sx={style}>
            <h1 className={styles.header}>Project Overview</h1>

            <div className={styles.graphFlex}>
              <img
                className="graph"
                src={graph}
                alt="graph"
                width="400"
                height="400"
                style={{ margin: "15px", marginTop: "30px" }}
              ></img>
              <div className={styles.exerciseFlex}>
                <Button>BUY</Button>
                <Button>SELL</Button>
              </div>
            </div>

            <ProjectDetail
              projectDetail={projectVal}
              optionAccountsDetail={optionAccVal}
              mintInfosDetail={mintInfoVal}
            />
          </Box>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectOverviewModal;
