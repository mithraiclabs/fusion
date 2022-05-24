import Link from "@mui/material/Link";
import Snackbar from "@mui/material/Snackbar";
import React, { createContext, useCallback, useContext, useState } from "react";
import { useTxExplorerLink } from "../hooks/useTxExplorerLink";

type SnackBarParams = { message: string; open: boolean; txId: string | null };

export const SnackBarContext = createContext<
  React.Dispatch<React.SetStateAction<SnackBarParams>>
>(() => {});

export const SnackBarProvider: React.FC = ({ children }) => {
  const snackBarState = useState<SnackBarParams>({
    message: "",
    open: false,
    txId: null,
  });
  const [snackBarParams, setSnackBarParams] = snackBarState;
  const onClose = useCallback(() => {
    setSnackBarParams({ message: "", open: false, txId: null });
  }, [setSnackBarParams]);
  const txExplorerLink = useTxExplorerLink(snackBarParams.txId);

  return (
    <SnackBarContext.Provider value={setSnackBarParams}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={6000}
        message={snackBarParams.message}
        open={snackBarParams.open}
        onClose={onClose}
        action={
          snackBarParams.txId ? (
            <Link color="info.main" href={txExplorerLink} target="_blank">
              Explorer
            </Link>
          ) : undefined
        }
      />
    </SnackBarContext.Provider>
  );
};

export const useShowSnackBar = () => {
  const updateSnackBar = useContext(SnackBarContext);

  return useCallback(
    (message: string, txId?: string) => {
      updateSnackBar({ message, open: true, txId: txId ?? null });
    },
    [updateSnackBar]
  );
};
