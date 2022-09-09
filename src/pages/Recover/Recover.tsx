import { Box, Link, Typography } from "@mui/material";
import { FusionPaper } from "../../components/FusionPaper";
import { LinkOut } from "../../components/Images/icons/LinkOut";
import { WriterOverview } from "../../components/WritersOverview";

const Recover = () => {
  return (
    <Box>
      <FusionPaper header="Recover" title="Overview" divisor={true}>
        <Typography variant="body1" component="p" color="textPrimary">
          Here you can recover the underlying/quote tokens from the options you
          minted previously
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
      </FusionPaper>
      <WriterOverview />
    </Box>
  );
};

export default Recover;
