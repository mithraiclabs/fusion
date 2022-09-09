import { Box, Button, Typography } from "@mui/material";
import { useMatch, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { optionMarketFamily, tokenAccountsMap } from "../../recoil";
import { WriterActions } from "../../components/WritersOverview/WriterActions";

export const Writer: React.FC = () => {
  const optionMarketKey = useMatch("/writer/:key")?.params?.key || "";
  const optionMeta = useRecoilValue(optionMarketFamily(optionMarketKey));
  const optionTokenAccount = useRecoilValue(
    tokenAccountsMap(optionMeta?.optionMint?.toString() ?? "")
  );
  const writerTokenAccount = useRecoilValue(
    tokenAccountsMap(optionMeta?.writerTokenMint?.toString() ?? "")
  );
  const navigate = useNavigate();
  if (!optionMeta || !writerTokenAccount)
    return (
      <Box>
        <Typography>Option Market not found</Typography>
        <Button
          onClick={() => {
            navigate("/recover");
          }}
        >
          Return to Token Recovery Page
        </Button>
      </Box>
    );

  return (
    <WriterActions
      optionMeta={optionMeta}
      optionTokenAccount={optionTokenAccount}
      writerTokenAccount={writerTokenAccount}
    />
  );
};
