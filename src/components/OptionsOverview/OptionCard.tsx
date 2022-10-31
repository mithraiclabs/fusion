import { Avatar, Box, Button, SxProps, Theme, Typography } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { mapNetworkTypes } from "../../lib/utils";
import projectList from "../../projects/projectList";
import {
  networkAtom,
  optionMarketFamily,
  tokenAccountsMap,
} from "../../recoil";
import {
  DESKTOP_PAPER_WIDTH,
  MOBILE_PAPER_WIDTH,
  PAPER_COLOR,
} from "../../Theme";
import { OptionInfo } from "./OptionInfo";

const pillStyles: Record<string, SxProps<Theme>> = {
  container: {
    background: PAPER_COLOR,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: "6px",
    width: "85px",
    height: "30px",
    alignItems: "center",
    flex: "none",
    order: 0,
    flexGrow: 0,
  },
};

const Pill: React.FC = ({ children }) => {
  return (
    <Box sx={pillStyles.container}>
      <Typography variant="h5">In Wallet</Typography>
    </Box>
  );
};

const styles: Record<string, SystemStyleObject<Theme>> = {
  container: {
    border: "1px solid #AFAFAF",
    borderRadius: "6px",
    padding: "0px",
    flex: "none",
    width: DESKTOP_PAPER_WIDTH,
    order: 0,
    alignSelf: "stretch",
    flexGrow: 0,
    boxShadow: "border-box",
    my: "32px",
  },
  top: {
    backgroundColor: "#FFFFFF",
    borderRadius: "6px 6px 0px 0px",
    width: DESKTOP_PAPER_WIDTH,
    height: "91px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "8px",
    flex: "none",
    order: 0,
    alignSelf: "stretch",
    flexGrow: 0,
  },
  logoNameContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "16px",
    gap: "13px",
    width: "632px",
    height: "59px",
    flex: "none",
    order: 0,
    alignSelf: "stretch",
    flexGrow: 0,
  },
  leftLogoBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "0px",
    gap: "12px",
    width: "506px",
    height: "59px",
    flex: "none",
    order: 0,
    flexGrow: 1,
  },
  logo: {
    height: 40,
    width: 40,
    display: "flex",
    gap: "10px",
    padding: 0,
    flexGrow: 0,
    flex: "none",
    order: 0,
  },
  pillAssetBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 0,
    height: "59px",
    flex: "none",
    order: 1,
    flexGrow: 0,
  },
  btnStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    px: "auto",
    paddingTop: "8px",
    gap: "8px",
    alignSelf: "flex-end",
    minWidth: "113px",
    height: "32px",
    background: "#454545",
    borderRadius: "20px",
    flex: "none",
    order: 3,
    flexGrow: 0,
  },
  btnBox: {
    order: 2,
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  mobileWidth: {
    width: MOBILE_PAPER_WIDTH,
  },
};

type CardType = "Exercise" | "Recover";

export const OptionCardWithAction: React.FC<{
  projectKey: string;
  optionMetaKey: string;
  tokenAccountKey: string;
  type: CardType;
  isMobile?: boolean;
}> = ({ projectKey, optionMetaKey, tokenAccountKey, type, isMobile }) => {
  const navigate = useNavigate();
  const optionMeta = useRecoilValue(optionMarketFamily(optionMetaKey));
  const tokenAccount = useRecoilValue(tokenAccountsMap(tokenAccountKey));

  const actionButton = () => {
    if (!optionMeta) return <></>;
    return (
      <Button
        variant="contained"
        sx={styles.btnStyle}
        onClick={() => {
          navigate(
            `/${
              type === "Recover" ? "writer" : "option"
            }/${optionMeta.key.toString()}`
          );
        }}
      >
        {type === "Exercise" &&
          (optionMeta.expired
            ? Number(tokenAccount?.amount)
              ? "Collect rent"
              : "Recover underlying"
            : "Exercise")}
        {type === "Recover" && "Recover"}
      </Button>
    );
  };

  return (
    <ProjectCard
      projectKey={projectKey}
      fixedHeight={true}
      actionButton={actionButton()}
      isMobile={isMobile}
    >
      <OptionInfo
        projectKey={projectKey}
        optionMetaKey={optionMetaKey}
        tokenAccountKey={tokenAccountKey}
        isMobile={isMobile}
      />
    </ProjectCard>
  );
};

export const ProjectCard: React.FC<{
  projectKey: string;
  fixedHeight?: boolean;
  actionButton?: JSX.Element;
  isMobile?: boolean;
}> = ({ projectKey, fixedHeight, children, actionButton, isMobile }) => {
  const network = useRecoilValue(networkAtom);
  const project = projectList[mapNetworkTypes(network.key)][projectKey];
  return (
    <Box
      sx={{
        ...styles.container,
        ...(fixedHeight && {
          height: "161px",
        }),
        ...(!!isMobile && styles.mobileWidth),
      }}
    >
      <Box sx={[styles.top, !!isMobile && styles.mobileWidth]}>
        <Box sx={styles.logoNameContainer}>
          <Box sx={styles.leftLogoBox}>
            <Box sx={styles.logo}>
              <Avatar src={project.logo} alt={`${project.name} logo`} />
            </Box>
            <Box sx={styles.pillAssetBox}>
              <Pill />
              <Typography variant="h4" component="h4">
                {project.name}
              </Typography>
            </Box>
            <Box sx={{ ...(!isMobile && styles.btnBox) }}>{actionButton}</Box>
          </Box>
        </Box>
      </Box>
      {children}
    </Box>
  );
};
