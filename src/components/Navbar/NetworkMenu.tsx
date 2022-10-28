import React, { useCallback, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Card from "@mui/material/Card";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import TextField from "@mui/material/TextField";
import _debounce from "lodash/debounce";
import { useRecoilState } from "recoil";
import { customNetworkAtom, networkAtom, networks } from "../../recoil";
import { Typography } from "@mui/material";

const NetworkMenu = () => {
  const [network, setNetwork] = useRecoilState(networkAtom);
  const [customNetwork, setCustomNetwork] = useRecoilState(customNetworkAtom);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetNetwork = useCallback(
    _debounce(setNetwork, 750, {
      leading: false,
      trailing: true,
    }),
    [setNetwork]
  );

  const networkList = useMemo(() => Object.values(networks), []);
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef<any>(null);
  const [updateToCustom, setUpdateToCustom] = useState(false);
  const [customInput, setCustomInput] = useState(network.key === "custom");

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current?.contains(event.target)) {
      return;
    }

    if (updateToCustom) {
      // only set the network to custom when the user exits the menu
      debouncedSetNetwork(customNetwork);
    }
    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      // reset the behavior of changing the network
      setUpdateToCustom(false);
    }
  }, [open]);

  return (
    <Box ml={2} sx={{ position: "relative" }}>
      <Button
        color="primary"
        onClick={() => setOpen((_open) => !_open)}
        ref={anchorRef}
        variant="outlined"
        sx={{
          minWidth: 120,
          minHeight: 40,
          border: "2px solid #454545",
          borderRadius: "21px",
          gap: "8px",
          padding: "8px 16px",
          color: "#454545",
        }}
      >
        <Typography variant="h2">{network.name}</Typography>
      </Button>
      <Popper
        anchorEl={anchorRef.current}
        open={open}
        role={undefined}
        transition
        disablePortal
        placement="bottom-end"
        style={{
          position: "absolute",
          inset: "initial",
          right: 0,
          left: "auto",
          marginTop: "8px",
          zIndex: 20,
          width: "fit-content",
        }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Card
            sx={{
              background: "background.light",
            }}
            elevation={12}
          >
            <MenuList id="menu-list-grow" autoFocusItem={open}>
              {networkList.map((item) => (
                <MenuItem
                  key={item.url}
                  onClick={(event: any) => {
                    setNetwork(item);
                    handleClose(event);
                  }}
                >
                  <Box>
                    <Box>{item.name}</Box>
                    <Box fontSize={10}>{item.url}</Box>
                  </Box>
                </MenuItem>
              ))}
              <MenuItem
                key="custom"
                onClick={() => {
                  setCustomInput(true);
                  if (!!customNetwork.host) {
                    // host already exists, set the network
                    setNetwork(customNetwork);
                  }
                }}
              >
                <Box>
                  <Box>Custom</Box>
                  <Box fontSize={10}>{customNetwork.url}</Box>
                </Box>
              </MenuItem>
            </MenuList>
            {customInput && (
              <Box m={2}>
                <TextField
                  label="Custom RPC"
                  placeholder="localhost:8899"
                  onChange={(e) => {
                    setCustomNetwork((_prevVal) => ({
                      ..._prevVal,
                      host: e.target.value,
                      url: `https://${e.target.value}`,
                      ws: `wss://${e.target.value}`,
                    }));
                    setUpdateToCustom(true);
                  }}
                  sx={{
                    width: "100%",
                  }}
                  value={customNetwork.host}
                  variant="outlined"
                />
              </Box>
            )}
          </Card>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
};

export default NetworkMenu;
