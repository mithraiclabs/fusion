import { createProgram } from "@mithraic-labs/psy-american";
import { web3 } from "@project-serum/anchor";
import { useMemo } from "react";
import { useProvider } from "./useProvider";

export const usePsyAmericanProgram = () => {
  const provider = useProvider();

  return useMemo(() => {
    return createProgram(
      new web3.PublicKey("R2y9ip6mxmWUj4pt54jP2hz2dgvMozy9VTSwMWE7evs"),
      provider
    );
  }, [provider]);
};
