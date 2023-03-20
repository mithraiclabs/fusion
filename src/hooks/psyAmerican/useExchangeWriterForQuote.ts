import { useCallback } from "react";
import {
  PublicKey,
  Signer,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { instructions } from "@mithraic-labs/psy-american";
import { BN } from "@project-serum/anchor";
import { useRecoilValue } from "recoil";
import { usePsyAmericanProgram } from "../usePsyAmericanProgram";
import { useShowSnackBar } from "../../context/SnackBarContext";
import { optionMarketFamily } from "../../recoil";
import { useWallet } from "@solana/wallet-adapter-react";
import { initializeTokenAccountTx, WRAPPED_SOL_ADDRESS } from "../../lib/utils";
import { AccountLayout, getAssociatedTokenAddress } from "@solana/spl-token2";

const DEFAULT_SIZE = new BN(1);

/**
 * Allow user to burn a Writer Token in exchange for Quote Asset in the
 * Quote Asset Pool
 *
 * @param optionKey
 * @returns
 */
export const useExchangeWriterTokenForQuote = (
  optionKey: string
): ((size?: BN) => Promise<boolean>) => {
  const market = useRecoilValue(optionMarketFamily(optionKey));
  const program = usePsyAmericanProgram();
  const showMessage = useShowSnackBar();
  const wallet = useWallet();
  const {
    provider: { connection },
  } = program;

  return useCallback(
    async (size = DEFAULT_SIZE) => {
      if (!wallet?.publicKey || !program || !market) {
        return false;
      }

      try {
        const transaction = new Transaction();
        const signers: Signer[] = [];
        const rentBalance = await connection.getMinimumBalanceForRentExemption(
          AccountLayout.span
        );
        const writerTokenSourceKey = await getAssociatedTokenAddress(
          market.writerTokenMint,
          wallet.publicKey
        );
        let _quoteAssetDestKey = await getAssociatedTokenAddress(
          market.quoteAssetMint,
          wallet.publicKey
        );

        if (market.quoteAssetMint.toString() === WRAPPED_SOL_ADDRESS) {
          // quote is wrapped sol, must create account to transfer and close
          const {
            transaction: initWrappedSolAcctIx,
            newTokenAccount: wrappedSolAccount,
          } = await initializeTokenAccountTx({
            connection,
            payerKey: wallet.publicKey,
            mintPublicKey: new PublicKey(WRAPPED_SOL_ADDRESS),
            owner: wallet.publicKey,
            rentBalance,
          });
          transaction.add(initWrappedSolAcctIx);
          signers.push(wrappedSolAccount);
          _quoteAssetDestKey = wrappedSolAccount.publicKey;
        }

        let burnWriterForQuoteIx: TransactionInstruction;

        burnWriterForQuoteIx = instructions.burnWriterForQuote(
          program,
          size,
          market,
          writerTokenSourceKey,
          _quoteAssetDestKey
        );

        transaction.add(burnWriterForQuoteIx);

        // Close out the wrapped SOL account so it feels native
        if (market.quoteAssetMint.toString() === WRAPPED_SOL_ADDRESS) {
          transaction.add(
            Token.createCloseAccountInstruction(
              TOKEN_PROGRAM_ID,
              _quoteAssetDestKey,
              wallet.publicKey, // Send any remaining SOL to the owner
              wallet.publicKey,
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
        wallet.signTransaction && (await wallet.signTransaction(transaction));
        const txId = await connection.sendRawTransaction(
          (await wallet.signTransaction!(transaction)).serialize()
        );
        showMessage(
          "Successfully exchanged writer tokens for quote assets",
          txId
        );
        return true;
      } catch (err) {
        showMessage(String(err));
        return false;
      }
    },
    [wallet, program, market, connection, showMessage]
  );
};
