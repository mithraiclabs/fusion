import React, { Dispatch, SetStateAction, ChangeEvent } from "react";
import {
  OutlinedInput,
  InputAdornment,
  Button,
  Theme,
  OutlinedInputProps,
  FormControl,
} from "@mui/material";
import { SystemStyleObject } from "@mui/system";

interface PsyNumberInputProps extends OutlinedInputProps {
  disabled?: boolean;
  currency?: string | React.ReactElement;
  number: string;
  decimals?: number;
  placeholder?: string;
  setNumber: Dispatch<SetStateAction<string>>;
  setMax?: any;
  max?: number;
  sx?: SystemStyleObject<Theme>;
}

export const NumberInput: React.VFC<PsyNumberInputProps> = ({
  disabled,
  number,
  placeholder,
  currency,
  decimals,
  setNumber,
  setMax,
  max,
  sx,
  ...props
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const number = event.target.value
      .split(".")
      .map((v, i) => {
        const d = v.replace(/[^0-9]/g, "");
        return i < 2
          ? `${i === 1 ? `.${d.substring(0, decimals ?? 12)}` : d}`
          : "";
      })
      .join("");
    if (max && Number(number) > max) {
      setNumber(max.toString());
    } else {
      setNumber(number ?? "0.00");
    }
  };
  return (
    <FormControl
      fullWidth
      sx={{
        borderRadius: "6px",
      }}
    >
      {/* <InputLabel id="outlined-adornment-amount">{placeholder}</InputLabel> */}
      <OutlinedInput
        startAdornment={
          currency ? (
            <InputAdornment
              position="start"
              sx={{
                paddingLeft: 2,
              }}
            >
              {currency}
            </InputAdornment>
          ) : undefined
        }
        label-id="outlined-adornment-amount"
        endAdornment={
          setMax ? <Button onClick={setMax}>MAX</Button> : undefined
        }
        sx={[!!sx && sx]}
        placeholder={placeholder}
        disabled={disabled}
        value={number}
        onChange={handleChange}
        {...props}
      />
    </FormControl>
  );
};
