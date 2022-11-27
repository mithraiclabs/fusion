import { Token } from "@mithraic-labs/psy-token-registry";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
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
  selectedWindowAtom,
} from "../../recoil/util";
import {
  BORDER_RADIUS_1,
  BORDER_RADIUS_2,
  DESKTOP_PAPER_WIDTH,
} from "../../Theme";

const btnStyle = {
  gap: "8px",
  alignSelf: "flex-end",
  height: "32px",
  background: "#454545",
  borderRadius: BORDER_RADIUS_1,
  flex: "none",
  order: 3,
  flexGrow: 0,
};

export const ClaimableAirdropRow: React.FC<{
  distributorInfo: DistributorInfo;
  underlyingToken: Token;
  quoteToken: Token;
  isMobile?: boolean;
}> = ({ distributorInfo, underlyingToken, isMobile }) => {
  const setClaimAddress = useSetRecoilState(airdropAddress);
  const setClaimStage = useSetRecoilState(claimStage);
  const setRecipientJSON = useSetRecoilState(recipientJson);
  const setSelectedClaim = useSetRecoilState(selectedClaim);
  const setSelectedWindow = useSetRecoilState(selectedWindowAtom);
  const { connection } = useConnection();
  const setAirdropBalance = useSetRecoilState(airdropBalance);
  const {
    distributorAddress: address,
    description,
    optionName,
  } = distributorInfo;
  const claimButton = (
    <Button
      sx={btnStyle}
      variant="contained"
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
          await connection.getTokenAccountsByOwner(airdropAccountAddress, {
            programId: TOKEN_PROGRAM_ID,
          })
        ).value.map((v) => v.account);

        if (accounts[0]) {
          const account = deserializeSplTokenAccount(accounts[0]);
          const balance = Number(account.amount);
          setAirdropBalance(balance);
          setSelectedClaim(distributorInfo);
          setClaimStage(2);
          e.preventDefault();
          setSelectedWindow("Claim");
        }
      }}
      key={address}
    >
      Claim
    </Button>
  );
  if (isMobile)
    return (
      <Box>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Box>
            <Avatar src={underlyingToken.logoURI} />
          </Box>
          <Typography variant="body2">{optionName}</Typography>
          {claimButton}
        </Stack>
      </Box>
    );
  return (
    <Box
      my={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "8px",
        width: DESKTOP_PAPER_WIDTH,
        height: "72px",
        background: "#ffffff",
        borderRadius: BORDER_RADIUS_2,
        flex: "none",
        order: 1,
        alignSelf: "stretch",
        flexGrow: 0,
      }}
    >
      <Box
        sx={{
          padding: "16px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "12px",
          flex: "none",
          order: 1,
          alignSelf: "stretch",
          flexGrow: 0,
        }}
      >
        <Box>
          <Avatar src={underlyingToken.logoURI} />
        </Box>
        <Box
          my={"auto"}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "0px",
            width: "482px",
            height: "40px",
            flex: "none",
            order: 1,
            flexGrow: 1,
          }}
        >
          <Typography variant="body2">{optionName}</Typography>
          <Typography variant="body1">
            {description.length > 62
              ? `${description.substring(0, 59)}...`
              : description}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "0px",
            flex: "none",
            order: 2,
            flexGrow: 2,
            my: "auto",
          }}
        >
          {claimButton}
        </Box>
      </Box>
    </Box>
  );
};
