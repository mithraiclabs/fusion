import {
  Button,
  FilledInput,
  FormControl,
  InputAdornment,
  Typography,
} from "@mui/material";
import { useRecoilValue } from "recoil";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { distributorAddress } from "../../recoil/util";
import { FusionPaper } from "../FusionPaper";

const fusionClaimUrl = "https://staging.projectfusion.io/";
export const AirdropSuccess: React.FC = () => {
  const _distributorAddress = useRecoilValue(distributorAddress);
  if (!_distributorAddress) throw new Error("Distributor Address not found");
  return (
    <>
      <FusionPaper border={true} header="Success">
        <Typography fontSize={"24px"} fontWeight={500} align="center">
          Congratulations, the Airdrop has been created
        </Typography>
        <Typography
          fontSize={"16px"}
          fontWeight={400}
          align="center"
          marginBottom={"25px"}
        >
          Claimants should use the following link
        </Typography>
        <FormControl sx={{ m: 1, width: "100%" }} variant="filled">
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
      </FusionPaper>
    </>
  );
};
