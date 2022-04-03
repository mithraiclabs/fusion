import { PsyAmericanIdl } from "@mithraic-labs/psy-american";
import { Program, web3 } from "@project-serum/anchor";
import { useMemo } from "react";
import { useProvider } from "./useProvider";

export const usePsyAmericanProgram = () => {
  const provider = useProvider();

  console.log('*** provider', provider);

  return useMemo(() => {
    return new Program(
      PsyAmericanIdl,
      new web3.PublicKey("R2y9ip6mxmWUj4pt54jP2hz2dgvMozy9VTSwMWE7evs"),
      provider
    );
  }, [provider])
};
