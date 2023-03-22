import {
  FormControl,
  Select,
  TextField,
  MenuItem,
  InputLabel,
  Avatar,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";
import { useNetworkTokens } from "../../hooks/useNetworkTokens";
import { FusionButton } from "../FusionButton";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  airDropStage,
  builderOptionMintKey,
  optionMarketKeyForMinting,
  projectInfo,
} from "../../recoil/util";
import { deriveOptionKeyFromParams } from "@mithraic-labs/psy-american";
import { decMultiply, PSY_PROGRAM_ID } from "../../lib/utils";
import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import { RecipientModal } from "./RecipientModal";
import { getTotalContractsNeeded } from "../../recoil/wallet/selectors";

const QUOTE_ASSET_WHITELIST = ["USDC", "SOL"];
const FORM_MARGIN = {
  marginBottom: "20px",
};

const inputStyle = {
  "label + &": {
    marginTop: "5px",
  },
  "& .MuiInputBase-input": {
    fontSize: 16,
    width: "100%",
    height: "20px",
    padding: "10px 16px",
    "&:focus": {
      borderColor: "black",
    },
  },
};

export const ProjectInfoForm: React.FC = () => {
  const tokens = useNetworkTokens();
  const [_projectInfo, setProjectInfo] = useRecoilState(projectInfo);
  const setAirDropStage = useSetRecoilState(airDropStage);
  const setOptionMarketKey = useSetRecoilState(optionMarketKeyForMinting);
  const setOptionMintKey = useSetRecoilState(builderOptionMintKey);
  const [undAssetMint, setUndAssetMint] = useState<string>(
    _projectInfo?.underlyingAssetMint ?? ""
  );
  const [quoteAssetMint, setQuoteAssetMint] = useState<string>(
    _projectInfo?.quoteAssetMint ?? ""
  );
  const [expiration, setExpiration] = useState<Date | null>(
    _projectInfo?.expiration ? new Date(_projectInfo.expiration) : null
  );
  const [underlyingPerOption, setUnderlyingPerOption] = useState<string>(
    _projectInfo?.underlyingPerContract.toString() ?? ""
  );
  const [quotePerOption, setQuotePerOption] = useState<string>(
    _projectInfo?.quotePerContract.toString() ?? ""
  );
  const [description, setDescription] = useState<string>(
    _projectInfo?.description?.toString() ?? ""
  );
  const [name, setName] = useState<string>(
    _projectInfo?.name?.toString() ?? ""
  );
  const [validated, setValidated] = useState<boolean>(false);

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleExpirationChange = (newValue: Date | null) => {
    setExpiration(newValue);
  };
  const handleUndAssetChange = (newValue: string) => {
    setUndAssetMint(newValue);
  };
  const handleQuoteAssetChange = (newValue: string) => {
    setQuoteAssetMint(newValue);
  };
  const handleUnderlyingPerOption = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUnderlyingPerOption(event.target.value);
  };
  const handleQuotePerOption = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuotePerOption(event.target.value);
  };
  const contractsNeeded = useRecoilValue(getTotalContractsNeeded);
  const fullAirdropUnderlyingQty = decMultiply(
    contractsNeeded,
    Number(underlyingPerOption)
  );
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const textEncoder = new TextEncoder();
  const underlyingAssetSelector = (
    <FormControl fullWidth>
      <InputLabel id="und-asset-mint" shrink>
        <Typography variant="h5">Select the underlying asset</Typography>
      </InputLabel>
      <Select
        labelId="und-asset-mint"
        label="Select or add the underlying asset"
        value={undAssetMint?.toString() ?? null}
        onChange={(e) => {
          handleUndAssetChange(e.target.value);
        }}
        sx={[FORM_MARGIN, inputStyle]}
      >
        {Object.values(tokens).map((token) => (
          <MenuItem key={token.address} value={token.address}>
            <Stack direction={"row"}>
              <Avatar
                src={token.logoURI}
                sx={{
                  width: "19px",
                  height: "19px",
                }}
              />
              <Typography fontSize={13}>
                &nbsp;{token.symbol} - {token.name}
              </Typography>
            </Stack>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
  const quoteAssetSelector = (
    <FormControl fullWidth>
      <InputLabel id="quote-asset-mint" shrink>
        <Typography variant="h5">Select the quote asset</Typography>
      </InputLabel>
      <Select
        labelId="quote-asset-mint"
        label="Select or add the quote asset"
        value={quoteAssetMint?.toString() ?? null}
        onChange={(e) => {
          handleQuoteAssetChange(e.target.value);
        }}
        sx={[FORM_MARGIN, inputStyle]}
      >
        {Object.values(tokens)
          .filter(
            (t) =>
              QUOTE_ASSET_WHITELIST.includes(t.symbol) &&
              t.address !== undAssetMint
          )
          .map((token) => (
            <MenuItem key={token.address} value={token.address}>
              <Stack direction={"row"}>
                <Avatar
                  src={token.logoURI}
                  sx={{
                    width: "20px",
                    height: "20px",
                  }}
                />
                &nbsp;
                {token.symbol}
              </Stack>
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );

  useEffect(() => {
    if (
      !!undAssetMint &&
      !!quoteAssetMint &&
      !!expiration &&
      !!underlyingPerOption &&
      !!quotePerOption
    ) {
      setValidated(true);
    } else {
      setValidated(false);
    }
  }, [
    undAssetMint,
    quoteAssetMint,
    expiration,
    underlyingPerOption,
    quotePerOption,
  ]);

  const saveProjectInfo = async () => {
    setProjectInfo({
      underlyingAssetMint: undAssetMint,
      quoteAssetMint,
      expiration: Number(expiration),
      underlyingPerContract: Number(underlyingPerOption),
      quotePerContract: Number(quotePerOption),
      description,
      name,
    });
    // option meta key
    const [optionKey] = await deriveOptionKeyFromParams({
      programId: PSY_PROGRAM_ID,
      underlyingMint: new PublicKey(undAssetMint),
      quoteMint: new PublicKey(quoteAssetMint),
      underlyingAmountPerContract: new BN(
        Number(underlyingPerOption) *
          Math.pow(10, tokens[undAssetMint].decimals)
      ),
      quoteAmountPerContract: new BN(
        Number(quotePerOption) * Math.pow(10, tokens[quoteAssetMint].decimals)
      ),
      expirationUnixTimestamp: new BN(Number(expiration ?? 0) / 1000),
    });
    const [optionMintKey] = await PublicKey.findProgramAddress(
      [optionKey.toBuffer(), textEncoder.encode("optionToken")],
      PSY_PROGRAM_ID
    );

    setOptionMarketKey(optionKey);
    setOptionMintKey(optionMintKey);
    setAirDropStage(4);
  };

  return (
    <>
      <Box marginRight={"24px"}>
        <RecipientModal open={modalOpen} handleClose={handleModalClose} />
        <Typography>Provide the specifications for your airdrop</Typography>
        <Box height={"24px"} />
        <FormControl fullWidth>
          <InputLabel shrink>
            <Typography variant="h5">Name</Typography>
          </InputLabel>
          <TextField
            fullWidth
            id="name"
            type={"text"}
            value={name}
            onChange={handleNameChange}
            sx={[FORM_MARGIN, inputStyle]}
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel shrink>
            <Typography variant="h5">Description</Typography>
          </InputLabel>
          <TextField
            fullWidth
            id="description"
            type={"text"}
            value={description}
            onChange={handleDescriptionChange}
            sx={[FORM_MARGIN, inputStyle]}
          />
        </FormControl>
        <Stack direction={"row"} justifyContent={"space-between"}>
          {underlyingAssetSelector}
          <Box width={"16px"} />
          {quoteAssetSelector}
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <FormControl fullWidth>
            <InputLabel shrink>
              <Typography variant="h5">
                underlying assets per option contract
              </Typography>
            </InputLabel>
            <TextField
              required
              id="und-per-option"
              type={"number"}
              value={underlyingPerOption}
              onChange={handleUnderlyingPerOption}
              sx={[FORM_MARGIN, inputStyle]}
            />
          </FormControl>
          <Box width={"16px"} />
          <FormControl fullWidth>
            <InputLabel shrink>
              <Typography variant="h5">
                Quote assets per option contract
              </Typography>
            </InputLabel>
            <TextField
              required
              id="quote-per-option"
              type={"number"}
              value={quotePerOption}
              onChange={handleQuotePerOption}
              sx={[FORM_MARGIN, inputStyle]}
            />
          </FormControl>
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <FormControl fullWidth>
            <InputLabel shrink>
              <Typography variant="h5">Expiration Date</Typography>
            </InputLabel>
            <DateTimePicker
              value={expiration}
              onChange={handleExpirationChange}
              renderInput={(params) => (
                <TextField sx={[FORM_MARGIN, inputStyle]} {...params} />
              )}
            />
          </FormControl>
          <Box width={"16px"} />
          <Box width={"100%"}>
            {!!undAssetMint && (
              <FormControl fullWidth>
                <InputLabel shrink>
                  <Typography variant="h5">
                    amount you need to provide
                  </Typography>
                </InputLabel>

                <Typography
                  variant="h2"
                  sx={{
                    fontSize: "32px",
                    marginTop: "12px",
                    marginLeft: "12px",
                  }}
                >
                  {fullAirdropUnderlyingQty} {tokens[undAssetMint].symbol}
                </Typography>
              </FormControl>
            )}
          </Box>
        </Stack>

        <Stack direction={"row"} justifyContent={"space-between"}>
          <FusionButton
            title="next: token confirmation"
            onClick={saveProjectInfo}
            disabled={!validated}
          />
          <FusionButton
            title="Check Recipient List"
            onClick={handleModalOpen}
            type={"light"}
          />
        </Stack>
      </Box>
    </>
  );
};
