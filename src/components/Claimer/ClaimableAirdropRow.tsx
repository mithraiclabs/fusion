import { Token } from "@mithraic-labs/psy-token-registry";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { getRecipientsForDistributor } from "../../api";
import { deserializeSplTokenAccount } from "../../lib/deserializeSplTokenAccount";
import {
  airdropAddress,
  airdropBalance,
  claimStage,
  DistributorInfo,
  recipientJson,
  selectedClaim,
} from "../../recoil/util";

export const ClaimableAirdropRow: React.FC<{
  distributorInfo: DistributorInfo;
  underlyingToken: Token;
  quoteToken: Token;
}> = ({ distributorInfo, underlyingToken, quoteToken }) => {
  const navigate = useNavigate();
  const setClaimAddress = useSetRecoilState(airdropAddress);
  const setClaimStage = useSetRecoilState(claimStage);
  const setRecipientJSON = useSetRecoilState(recipientJson);
  const setSelectedClaim = useSetRecoilState(selectedClaim);
  const { connection } = useConnection();
  const setAirdropBalance = useSetRecoilState(airdropBalance);
  const {
    distributorAddress: address,
    description,
    optionName,
  } = distributorInfo;
  return (
    <Box
      my={2}
      sx={{
        border: `#DEE7EF 1px solid`,
        background: "#ffffff",
        minHeight: "4em",
        borderRadius: "8px",
      }}
    >
      <Stack direction={"row"} justifyContent={"space-evenly"} my={"1em"}>
        <Box mx={"auto"} my={"auto"}>
          <Avatar src={underlyingToken.logoURI} />
        </Box>
        <Box mx={"auto"} my={"auto"}>
          <Typography>{optionName}</Typography>
        </Box>
        <Box mx={"auto"}>
          <Button
            sx={{
              width: "100%",
              color: "#3CC88D",
              border: "#3CC88D 1px solid",
              borderRadius: "8px",
            }}
            onClick={async (e) => {
              setClaimAddress(address);
              const recipients = await getRecipientsForDistributor({
                distributorAddress: address,
              });
              const safeRecList = recipients.map((r: any) => {
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
                name: description,
                recipientList: safeRecList,
              };
              setRecipientJSON(safeJson);
              const airdropAccountAddress = new PublicKey(address);
              const accounts = (
                await connection.getTokenAccountsByOwner(
                  airdropAccountAddress,
                  {
                    programId: TOKEN_PROGRAM_ID,
                  }
                )
              ).value.map((v) => v.account);
              console.log({ accounts });

              if (accounts[0]) {
                const account = deserializeSplTokenAccount(accounts[0]);
                const balance = Number(account.amount);
                setAirdropBalance(balance);
                setSelectedClaim(distributorInfo);
                setClaimStage(2);
                e.preventDefault();
                navigate("/claim");
              }
            }}
            key={address}
          >
            Claim
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};
