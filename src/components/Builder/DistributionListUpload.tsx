import {
  Button,
  FilledInput,
  FormControl,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import { Dispatch, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { airDropStage, recipientJson } from "../../recoil/util";
import { FusionButton } from "../FusionButton";
import { isJson, validDistributorJSON, validURL } from "../../lib/utils";
import { recipientJsonType } from "../../types";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Box } from "@mui/system";
import { NumberInput } from "../NumberInput";
import { FusionTab, FusionTabs } from "../FusionTabs";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { PAPER_COLOR } from "../../Theme";

enum recipientStyle {
  Manual = 0,
  Link,
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
  const [manualRecipients, setManualRecipients] = useState<ManualRecipient[]>(
    recipientJSON
      ? recipientJSON.recipientList.map(({ recipient, amount }) => {
          return {
            recipient,
            amount: Number(amount),
          };
        })
      : [
          {
            recipient: "",
            amount: 0,
          },
        ]
  );
  const [parsedJsonString, setParsedJsonString] =
    useState<recipientJsonType>(recipientJSON);

  useEffect(() => {
    try {
      if (isJson(string)) {
        setParsedJsonString(JSON.parse(string));
      } else {
        setParsedJsonString(null);
      }
    } catch (error) {
      console.log("bad json string");
    }
  }, [string]);

  return (
    <Box marginRight={"24px"}>
      <Typography marginBottom={"24px"}>
        Select any <b>one</b> of the following methods to set up your
        distribution list:
      </Typography>
      <FusionTabs value={uploadType} onChange={handleUploadTypeChange}>
        <FusionTab label="Manual" />
        <FusionTab label="JSON URL" />
        <FusionTab label="JSON string" />
      </FusionTabs>
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
      ) : uploadType === recipientStyle.Manual ? (
        <ManualRecipientInput
          list={manualRecipients}
          setList={setManualRecipients}
        />
      ) : (
        <Box>
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
        </Box>
      )}

      <FusionButton
        title="next: airdrop details"
        disabled={
          !(
            (url && validURL(url)) ||
            validDistributorJSON(parsedJsonString) ||
            !!manualRecipients.filter((r) => r.amount > 0 && r.recipient.length)
              .length
          )
        }
        onClick={async () => {
          let JSONdata;
          switch (uploadType) {
            case recipientStyle.Link:
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
              break;
            case recipientStyle.Manual:
              JSONdata = {
                recipientList: manualRecipients
                  .filter((r) => {
                    return r.amount > 0 && r.recipient.length;
                  })
                  .map(({ amount, recipient }) => {
                    return {
                      recipient,
                      amount: amount.toString(),
                    };
                  }),
              };
              break;
            case recipientStyle.String:
              JSONdata = parsedJsonString as recipientJsonType;
              break;
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
    </Box>
  );
};

const ManualRecipientInput: React.FC<{
  list: ManualRecipient[];
  setList: Dispatch<React.SetStateAction<ManualRecipient[]>>;
}> = ({ list, setList }) => {
  return (
    <Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h5">Wallet Address</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5">Amount</Typography>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map(({ recipient, amount }, index) => (
            <TableRow key={index}>
              <TableCell>
                <Input
                  disableUnderline
                  placeholder="Enter wallet address"
                  sx={{
                    backgroundColor: PAPER_COLOR,
                    border: "1px solid #AFAFAF",
                    outline: "none",
                    padding: "10px 16px",
                    borderRadius: "4px",
                    height: "40px",
                    width: "440px",
                  }}
                  value={recipient}
                  onChange={(event) => {
                    setList(
                      list.map((r, i) => ({
                        ...r,
                        recipient:
                          i === index ? event.target.value : r.recipient,
                      })) as ManualRecipient[]
                    );
                  }}
                />
              </TableCell>
              <TableCell width={"6%"}>
                <NumberInput
                  number={amount.toString()}
                  setNumber={(e: any) => {
                    setList(
                      list.map((r, i) => {
                        return {
                          ...r,
                          amount: i === index ? e : r.amount,
                        };
                      }) as ManualRecipient[]
                    );
                  }}
                  sx={{
                    root: {
                      border: (theme) =>
                        `1px solid ${theme.palette.background.paper}}`,
                      borderRadius: "4px",
                      maxHeight: "40px",
                      width: "52px",
                    },
                  }}
                />
              </TableCell>
              <TableCell width={"3%"}>
                <Button
                  sx={{ padding: "0px 0px 0px 0px" }}
                  disableRipple
                  onClick={() => {
                    setList(
                      list.filter((r, i) => {
                        return i !== index;
                      })
                    );
                  }}
                >
                  <RemoveCircleOutlineIcon sx={{ color: "black" }} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box
        sx={{
          float: "right",
        }}
      >
        <FusionButton
          icon={<AddCircleIcon />}
          title="ADD WALLET"
          type="light"
          onClick={() => {
            setList([...list, { recipient: "", amount: 0 }]);
          }}
        />
      </Box>
      <Box my={3} />
    </Box>
  );
};

declare type ManualRecipient = {
  recipient: string;
  amount: number;
};
