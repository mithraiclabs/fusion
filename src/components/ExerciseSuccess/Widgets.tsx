import { Avatar, Box, Link, Stack, Typography } from "@mui/material";
import { HEADER_TEXT_COLOR } from "../../Theme";
import { LinkOut } from "../Images/icons/LinkOut";

export const SolendWidget: React.VFC<{
  symbol: string;
}> = ({ symbol }) => {
  return (
    <GenericWidget
      logoUrl="https://dev.solend.fi/img/logo.png"
      description={`${symbol} lending on Solend`}
      link="https://solend.fi/dashboard"
      linkType="Lend"
    />
  );
};

export const JupiterWidget: React.VFC = () => {
  return (
    <GenericWidget
      logoUrl="https://jup.ag/svg/jupiter-logo.svg"
      description="Swap for USDC or SOL on Jupiter"
      link="https://jup.ag/"
      linkType="Swap"
    />
  );
};

export const PsyFinanceWidget: React.VFC<{
  symbol: string;
}> = ({ symbol }) => {
  return (
    <GenericWidget
      logoUrl="https://user-images.githubusercontent.com/32071703/149460918-3694084f-2a37-4c95-93d3-b5aaf078d444.png"
      description={`${symbol} vaults available on PsyFinance`}
      link="https://www.psyfi.io/"
      linkType="Stake"
    />
  );
};

const GenericWidget: React.VFC<{
  logoUrl: string;
  description: string;
  link: string;
  linkType: string;
}> = ({ logoUrl, description, link, linkType }) => {
  return (
    <Link href={link} rel="noopener" target="_blank" underline="none">
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Avatar
          src={logoUrl}
          sx={{
            width: 50,
            height: 50,
            marginLeft: "24px",
          }}
        />
        <Box>
          <Typography variant="h5">{description}</Typography>
        </Box>
        <Box
          sx={{
            marginRight: "24px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Inter",
              fontWeight: 600,
              fontSize: "16px",
              color: HEADER_TEXT_COLOR,
              textDecoration: "underline",
            }}
            color="textPrimary"
          >
            {linkType} <LinkOut size={1.05} color={HEADER_TEXT_COLOR} />
          </Typography>
        </Box>
      </Stack>
    </Link>
  );
};
