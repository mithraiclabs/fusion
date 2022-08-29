import { Box, Link, Typography } from "@mui/material";
import { FusionPaper } from "../components/FusionPaper";
import { LinkOut } from "../components/Images/icons/LinkOut";
import { OptionsOverview } from "../components/OptionsOverview";

const Home = () => {
  return (
    <Box>
      <FusionPaper header="Claims" title="Overview" divisor={true}>
        <Typography variant="body1" component="p" color="textPrimary">
          Option airdrops are a new form of airdrops. Below you’ll find a list
          of airdrops you qualify for; you’ll see when they expire, the number
          of options you qualify for, why you qualify, and the option price as
          well as the current price of the token. To learn more, click the link
          below.
        </Typography>
        <Link href="#" variant="body1" color="textPrimary">
          Learn More <LinkOut size={1.05} />
        </Link>
      </FusionPaper>
      <OptionsOverview />
    </Box>
  );
};

export default Home;
