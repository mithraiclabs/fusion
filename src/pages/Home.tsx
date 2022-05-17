import { Box, Link, Typography } from "@mui/material";
import { Hr } from "../components/Hr";
import { LinkOut } from "../components/Images/icons/LinkOut";
import { OptionsOverview } from "../components/OptionsOverview";
import PageWrapper from "../components/PageWrapper/PageWrapper";
import { BORDER_COLOR } from "../Theme";

const overviewStyles = {
  container: {
    marginTop: 7.5,
    background: "#FFFFFF",
    borderRadius: 10,
    border: `1px solid ${BORDER_COLOR}`,
  },
  top: {
    padding: "0 50px",
    height: 100,
    display: "flex",
    alignItems: "center",
  },
  bottom: {
    padding: "30px 50px",
  },
  body: {
    marginBottom: 2.75,
  },
};

const styles = {
  header: {
    marginTop: 6.25,
  },
};

const Home = () => {
  return (
    <PageWrapper>
      <Typography sx={styles.header} variant="h1" component="h1">
        Claims
      </Typography>
      <Box sx={overviewStyles.container}>
        <Box sx={overviewStyles.top}>
          <Typography variant="h3" component="h3">
            Overview
          </Typography>
        </Box>
        <Hr />
        <Box sx={overviewStyles.bottom}>
          <Typography
            sx={overviewStyles.body}
            variant="body1"
            component="p"
            color="textPrimary"
          >
            Option airdrops are a new form of airdrops. Below you’ll find a list
            of airdrops you qualify for; you’ll see when they expire, the number
            of options you qualify for, why you qualify, and the option price as
            well as the current price of the token. To learn more, click the
            link below.
          </Typography>
          <Link href="#" variant="body1" color="textPrimary">
            Learn More <LinkOut size={19} />
          </Link>
        </Box>
      </Box>

      <OptionsOverview />
    </PageWrapper>
  );
};

export default Home;
