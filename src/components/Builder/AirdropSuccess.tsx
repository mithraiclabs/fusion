import {
  Button,
  FilledInput,
  FormControl,
  InputAdornment,
  Typography,
} from "@mui/material";
import { useRecoilValue } from "recoil";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { distributorAddress, jsonURL, recipientJson } from "../../recoil/util";
import { FusionPaper } from "../FusionPaper";
export const AirdropSuccess: React.FC = () => {
  const _distributorAddress = useRecoilValue(distributorAddress);
  const recipientJSON = useRecoilValue(recipientJson);
  const jsonUrl = useRecoilValue(jsonURL);
  const link = `https://staging.projectfusion.io/claim/${jsonUrl}/${_distributorAddress}`;
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
          Claimants should use the following link
        </Typography>
        <FormControl sx={{ m: 1, width: "100%" }} variant="filled">
          <FilledInput
            value={link}
            endAdornment={
              <InputAdornment position="end">
                <Button onClick={() => navigator.clipboard.writeText(link)}>
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
