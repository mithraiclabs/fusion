import {
  Box,
  Button,
  FilledInput,
  FormControl,
  InputAdornment,
  Typography,
} from "@mui/material";
import { useRecoilValue } from "recoil";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { distributorAddress } from "../../recoil/util";

const fusionClaimUrl = "https://app.projectfusion.io/";
export const AirdropSuccess: React.FC = () => {
  const _distributorAddress = useRecoilValue(distributorAddress);
  if (!_distributorAddress) throw new Error("Distributor Address not found");
  return (
    <Box>
      <Typography fontSize={"24px"}>
        Congratulations, the Airdrop has been created
      </Typography>
      <Typography fontSize={"16px"} fontWeight={400} marginY={"25px"}>
        Claimants should use the following link
      </Typography>
      <FormControl sx={{ width: "664px" }} variant="filled">
        <FilledInput
          value={fusionClaimUrl}
          endAdornment={
            <InputAdornment position="end">
              <Button
                onClick={() => navigator.clipboard.writeText(fusionClaimUrl)}
              >
                <ContentCopyIcon />
              </Button>
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
};
