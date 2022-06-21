import { Box, Link, Typography } from "@mui/material";
import { Hr } from "../components/Hr";
import { LinkOut } from "../components/Images/icons/LinkOut";
import { OptionsOverview } from "../components/OptionsOverview";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { BORDER_COLOR } from "../Theme";

const overviewStyles = {
  container: {
    marginTop: 3.25,
    background: "#FFFFFF",
    borderRadius: "10px",
    border: `1px solid ${BORDER_COLOR}`,
  },
  top: {
    height: "4em",
    display: "flex",
    alignItems: "center",
    paddingLeft: "50px",
  },
  bottom: {
    padding: "30px 50px",
  },
  body: {
    // marginBottom: 2.75,
  },
};

const styles = {
  header: {
    marginTop: 3.25,
  },
};

const Home = () => {
  const { width } = useWindowDimensions();
  return (
    <Box
      sx={{
        maxWidth: `${
          width > 1300
            ? (width * 2.8) / 5
            : width < 950
            ? width * 0.95
            : (width * 2) / 3
        }px`,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Box>
        <Typography sx={styles.header} variant="h1" component="h1">
          Claims
        </Typography>
        <Box sx={overviewStyles.container}>
          <Box sx={overviewStyles.top}>
            <Typography variant="h2" component="h2">
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
              Option airdrops are a new form of airdrops. Below you’ll find a
              list of airdrops you qualify for; you’ll see when they expire, the
              number of options you qualify for, why you qualify, and the option
              price as well as the current price of the token. To learn more,
              click the link below.
            </Typography>
            <Link href="#" variant="body1" color="textPrimary">
              Learn More <LinkOut size={1.05} />
            </Link>
          </Box>
        </Box>

        <Box>
          <OptionsOverview />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
