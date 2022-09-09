import { FilledInput, FormControl } from "@mui/material";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  airdropAddress,
  airdropBalance,
  claimStage,
  recipientJson,
} from "../../recoil/util";
import { FusionPaper } from "../FusionPaper";
import { useEffect, useState } from "react";
import { FusionButton } from "../FusionButton";
import { useParams } from "react-router-dom";
import { decodeLink, validURL } from "../../lib/utils";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token2";
import { deserializeSplTokenAccount } from "../../lib/deserializeSplTokenAccount";
import { FusionWalletButton } from "../ConnectWalletButton";

export const ClaimForm: React.FC = () => {
  const { jsonLink, airdropId } = useParams();
  const { publicKey } = useWallet();
  const setClaimStage = useSetRecoilState(claimStage);
  const setRecipientJSON = useSetRecoilState(recipientJson);
  const [claimAddress, setClaimAddress] = useRecoilState(airdropAddress);
  const setAirdropBalance = useSetRecoilState(airdropBalance);
  const [url, setUrl] = useState("");
  const { connection } = useConnection();

  useEffect(() => {
    if (jsonLink) {
      const decoded = decodeLink(jsonLink);
      setUrl(decoded);
    }
    if (airdropId) {
      setClaimAddress(airdropId);
    }
  }, [jsonLink, airdropId, setClaimAddress]);

  return (
    <FusionPaper
      header="Airdrop claim"
      title="Select the airdrop"
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
      <FormControl sx={{ width: "100%", my: 2 }} variant="filled">
        <FilledInput
          value={claimAddress ?? ""}
          onChange={(event) => {
            setClaimAddress(event.target.value);
          }}
          placeholder={"FUSION AIRDROP ID"}
        />
      </FormControl>
      {!publicKey ? (
        <FusionWalletButton />
      ) : (
        <FusionButton
          title={"confirm"}
          onClick={async () => {
            if (url && validURL(url) && claimAddress) {
              fetch(url)
                .then((res) => res.json())
                .then(async (json) => {
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
                    setRecipientJSON(safeJson);
                    const airdropAccountAddress = new PublicKey(claimAddress);
                    const accounts = (
                      await connection.getTokenAccountsByOwner(
                        airdropAccountAddress,
                        {
                          programId: TOKEN_PROGRAM_ID,
                        }
                      )
                    ).value.map((v) => v.account);
                    if (accounts[0]) {
                      const account = deserializeSplTokenAccount(accounts[0]);
                      const balance = Number(account.amount);
                      setAirdropBalance(balance);
                      setClaimStage(2);
                    }
                  } else {
                    throw new Error("Improperly formatted json");
                  }
                })
                .catch((e) => {
                  console.error({ e });
                });
            }
          }}
        />
      )}
    </FusionPaper>
  );
};
