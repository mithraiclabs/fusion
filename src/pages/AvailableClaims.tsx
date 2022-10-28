import { Box, Typography } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { ClaimableAirdropRow } from "../components/Claimer/ClaimableAirdropRow";
import { useNetworkTokens } from "../hooks/useNetworkTokens";
import { networkAtom } from "../recoil";
import { availableDistributors } from "../recoil/util";
import { useCheckAvailbleDistributors } from "../recoil/util/transactions";

export const AvailableClaims: React.FC = () => {
  const { publicKey } = useWallet();
  const loadDistributors = useCheckAvailbleDistributors();
  const network = useRecoilValue(networkAtom);
  const tokens = useNetworkTokens();
  useEffect(() => {
    loadDistributors(publicKey, network);
  }, [publicKey, network, loadDistributors]);
  const availableList = useRecoilValue(availableDistributors);
  return (
    <Box>
      <Typography variant="h4">Rewards</Typography>
      {availableList.length ? (
        <Box my={2}>
          <Typography variant="h5">Available</Typography>
          {availableList.map((distributorInfo) => (
            <ClaimableAirdropRow
              key={distributorInfo.distributorAddress}
              distributorInfo={distributorInfo}
              underlyingToken={tokens[distributorInfo.underlyingAssetMint]}
              quoteToken={tokens[distributorInfo.quoteAssetMint]}
            />
          ))}
        </Box>
      ) : null}
    </Box>
  );
};
