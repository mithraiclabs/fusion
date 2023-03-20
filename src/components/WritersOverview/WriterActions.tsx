import { OptionMarketWithKey } from "@mithraic-labs/psy-american";
import { Box, Typography } from "@mui/material";
import { BN } from "@project-serum/anchor";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { FusionButton } from "../../components/FusionButton";
import { useClosePosition } from "../../hooks/psyAmerican/useClosePosition";
import { useCloseWrittenOptionPostExpiration } from "../../hooks/psyAmerican/useCloseWrittenOptionPostExpiration";
import { useExchangeWriterTokenForQuote } from "../../hooks/psyAmerican/useExchangeWriterForQuote";
import { useOptionVaultAmounts } from "../../hooks/psyAmerican/useOptionVaultAmounts";
import { useNetworkTokens } from "../../hooks/useNetworkTokens";
import { contractsToAmount, mapNetworkTypes } from "../../lib/utils";
import projectList from "../../projects/projectList";
import { networkAtom, TokenAccountWithKey } from "../../recoil";
import { RecoverClaim } from "../../components/WritersOverview/RecoverClaim";
import { ProjectCard } from "../OptionsOverview/OptionCard";
import { bottomBorderBox, PAPER_COLOR, topBorderBox } from "../../Theme";

export const WriterActions: React.FC<{
  optionMeta: OptionMarketWithKey;
  optionTokenAccount: TokenAccountWithKey | null;
  writerTokenAccount: TokenAccountWithKey;
}> = ({ optionMeta, optionTokenAccount, writerTokenAccount }) => {
  const optionMarketKey = optionMeta.key.toString();
  const {
    underlyingAmountPerContract,
    quoteAmountPerContract,
    expired,
    underlyingAssetMint,
    quoteAssetMint,
  } = optionMeta;
  const [quoteVaultAmount, underlyingVaultAmount] =
    useOptionVaultAmounts(optionMarketKey);
  const closeExpiredWriter =
    useCloseWrittenOptionPostExpiration(optionMarketKey);
  const exchangeForQuote = useExchangeWriterTokenForQuote(optionMarketKey);
  const closePosition = useClosePosition(optionMarketKey);
  const tokens = useNetworkTokens();
  const network = useRecoilValue(networkAtom);
  const [writerAmount, setWriterAmount] = useState(
    Number(writerTokenAccount.amount)
  );
  const [optionAmount, setOptionAmount] = useState(
    Number(optionTokenAccount?.amount ?? 0)
  );
  const navigate = useNavigate();
  const quoteToken = tokens[quoteAssetMint.toString()];
  const underlyingToken = tokens[underlyingAssetMint.toString()];
  const project =
    projectList[mapNetworkTypes(network.key)][underlyingToken.address];
  const projectSymbol =
    project?.symbol ?? tokens[underlyingAssetMint.toString()].symbol;
  const quoteVaultContractQty = quoteVaultAmount
    .div(quoteAmountPerContract)
    .toNumber();

  const underlyingVaultContractQty = underlyingVaultAmount
    .div(underlyingAmountPerContract)
    .toNumber();

  const contractsClosable = Math.min(optionAmount, writerAmount);
  const contractsCovertableToUnderlying = Math.min(
    underlyingVaultContractQty,
    writerAmount
  );
  const contractsCovertableToQuote = Math.min(
    quoteVaultContractQty,
    writerAmount
  );

  const [contractsToClose, setContractsToClose] = useState(
    String(contractsClosable)
  );
  const [contractsToUnderlying, setContractsToUnderlying] = useState(
    String(contractsCovertableToUnderlying)
  );
  const [contractsToQuote, setContractsToQuote] = useState(
    String(contractsCovertableToQuote)
  );

  const amountToReceiveFromClosing = contractsToAmount(
    underlyingAmountPerContract,
    Number(contractsToClose),
    underlyingToken.decimals
  );

  const amountToReceiveFromUnderlyingClaim = contractsToAmount(
    underlyingAmountPerContract,
    Number(contractsToUnderlying),
    underlyingToken.decimals
  );

  const amountToReceiveFromQuoteClaim = contractsToAmount(
    quoteAmountPerContract,
    Number(contractsToQuote),
    quoteToken.decimals
  );

  useEffect(() => {
    setContractsToUnderlying(contractsCovertableToUnderlying.toString());
    setContractsToQuote(contractsCovertableToQuote.toString());
  }, [
    underlyingVaultAmount,
    quoteVaultAmount,
    contractsCovertableToUnderlying,
    contractsCovertableToQuote,
  ]);

  // Close contracts [need to have both option and writer tokens]
  const ableToClose = !!optionAmount;
  // IF EXPIRED YOU CAN CLAIM UNDERLYING based on underlyingVaultAmount
  const ableToBurnForUnderlying = expired && !!Number(underlyingVaultAmount);
  // IF quoteVaultAmount > 0 you can claim quote
  const ableToBurnForQuote = !!Number(quoteVaultAmount);
  const token = tokens[underlyingAssetMint.toString()];
  if (
    !writerAmount ||
    (!ableToBurnForUnderlying && !ableToBurnForQuote && !ableToClose)
  ) {
    return (
      <Box
        sx={{
          px: 3,
          py: 2,
          background: PAPER_COLOR,
          ...bottomBorderBox,
          ...topBorderBox,
        }}
      >
        <Typography sx={{ marginBottom: "24px" }}>
          {!writerAmount
            ? "No more writer tokens for this option market"
            : "No claimable assets"}
        </Typography>

        <FusionButton
          color={project?.primaryColor ?? undefined}
          title="Return to Token Recovery Page"
          onClick={() => {
            navigate("/recover");
          }}
        />
      </Box>
    );
  }

  return (
    <Box marginBottom={4}>
      <ProjectCard
        projectKey={underlyingAssetMint.toString()}
        fixedHeight={false}
      >
        <Box
          sx={{
            px: 3,
            py: 2,
            background: PAPER_COLOR,
            ...bottomBorderBox,
          }}
        >
          <Typography variant="body1" component="p">
            {projectSymbol} options rewards are American style. They can be
            exercised to buy the underlying {projectSymbol} token at the strike
            price until expiry
          </Typography>
          <Typography>Writer Tokens Remaining: {writerAmount}</Typography>
          {!!optionAmount && (
            <Typography>Option Tokens Remaining: {optionAmount}</Typography>
          )}
        </Box>
      </ProjectCard>
      {ableToClose && (
        <RecoverClaim
          type={"ClosePosition"}
          projectSymbol={project ? project.symbol : token.symbol}
          max={contractsClosable}
          amountToBurn={contractsToClose}
          amountToReceive={amountToReceiveFromClosing}
          setAmountToBurn={setContractsToClose}
          onClick={async () => {
            if (await closePosition(Number(contractsToClose))) {
              setOptionAmount((prev) => prev - Number(contractsToClose));
              setWriterAmount((prev) => prev - Number(contractsToClose));
            }
          }}
        />
      )}
      {ableToBurnForUnderlying && (
        <RecoverClaim
          type={"BurnForUnderlying"}
          projectSymbol={project ? project.symbol : token.symbol}
          max={contractsCovertableToUnderlying}
          amountToBurn={contractsToUnderlying}
          amountToReceive={amountToReceiveFromUnderlyingClaim}
          setAmountToBurn={setContractsToUnderlying}
          onClick={async () => {
            if (await closeExpiredWriter(Number(contractsToUnderlying))) {
              setWriterAmount((prev) => prev - Number(contractsToUnderlying));
            }
          }}
        />
      )}
      {ableToBurnForQuote && (
        <RecoverClaim
          type={"BurnForQuote"}
          projectSymbol={project ? project.symbol : token.symbol}
          max={contractsCovertableToQuote}
          amountToBurn={contractsToQuote}
          amountToReceive={amountToReceiveFromQuoteClaim}
          setAmountToBurn={setContractsToQuote}
          quoteSymbol={quoteToken.symbol}
          onClick={async () => {
            if (await exchangeForQuote(new BN(contractsToQuote))) {
              setWriterAmount((prev) => prev - Number(contractsToQuote));
            }
          }}
        />
      )}
    </Box>
  );
};
