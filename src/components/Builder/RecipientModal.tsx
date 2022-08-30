import {
  Box,
  Link,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useRecoilValue } from "recoil";
import { recipientJson } from "../../recoil/util";
import { modalStyle } from "./styles";

export const RecipientModal: React.VFC<{
  open: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ open, handleClose }) => {
  const selectedJSON = useRecoilValue(recipientJson);
  const recipientList = selectedJSON?.recipientList ?? [];
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <TableContainer sx={{ height: "338px" }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Wallet</TableCell>
                <TableCell>Max Options Claimable</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recipientList.map(({ recipient, amount }) => {
                return (
                  <TableRow key={recipient}>
                    <TableCell>
                      <Link
                        href={`https://solscan.io/account/${recipient}`}
                        rel="noopener"
                        target="_blank"
                        underline="none"
                      >
                        <Typography fontWeight={500} color={"#886733"}>
                          {recipient}
                        </Typography>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Typography>{amount}</Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Modal>
  );
};
