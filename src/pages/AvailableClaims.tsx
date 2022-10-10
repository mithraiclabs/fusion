import { Box, Typography } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { ClaimableAirdropRow } from "../components/Claimer/ClaimableAirdropRow";
import { networkAtom } from "../recoil";
import { availableDistributors } from "../recoil/util";
import { useCheckAvailbleDistributors } from "../recoil/util/transactions";

export const AvailableClaims: React.FC = () => {
  const { publicKey } = useWallet();
  const loadDistributors = useCheckAvailbleDistributors();
  const network = useRecoilValue(networkAtom);
  useEffect(() => {
    loadDistributors(publicKey, network);
  }, [publicKey, network, loadDistributors]);
  const availableList = useRecoilValue(availableDistributors);
  return (
    <Box>
      {availableList.length ? (
        <Box my={2}>
          <Typography variant="h4">Avaliable</Typography>
          {availableList.map(
            ({
              distributorAddress,
              description,
              optionMarketKey,
              optionTokenQty,
            }) => (
              <ClaimableAirdropRow
                key={distributorAddress}
                optionMarketKey={optionMarketKey}
                distributorAddress={distributorAddress}
                description={description}
                claimableQty={optionTokenQty}
              />
            )
          )}
        </Box>
      ) : null}
    </Box>
  );
};
