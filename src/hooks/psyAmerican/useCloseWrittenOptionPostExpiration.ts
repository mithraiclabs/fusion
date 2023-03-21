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
 * @param market Market for the option to be closed
 * @param underlyingAssetDestKey PublicKey where the unlocked underlying asset will be sent
 */

export const useCloseWrittenOptionPostExpiration = (
  optionKey: string
): ((num?: number) => Promise<boolean>) => {
  const program = usePsyAmericanProgram();
  const connection = useConnection();

  const showMessage = useShowSnackBar();
  const wallet = useWallet();
  const market = useRecoilValue(optionMarketFamily(optionKey));

  return useCallback(
    async (contractsToClose = 1) => {
      if (
        !wallet ||
        !program ||
        !market ||
        !wallet.publicKey ||
        !wallet.signTransaction
      ) {
        return false;
      }
      try {
        const transaction = new Transaction();
        const signers: Signer[] = [];
        const { publicKey, signTransaction } = wallet;

        let _underlyingAssetDestKey = await getAssociatedTokenAddress(
          market.underlyingAssetMint,
          publicKey
        );

        const writerTokenSource = await getAssociatedTokenAddress(
          market.writerTokenMint,
          publicKey
        );

        if (market.underlyingAssetMint.toString() === WRAPPED_SOL_ADDRESS) {
          // need to create a sol account
          console.log({
            _underlyingAssetDestKey: _underlyingAssetDestKey.toString(),
          });

          const rentBalance =
            await connection.getMinimumBalanceForRentExemption(
              AccountLayout.span
            );
          const {
            transaction: initWrappedSolAcctIx,
            newTokenAccount: wrappedSolAccount,
          } = await initializeTokenAccountTx({
            // eslint-disable-line
            connection,
            payerKey: publicKey,
            mintPublicKey: new PublicKey(WRAPPED_SOL_ADDRESS),
            owner: publicKey,
            rentBalance,
          });
          transaction.add(initWrappedSolAcctIx);
          signers.push(wrappedSolAccount);
          _underlyingAssetDestKey = wrappedSolAccount.publicKey;
          console.log({ pk: wrappedSolAccount.publicKey.toString() });
        }

        const closePostExpirationIx =
          instructions.closePostExpirationInstruction(
            program,
            new BN(contractsToClose),
            market,
            writerTokenSource,
            _underlyingAssetDestKey
          );

        transaction.add(closePostExpirationIx);

        // Close out the wrapped SOL account so it feels native
        if (market.underlyingAssetMint.toString() === WRAPPED_SOL_ADDRESS) {
          transaction.add(
            Token.createCloseAccountInstruction(
              TOKEN_PROGRAM_ID,
              _underlyingAssetDestKey,
              publicKey, // Send any remaining SOL to the owner
              publicKey,
              []
            )
          );
        }
        transaction.feePayer = wallet.publicKey;
        const { blockhash } = await connection.getRecentBlockhash(); // eslint-disable-line
        transaction.recentBlockhash = blockhash;
        for (let s of signers) {
          await transaction.partialSign(s);
        }
        const txId = await wallet.sendTransaction(transaction, connection);
        return txId ? true : false;
      } catch (err) {
        showMessage(String(err));
        return false;
      }
    },
    [wallet, program, market, connection, showMessage]
  );
};
