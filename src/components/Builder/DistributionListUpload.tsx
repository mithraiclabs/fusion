import { FilledInput, FormControl } from "@mui/material";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { airDropStage, jsonURL, recipientJson } from "../../recoil/util";
import { FusionButton } from "../FusionButton";
import { FusionPaper } from "../FusionPaper";
import { encodeLink, validURL } from "../../lib/utils";

export const DistributionListUpload: React.VFC = () => {
  const setAirDropStage = useSetRecoilState(airDropStage);
  const setRecipientJSON = useSetRecoilState(recipientJson);
  const setJsonUrl = useSetRecoilState(jsonURL);
  const [url, setUrl] = useState("");

  return (
    <FusionPaper
      header="Formatting and uploading the distribution file (beta)"
      title="Input the recipient list json URL"
      divisor={true}
    >
      <FormControl sx={{ width: "100%", my: 2 }} variant="filled">
        <FilledInput
          value={url}
          onChange={(event) => {
            setUrl(event.target.value);
          }}
          placeholder={"JSON url"}
        />
      </FormControl>
      <FusionButton
        title="next"
        disabled={!(url && validURL(url))}
        onClick={async () => {
          fetch(url)
            .then((res) => res.json())
            .then((json) => {
              if (
                json.name &&
                json.recipientList &&
                Array.isArray(json.recipientList)
              ) {
                const safeRecList = json.recipientList.map((r: any) => {
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
                  name: json.name,
                  recipientList: safeRecList,
                };

                setJsonUrl(encodeLink(url));
                setRecipientJSON(safeJson);
                setAirDropStage(3);
              } else {
                throw new Error("Improperly formatted json");
              }
            })
            .catch((e) => {
              console.error({ e });
            });
        }}
      />
    </FusionPaper>
  );
};
