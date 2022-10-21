import {
  FormControl,
  Select,
  TextField,
  MenuItem,
  InputLabel,
  Avatar,
  Stack,
  Box,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";
import { FusionPaper } from "../FusionPaper";
import { useNetworkTokens } from "../../hooks/useNetworkTokens";
import { FusionButton } from "../FusionButton";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  airDropStage,
  builderOptionMintKey,
  optionMarketKeyForMinting,
  projectInfo,
  recipientJson,
} from "../../recoil/util";
import { deriveOptionKeyFromParams } from "@mithraic-labs/psy-american";
import { PSY_PROGRAM_ID } from "../../lib/utils";
import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import { RecipientModal } from "./RecipientModal";

const QUOTE_ASSET_WHITELIST = ["USDC", "SOL"];
const FORM_MARGIN = {
  marginBottom: "20px",
};

export const ProjectInfoForm: React.FC = () => {
  const tokens = useNetworkTokens();
  const [_projectInfo, setProjectInfo] = useRecoilState(projectInfo);
  const setAirDropStage = useSetRecoilState(airDropStage);
  const setOptionMarketKey = useSetRecoilState(optionMarketKeyForMinting);
  const setOptionMintKey = useSetRecoilState(builderOptionMintKey);
  const recipientJSON = useRecoilValue(recipientJson);
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
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const textEncoder = new TextEncoder();

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

  return (
    <>
      <FusionPaper
        title={`PROJECT INFORMATION${
          recipientJSON ? ` FOR ${!!name ? name : "untitled"} AIRDROP` : ""
        }`}
      >
        <FusionButton title="Check Recipient List" onClick={handleModalOpen} />
        <RecipientModal open={modalOpen} handleClose={handleModalClose} />
        <Box my={2} />
        <TextField
          fullWidth
          label="Name"
          id="name"
          type={"text"}
          value={name}
          onChange={handleNameChange}
          sx={FORM_MARGIN}
        />
        <TextField
          fullWidth
          label="Description"
          id="description"
          type={"text"}
          value={description}
          onChange={handleDescriptionChange}
          sx={FORM_MARGIN}
        />
        <FormControl fullWidth required>
          <InputLabel id="und-asset-mint">
            Select or add the underlying asset
          </InputLabel>
          <Select
            labelId="und-asset-mint"
            label="Select or add the underlying asset"
            value={undAssetMint?.toString() ?? null}
            onChange={(e) => {
              handleUndAssetChange(e.target.value);
            }}
            style={FORM_MARGIN}
          >
            {Object.values(tokens).map((token) => (
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
        <FormControl fullWidth required>
          <InputLabel id="quote-asset-mint">
            Select or add the quote asset
          </InputLabel>
          <Select
            labelId="quote-asset-mint"
            label="Select or add the quote asset"
            value={quoteAssetMint?.toString() ?? null}
            onChange={(e) => {
              handleQuoteAssetChange(e.target.value);
            }}
            style={FORM_MARGIN}
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
        <FormControl fullWidth required>
          <DateTimePicker
            label="Expiration Date"
            value={expiration}
            onChange={handleExpirationChange}
            renderInput={(params) => <TextField sx={FORM_MARGIN} {...params} />}
          />
        </FormControl>
        <TextField
          fullWidth
          required
          label="Number of underlying assets per option contract"
          id="und-per-option"
          type={"number"}
          value={underlyingPerOption}
          onChange={handleUnderlyingPerOption}
          sx={FORM_MARGIN}
        />
        <TextField
          fullWidth
          required
          label="Number of quote assets per option contract"
          id="quote-per-option"
          type={"number"}
          value={quotePerOption}
          onChange={handleQuotePerOption}
          sx={FORM_MARGIN}
        />
        <FusionButton
          title="Continue"
          onClick={async () => {
            const underlyingAmountPerContract = new BN(
              Number(underlyingPerOption) *
                Math.pow(10, tokens[undAssetMint].decimals)
            );

            const quoteAmountPerContract = new BN(
              Number(quotePerOption) *
                Math.pow(10, tokens[quoteAssetMint].decimals)
            );

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
              underlyingAmountPerContract,
              quoteAmountPerContract,
              expirationUnixTimestamp: new BN(Number(expiration ?? 0) / 1000),
            });
            const [optionMintKey] = await PublicKey.findProgramAddress(
              [optionKey.toBuffer(), textEncoder.encode("optionToken")],
              PSY_PROGRAM_ID
            );
            console.log({
              oKey: optionKey.toString(),
              oMintK: optionMintKey.toString(),
            });

            setOptionMarketKey(optionKey);
            setOptionMintKey(optionMintKey);
            setAirDropStage(4);
          }}
          disabled={!validated}
        />
      </FusionPaper>
    </>
  );
};
