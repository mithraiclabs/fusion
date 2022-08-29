import {
  Button,
  FilledInput,
  FormControl,
  InputAdornment,
  Typography,
} from "@mui/material";
import { useRecoilValue } from "recoil";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { distributorAddress, recipientJson } from "../../recoil/util";
import { FusionPaper } from "../FusionPaper";

export const AirdropSuccess: React.FC = () => {
  const _distributorAddress = useRecoilValue(distributorAddress);
  const recipientJSON = useRecoilValue(recipientJson);
  if (!_distributorAddress || !recipientJSON)
    throw new Error("Distributor Address not found");
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
          To claim go to https://app.projectfusion.io/claim
          <br />
          Select {recipientJSON.name} from the Airdrop list <br />
          Enter the following Fusion Airdrop id
        </Typography>
        <FormControl sx={{ m: 1, width: "60ch" }} variant="filled">
          <FilledInput
            value={_distributorAddress.toString()}
            endAdornment={
              <InputAdornment position="end">
                <Button
                  onClick={() =>
                    navigator.clipboard.writeText(
                      _distributorAddress.toString()
                    )
                  }
                >
                  <ContentCopyIcon />
                </Button>
              </InputAdornment>
            }
            aria-describedby="filled-weight-helper-text"
            inputProps={{
              "aria-label": "weight",
            }}
          />
        </FormControl>
      </FusionPaper>
    </>
  );
};
