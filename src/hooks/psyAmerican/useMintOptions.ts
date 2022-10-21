import {
  feeAmountPerContract,
  instructions,
  OptionMarketWithKey,
} from "@mithraic-labs/psy-american";
import { BN } from "@project-serum/anchor";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { PublicKey, Signer, Transaction } from "@solana/web3.js";
import { useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { usePsyAmericanProgram } from "../usePsyAmericanProgram";
import { initializeTokenAccountTx, WRAPPED_SOL_ADDRESS } from "../../lib/utils";
import { WRAPPED_SOL_MINT } from "@project-serum/serum/lib/token-instructions";
import { useRecoilValue } from "recoil";
import {
  builderOptionMintKey,
  optionMarketKeyForMinting,
  projectInfo,
} from "../../recoil/util";
import { useNetworkTokens } from "../useNetworkTokens";
import { useShowSnackBar } from "../../context/SnackBarContext";

export const useMintOptions = (): ((size: number) => Promise<boolean>) => {
  const program = usePsyAmericanProgram();
  const tokens = useNetworkTokens();
  const splTokenAccountRentBalance = 0;
  const wallet = useWallet();
  const mintDetails = useRecoilValue(projectInfo);
  const optionMarketKey = useRecoilValue(optionMarketKeyForMinting);
  const optionMintKey = useRecoilValue(builderOptionMintKey);
  const showMessage = useShowSnackBar();

  return useCallback(
    async (size) => {
      console.log({
        wallet,
        program,
        splTokenAccountRentBalance,
        optionMarketKey,
        mintDetails,
        optionMintKey,
      });

      if (
        !wallet?.publicKey ||
        !program ||
        (splTokenAccountRentBalance === null &&
          mintDetails?.underlyingAssetMint === WRAPPED_SOL_ADDRESS) ||
        !optionMarketKey ||
        !mintDetails ||
        !optionMintKey
      ) {
        return false;
      }
      try {
        const underlyingToken = tokens[mintDetails.underlyingAssetMint];
        const quoteToken = tokens[mintDetails.quoteAssetMint];
        if (!underlyingToken || !quoteToken)
          throw Error("token info not found");
        const transaction = new Transaction();
        const signers: Signer[] = [];
        // check whether option market exists
        const optionMarketAccount =
          await program.provider.connection.getAccountInfo(optionMarketKey);
        console.log({ optionMarketAccount, key: optionMarketKey.toString() });

        if (!optionMarketAccount) {
          // if it doesn't initialize market and then load that account

          const underlyingAmountPerContract = new BN(
            mintDetails.underlyingPerContract *
              Math.pow(10, underlyingToken.decimals)
          );

          const quoteAmountPerContract = new BN(
            mintDetails.quotePerContract * Math.pow(10, quoteToken.decimals)
          );

          const underlyingMint = new PublicKey(mintDetails.underlyingAssetMint);
          const quoteMint = new PublicKey(mintDetails.quoteAssetMint);

          console.log({
            exp: mintDetails.expiration,
            qPerC: quoteAmountPerContract.toNumber(),
            undPerC: underlyingAmountPerContract.toNumber(),
          });

          const expirationUnixTimestamp = new BN(mintDetails.expiration / 1000);

          try {
            const { optionMarketKey: createdMktKey, tx: stx } =
              await instructions.initializeMarket(program, {
                underlyingAmountPerContract,
                underlyingMint,
                quoteAmountPerContract,
                quoteMint,
                expirationUnixTimestamp,
              });

            console.log({ createdMktKey: createdMktKey.toString(), stx });
          } catch (error) {
            console.log({ error });
          }
        }
        let optionMarketAccountData = await program.account.optionMarket.fetch(
          optionMarketKey
        );

        const option = {
          ...optionMarketAccountData,
          key: optionMarketKey,
        } as OptionMarketWithKey;

        let _underlyingAssetSourceKey: PublicKey | null = null;
        if (option.underlyingAssetMint.toString() === WRAPPED_SOL_ADDRESS) {
          const fees = feeAmountPerContract(option.underlyingAmountPerContract);
          const lamports = option.underlyingAmountPerContract
            .add(fees)
            .mul(new BN(size));
          const { transaction: wrapSolTx, newTokenAccount: wrappedSolAccount } =
            await initializeTokenAccountTx({
              connection: program.provider.connection,
              payerKey: wallet.publicKey,
              mintPublicKey: WRAPPED_SOL_MINT,
              owner: wallet.publicKey,
              rentBalance: splTokenAccountRentBalance!,
              extraLamports: lamports.toNumber(),
            });
          transaction.add(wrapSolTx);
          signers.push(wrappedSolAccount);
          _underlyingAssetSourceKey = wrappedSolAccount.publicKey;
        }

        const [optionTokenDest, writerTokenDest, underlyingAssetSource] =
          await Promise.all([
            Token.getAssociatedTokenAddress(
              ASSOCIATED_TOKEN_PROGRAM_ID,
              TOKEN_PROGRAM_ID,
              option.optionMint,
              wallet.publicKey
            ),
            Token.getAssociatedTokenAddress(
              ASSOCIATED_TOKEN_PROGRAM_ID,
              TOKEN_PROGRAM_ID,
              option.writerTokenMint,
              wallet.publicKey
            ),
            ...(option.underlyingAssetMint.toString() === WRAPPED_SOL_ADDRESS
              ? []
              : [
                  Token.getAssociatedTokenAddress(
                    ASSOCIATED_TOKEN_PROGRAM_ID,
                    TOKEN_PROGRAM_ID,
                    option.underlyingAssetMint,
                    wallet.publicKey
                  ),
                ]),
          ]);
        if (underlyingAssetSource) {
          _underlyingAssetSourceKey = underlyingAssetSource;
        }
        const optionToken = new Token(
          program.provider.connection,
          option.optionMint,
          TOKEN_PROGRAM_ID,
          null as unknown as Signer
        );
        const writerToken = new Token(
          program.provider.connection,
          option.writerTokenMint,
          TOKEN_PROGRAM_ID,
          null as unknown as Signer
        );
        try {
          await optionToken.getAccountInfo(optionTokenDest);
        } catch (err) {
          // no account found, generate instruction to create it
          const ix = Token.createAssociatedTokenAccountInstruction(
            ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            option.optionMint,
            optionTokenDest,
            wallet.publicKey,
            wallet.publicKey
          );
          transaction.add(ix);
        }
        try {
          await writerToken.getAccountInfo(writerTokenDest);
        } catch (err) {
          // no account found, generate instruction to create it
          const ix = Token.createAssociatedTokenAccountInstruction(
            ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            option.writerTokenMint,
            writerTokenDest,
            wallet.publicKey,
            wallet.publicKey
          );
          transaction.add(ix);
        }

        const { ix, signers: _signers } =
          await instructions.mintOptionInstruction(
            program,
            optionTokenDest,
            writerTokenDest,
            _underlyingAssetSourceKey as PublicKey,
            new BN(size),
            option
          );
        transaction.add(ix);
        signers.concat(_signers);
        if (option.underlyingAssetMint.toString() === WRAPPED_SOL_ADDRESS) {
          const closeWSolIx = Token.createCloseAccountInstruction(
            TOKEN_PROGRAM_ID,
            _underlyingAssetSourceKey as PublicKey,
            wallet.publicKey, // Send any remaining SOL to the owner
            wallet.publicKey,
            []
          );
          transaction.add(closeWSolIx);
        }

        transaction.feePayer = wallet.publicKey;
        const { blockhash } =
          await program.provider.connection.getRecentBlockhash();
        transaction.recentBlockhash = blockhash;

        if (signers.length) {
          transaction.partialSign(...signers);
        }
        const txId = await program.provider.connection.sendRawTransaction(
          (await wallet.signTransaction!(transaction)).serialize()
        );
        showMessage(`Successfully minted ${size} options`, txId);
        return true;
      } catch (err) {
        console.log({ err });
        return false;
      }
    },
    [
      program,
      splTokenAccountRentBalance,
      wallet,
      mintDetails,
      optionMarketKey,
      optionMintKey,
      tokens,
      showMessage,
    ]
  );
};
