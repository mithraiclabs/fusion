import {
  Button,
  FilledInput,
  FormControl,
  Input,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import { Dispatch, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { airDropStage, recipientJson } from "../../recoil/util";
import { FusionButton } from "../FusionButton";
import { FusionPaper } from "../FusionPaper";
import { isJson, validDistributorJSON, validURL } from "../../lib/utils";
import { recipientJsonType } from "../../types";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Box } from "@mui/system";
import { NumberInput } from "../NumberInput";

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
      <Tabs value={uploadType} onChange={handleUploadTypeChange} centered>
        <Tab label="Manual" />
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
        title="next"
        disabled={
          !(
            (url && validURL(url)) ||
            validDistributorJSON(parsedJsonString) ||
            !!manualRecipients.filter((r) => {
              console.log({ r });

              return r.amount > 0 && r.recipient.length;
            }).length
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
    </FusionPaper>
  );
};

const ManualRecipientInput: React.FC<{
  list: ManualRecipient[];
  setList: Dispatch<React.SetStateAction<ManualRecipient[]>>;
}> = ({ list, setList }) => {
  return (
    <Box>
      <Table>
        <TableHead>
          <TableCell>Wallet</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell></TableCell>
        </TableHead>
        <TableBody>
          {list.map(({ recipient, amount }, index) => (
            <TableRow>
              <TableCell width={"85%"}>
                <Input
                  sx={{
                    minWidth: "100%",
                  }}
                  value={recipient}
                  onChange={(event) => {
                    setList(
                      list.map((r, i) => {
                        console.log({ i, index, va: event.target.value });
                        const toret = {
                          ...r,
                          recipient:
                            i === index ? event.target.value : r.recipient,
                        };
                        console.log({ toret });

                        return toret;
                      }) as ManualRecipient[]
                    );
                  }}
                />
              </TableCell>
              <TableCell width={"10%"}>
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
                    border: (theme) =>
                      `1px solid ${theme.palette.secondary.dark}}`,
                    borderRadius: "10px",
                  }}
                />
              </TableCell>
              <TableCell width={"5%"}>
                <Button
                  disableRipple
                  onClick={() => {
                    setList(
                      list.filter((r, i) => {
                        return i !== index;
                      })
                    );
                  }}
                >
                  <RemoveCircleOutlineIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        onClick={() => {
          setList([...list, { recipient: "", amount: 0 }]);
        }}
      >
        <AddBoxOutlinedIcon />
      </Button>
    </Box>
  );
};

declare type ManualRecipient = {
  recipient: string;
  amount: number;
};
