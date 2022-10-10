import { Box, Typography } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import NoWalletConnected from "../components/OptionsOverview/NoWalletConnected";
import { OptionsDisplay } from "../components/OptionsOverview/OptionsDisplay";
import { AvailableClaims } from "./AvailableClaims";

const Home = () => {
  const { publicKey } = useWallet();
  return (
    <Box
      sx={{
        minWidth: "50%",
      }}
    >
      {/* <FusionPaper header="Claims" title="Overview" divisor={true}>
        <Typography variant="body1" component="p" color="textPrimary">
          Option airdrops are a new form of airdrops. Below you’ll find a list
          of airdrops you qualify for; you’ll see when they expire, the number
          of options you qualify for, why you qualify, and the option price as
          well as the current price of the token. To learn more, click the link
          below.
        </Typography>
        <Link
          href="https://docs.psyoptions.io/fusion"
          rel="noopener"
          target="_blank"
          variant="body1"
          color="textPrimary"
        >
          Learn More <LinkOut size={1.05} />
        </Link>
      </FusionPaper> */}

      <Typography variant="h3">Rewards</Typography>
      {publicKey ? (
        <>
          <AvailableClaims />
          <OptionsDisplay />
        </>
      ) : (
        <NoWalletConnected />
      )}
    </Box>
  );
};

export default Home;
