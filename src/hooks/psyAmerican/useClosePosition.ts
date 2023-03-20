import { useCallback } from "react";
import { PublicKey, Signer, Transaction } from "@solana/web3.js";
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import BN from "bn.js";
import { instructions } from "@mithraic-labs/psy-american";

import { useRecoilValue } from "recoil";

import { useConnection } from "../useConnection";
import { useWallet } from "@solana/wallet-adapter-react";
import { optionMarketFamily } from "../../recoil";
import { initializeTokenAccountTx, WRAPPED_SOL_ADDRESS } from "../../lib/utils";
import { useShowSnackBar } from "../../context/SnackBarContext";
import { usePsyAmericanProgram } from "../usePsyAmericanProgram";
import { AccountLayout, getAssociatedTokenAddress } from "@solana/spl-token2";

/**
 * Close the Option the wallet has written in order to return the
 * underlying asset to the option writer
 *
 * @param optionKey Market address for the option to be closed
 */

export const useClosePosition = (
  optionKey: string
): ((num?: number) => Promise<boolean>) => {
  const market = useRecoilValue(optionMarketFamily(optionKey));
  const program = usePsyAmericanProgram();
  const connection = useConnection();
  const showMessage = useShowSnackBar();
  const wallet = useWallet();

  return useCallback(
    async (contractsToClose = 1) => {
      if (!wallet || !wallet?.publicKey || !program || !market) {
        return false;
      }
      try {
        const tx = new Transaction();
        const signers: Signer[] = [];

        const optionTokenSrcKey = await getAssociatedTokenAddress(
          market.optionMint,
          wallet.publicKey
        );
        const writerTokenSourceKey = await getAssociatedTokenAddress(
          market.writerTokenMint,
          wallet.publicKey
        );

        const underlyingAssetDestKey = await getAssociatedTokenAddress(
          market.underlyingAssetMint,
          wallet.publicKey
        );

        let _underlyingAssetDestKey = underlyingAssetDestKey;
        if (market?.underlyingAssetMint.toString() === WRAPPED_SOL_ADDRESS) {
          const rentBalance =
            await connection.getMinimumBalanceForRentExemption(
              AccountLayout.span
            );
          // need to create a sol account
          const { transaction, newTokenAccount: wrappedSolAccount } =
            await initializeTokenAccountTx({
              connection,
              payerKey: wallet.publicKey,
              mintPublicKey: new PublicKey(WRAPPED_SOL_ADDRESS),
              owner: wallet.publicKey,
              rentBalance,
            });
          tx.add(transaction);
          signers.push(wrappedSolAccount);
          _underlyingAssetDestKey = wrappedSolAccount.publicKey;
        }

        const closePositionIx = instructions.closePositionInstruction(
          program,
          new BN(contractsToClose),
          market,
          writerTokenSourceKey,
          optionTokenSrcKey,
          _underlyingAssetDestKey
        );

        tx.add(closePositionIx);

        // Close out the wrapped SOL account so it feels native
        if (market.underlyingAssetMint.toString() === WRAPPED_SOL_ADDRESS) {
          tx.add(
            Token.createCloseAccountInstruction(
              TOKEN_PROGRAM_ID,
              _underlyingAssetDestKey,
              wallet.publicKey, // Send any remaining SOL to the owner
              wallet.publicKey,
              []
            )
          );
        }

        tx.feePayer = wallet.publicKey;
        const { blockhash } = await connection.getRecentBlockhash(); // eslint-disable-line
        tx.recentBlockhash = blockhash;
        for (let s of signers) {
          await tx.partialSign(s);
        }
        wallet.signTransaction && (await wallet.signTransaction(tx));
        const txId = await connection.sendRawTransaction(
          (await wallet.signTransaction!(tx)).serialize()
        );
        showMessage("Successfully closed position", txId);
        return true;
      } catch (err) {
        showMessage(String(err));
        return false;
      }
    },
    [wallet, program, market, connection, showMessage]
  );
};
