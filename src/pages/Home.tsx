import { Box, Link, makeStyles, Typography } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { Hr } from "../components/Hr";
import { LinkOut } from "../components/Images/icons/LinkOut";
import PageWrapper from "../components/PageWrapper/PageWrapper";
import { BORDER_COLOR } from "../Theme";

const useOverviewStyles = makeStyles((theme) => {
  return {
    container: {
      marginTop: 60,
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
      marginBottom: 22,
    },
  };
});

const useStyles = makeStyles((theme) => {
  return {
    header: {
      marginTop: 50,
    },
  };
});

const Home = () => {
  const classes = useStyles();
  const overviewClasses = useOverviewStyles();
  return (
    <PageWrapper>
      <Typography className={classes.header} variant="h1" component="h1">
        Claims
      </Typography>
      <Box className={overviewClasses.container}>
        <Box className={overviewClasses.top}>
          <Typography variant="h3" component="h3">
            Overview
          </Typography>
        </Box>
        <Hr />
        <Box className={overviewClasses.bottom}>
          <Typography
            className={overviewClasses.body}
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
    </PageWrapper>
  );
};

export default Home;
