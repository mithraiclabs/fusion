import { Box, Link, Stack, Typography } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { LinkOut } from "../components/Images/icons/LinkOut";
import NoWalletConnected from "../components/OptionsOverview/NoWalletConnected";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { OptionsDisplay } from "../components/OptionsOverview/OptionsDisplay";
import { AvailableClaims } from "./AvailableClaims";
import { useEffect, useState } from "react";
import { BuilderContainer } from "../components/Builder";
import { useMatch, useNavigate } from "react-router-dom";
import { Option } from "./Option";
import { Writer } from "./Recover/Writer";
import useWindowDimensions from "../hooks/useWindowDimensions";
import TwitterIcon from "@mui/icons-material/Twitter";
import { selectedWindowAtom, WindowType } from "../recoil/util";
import { useRecoilState } from "recoil";
import {
  BORDER_RADIUS_2,
  DESKTOP_PAPER_WIDTH,
  PAPER_COLOR,
  SMALL_SCREEN_WIDTH,
} from "../Theme";
import { ClaimContainer } from "../components/Claimer/ClaimContainer";
import { WriterOverview } from "../components/WritersOverview";
import { DiscordIcon } from "../components/Images/icons/discord-icon";

const SocialsFooter: React.FC = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        textAlign: "left",
        paddingBottom: "16px",
      }}
    >
      <Typography variant="body1" fontSize={"12px"}>
        Connect with us on our socials to stay up-to-date in the latest
        PsyOptions alpha <br />
        <Link
          rel="noopener"
          target="_blank"
          href="https://twitter.com/psyoptions"
        >
          <TwitterIcon
            sx={{
              fontSize: "20px",
              color: "black",
            }}
          />
        </Link>
        <Link
          rel="noopener"
          target="_blank"
          href="https://discord.com/invite/MgDdJKgZJc"
        >
          <DiscordIcon size={0.8} />
        </Link>
      </Typography>
    </Box>
  );
};

const Home = () => {
  const exerciseOptionMarketKey = useMatch("/option/:key")?.params?.key || "";
  const recoverOptionMarketKey = useMatch("/writer/:key")?.params?.key || "";
  const { publicKey } = useWallet();
  const { width } = useWindowDimensions();
  const smallScreen = width < SMALL_SCREEN_WIDTH;
  const [selectedWindow, setSelectedWindow] =
    useRecoilState(selectedWindowAtom);
  const navigate = useNavigate();
  const handleNavigate = (type: WindowType) => {
    setSelectedWindow(type);
    if (type === "Home") {
      navigate("/");
    }
  };
  useEffect(() => {
    setSelectedWindow(
      exerciseOptionMarketKey
        ? "Exercise"
        : recoverOptionMarketKey
        ? "WriterBurn"
        : "Home"
    );
  }, [exerciseOptionMarketKey, recoverOptionMarketKey, setSelectedWindow]);

  const windowContent = () => {
    switch (selectedWindow) {
      case "Home":
        return (
          <>
            <AvailableClaims />
            <OptionsDisplay />
          </>
        );
      case "Create":
        return <BuilderContainer />;
      case "Exercise":
        return <Option />;
      case "WriterBurn":
        return <Writer />;
      case "Recover":
        return <WriterOverview />;
      case "Claim":
        return <ClaimContainer />;
    }
  };

  return (
    <>
      {!smallScreen ? (
        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Box width={"40vw"}>
            <Dashboard
              navigationHandler={handleNavigate}
              selectedWindow={selectedWindow}
              walletConnected={!!publicKey}
              width={width / 3}
            />
          </Box>
          {publicKey && (
            <Box
              sx={{ width: DESKTOP_PAPER_WIDTH }}
              marginLeft="auto"
              marginRight={"auto"}
              marginBottom={"32px"}
            >
              {windowContent()}
            </Box>
          )}
        </Stack>
      ) : (
        <Stack>
          {publicKey && (
            <Box
              sx={{ width: `${width * 0.85}px` }}
              marginLeft="auto"
              marginRight={"auto"}
            >
              {windowContent()}
            </Box>
          )}
        </Stack>
      )}
    </>
  );
};

export const Dashboard: React.FC<{
  navigationHandler: (type: WindowType) => void;
  selectedWindow: WindowType;
  walletConnected: boolean;
  width: number;
}> = ({ navigationHandler, selectedWindow, walletConnected, width }) => {
  const [hoveredTab, setHoveredTab] = useState<0 | 1 | 2>(0);
  const isMobile = width < 360;
  const title = () => {
    switch (selectedWindow) {
      case "Home":
      case "Exercise":
        return "What are option airdrops?";
      case "Recover":
      case "WriterBurn":
        return "Underlying/Rent Recovery for Options";
      case "Create":
        return "Create an Airdrop";
    }
  };
  const explanation = () => {
    switch (selectedWindow) {
      case "Home":
      case "Exercise":
        return `Option airdrops are a new form of airdrops. Below you'll find a list of
        airdrops you qualify for; you'll see when they expire, the number of
        options you qualify for, why you qualify, and the option price as well
        as the current price of the token. To learn more, click the link below.`;
      case "Recover":
      case "WriterBurn":
        return `Here you can recover the underlying/quote tokens from the options you minted previously.`;
      case "Create":
        return `Create your airdrop here with our wizard.
         From start-to-finish, it should take you about 10–15min.`;
    }
  };
  return (
    <Box
      sx={{
        ...(!!width && { maxWidth: `${width}px` }),
        position: !isMobile ? "fixed" : "relative",
      }}
    >
      <Box
        onClick={() => {
          navigationHandler(
            selectedWindow === "WriterBurn" ? "Recover" : "Home"
          );
        }}
      >
        {!isMobile && (
          <Typography variant="h3">
            {selectedWindow !== "Home" ? (
              <>
                <ArrowBackIcon fontSize="medium" />
                &nbsp;
              </>
            ) : null}
            Dashboard
          </Typography>
        )}
      </Box>
      <Box
        my={2}
        sx={{
          display: "flex",
          flexDirection: !isMobile ? "row" : "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "0px",
          gap: "8px",
          alignSelf: "stretch",
          flexGrow: 0,
        }}
      >
        <Box
          sx={{
            ...dashboardBtnStyle,
            order: 0,
            ...(hoveredTab === 1 && hoveredStyle),
            ...(selectedWindow === "Create" && selectedBtnStyle),
            ...(isMobile && {
              alignSelf: "center",
            }),
          }}
          onClick={() => navigationHandler("Create")}
          onMouseEnter={() => setHoveredTab(1)}
          onMouseLeave={() => setHoveredTab(0)}
        >
          <AddCircleOutlineIcon
            sx={{
              color: "black",
            }}
            fontSize={"large"}
          />
          <Typography variant="h5">Create an airdrop</Typography>
        </Box>
        <Box
          sx={{
            ...dashboardBtnStyle,
            order: 1,
            ...(hoveredTab === 2 && hoveredStyle),
            ...((selectedWindow === "Recover" ||
              selectedWindow === "WriterBurn") &&
              selectedBtnStyle),
            ...(isMobile && {
              alignSelf: "center",
            }),
          }}
          onClick={() => navigationHandler("Recover")}
          onMouseEnter={() => setHoveredTab(2)}
          onMouseLeave={() => setHoveredTab(0)}
        >
          <MonetizationOnOutlinedIcon
            sx={{
              color: "black",
            }}
            fontSize={"large"}
          />
          <Typography variant="h5">underlying/rent recovery</Typography>
        </Box>
      </Box>
      <Typography variant="h4">{title()}</Typography>
      <Typography variant="body1" component="p" color="textPrimary" my={2}>
        {explanation()}
      </Typography>
      <Link
        href="https://docs.psyoptions.io/fusion"
        rel="noopener"
        target="_blank"
        variant="body1"
        color="textPrimary"
      >
        <Typography variant="body2">
          Learn More <LinkOut size={1.05} color={"black"} />
        </Typography>
      </Link>
      {(!walletConnected || isMobile) && (
        <NoWalletConnected
          sx={
            isMobile
              ? {
                  pt: 4,
                }
              : {}
          }
        />
      )}
      {!isMobile ? <SocialsFooter /> : null}
    </Box>
  );
};

const dashboardBtnStyle = {
  flex: "none",
  order: 1,
  alignSelf: "stretch",
  background: PAPER_COLOR,
  borderRadius: BORDER_RADIUS_2,
  padding: "8px 16px",
  height: "92px",
  width: "198px",
  display: "grid",
};

const selectedBtnStyle = {
  background: "#D6FF85",
  border: "1px solid #AFAFAF",
};

const hoveredStyle = {
  background: "#D6FF8566",
};

export default Home;
