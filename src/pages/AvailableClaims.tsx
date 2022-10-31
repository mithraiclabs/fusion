import { Box, Typography } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { ClaimableAirdropRow } from "../components/Claimer/ClaimableAirdropRow";
import { useNetworkTokens } from "../hooks/useNetworkTokens";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { networkAtom } from "../recoil";
import { availableDistributors } from "../recoil/util";
import { useCheckAvailbleDistributors } from "../recoil/util/transactions";
import { SMALL_SCREEN_WIDTH } from "../Theme";

export const AvailableClaims: React.FC = () => {
  const { publicKey } = useWallet();
  const loadDistributors = useCheckAvailbleDistributors();
  const network = useRecoilValue(networkAtom);
  const tokens = useNetworkTokens();
  useEffect(() => {
    loadDistributors(publicKey, network);
  }, [publicKey, network, loadDistributors]);
  const { width } = useWindowDimensions();
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
              isMobile={width < SMALL_SCREEN_WIDTH}
            />
          ))}
        </Box>
      ) : null}
    </Box>
  );
};
