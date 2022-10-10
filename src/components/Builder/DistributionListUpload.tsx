import {
  FilledInput,
  FormControl,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { airDropStage, recipientJson } from "../../recoil/util";
import { FusionButton } from "../FusionButton";
import { FusionPaper } from "../FusionPaper";
import { isJson, validDistributorJSON, validURL } from "../../lib/utils";
import { recipientJsonType } from "../../types";

enum recipientStyle {
  Link = 0,
  String,
}

export const DistributionListUpload: React.VFC = () => {
  const setAirDropStage = useSetRecoilState(airDropStage);
  const [recipientJSON, setRecipientJSON] = useRecoilState(recipientJson);
  const [uploadType, setUploadType] = useState<recipientStyle>(0);
  const handleUploadTypeChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    // Clears input when switching tabs
    if (newValue === recipientStyle.String) {
      setUrl("");
    }
    setUploadType(newValue);
  };
  const [url, setUrl] = useState("");
  const [string, setString] = useState(
    recipientJSON ? JSON.stringify(recipientJSON) : ""
  );
  const [parsedJsonString, setParsedJsonString] =
    useState<recipientJsonType>(recipientJSON);

  useEffect(() => {
    try {
      console.log({ string });
      if (isJson(string)) {
        console.log("string is json");

        setParsedJsonString(JSON.parse(string));
      } else {
        setParsedJsonString(null);
      }
    } catch (error) {
      console.log("bad json string");
    }
  }, [string]);

  return (
    <FusionPaper
      header="Distribution list (beta)"
      title="Input the recipient list json URL / string"
      divisor={true}
    >
      <Tooltip
        title={`{              
        "recipientList" : [
          {              
            "recipient" : "---wallet address---",  
            "amount" : "---reward token amount---"   
          },                  
          ...
        ]            
      }`}
      >
        <Typography variant="h5">
          Format <HelpIcon />
        </Typography>
      </Tooltip>
      <Tabs value={uploadType} onChange={handleUploadTypeChange} centered>
        <Tab label="JSON URL" />
        <Tab label="JSON string" />
      </Tabs>
      {uploadType === recipientStyle.Link ? (
        <FormControl sx={{ width: "100%", my: 2 }} variant="filled">
          <FilledInput
            value={url}
            onChange={(event) => {
              setUrl(event.target.value);
            }}
            placeholder={"JSON/CSV url"}
          />
        </FormControl>
      ) : (
        <FormControl sx={{ width: "100%", my: 2 }} variant="filled">
          <FilledInput
            value={string}
            onChange={(event) => {
              setString(event.target.value);
            }}
            placeholder={"JSON/CSV string"}
            multiline
          />
        </FormControl>
      )}

      <FusionButton
        title="next"
        disabled={
          !((url && validURL(url)) || validDistributorJSON(parsedJsonString))
        }
        onClick={async () => {
          let JSONdata;
          if (!!url) {
            fetch(url)
              .then((res) => res.json())
              .then((json) => {
                if (validDistributorJSON(json)) {
                  JSONdata = json as recipientJsonType;
                } else {
                  throw new Error("Improperly formatted json");
                }
              })
              .catch((e) => {
                console.error({ e });
              });
          } else if (!!parsedJsonString) {
            JSONdata = parsedJsonString as recipientJsonType;
          }
          if (JSONdata) {
            const safeRecList = JSONdata.recipientList.map((r: any) => {
              if (
                !r.amount ||
                !r.recipient ||
                typeof r.recipient !== "string" ||
                typeof r.amount !== "string"
              ) {
                throw new Error("Improperly formatted json");
              }
              return {
                amount: r.amount,
                recipient: r.recipient,
              };
            }) as {
              amount: string;
              recipient: string;
            }[];
            const safeJson = {
              recipientList: safeRecList,
            };
            setRecipientJSON(safeJson);
            setAirDropStage(3);
          }
        }}
      />
    </FusionPaper>
  );
};
