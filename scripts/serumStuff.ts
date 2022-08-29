import { DexInstructions, Market, OpenOrders } from "@project-serum/serum";
import { BN } from "@project-serum/anchor";
import fs from "fs";
import {
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  Signer,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@project-serum/anchor/dist/cjs/utils/token";
import {
  createInitializeAccountInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token2";

const connection = new Connection("https://api.devnet.solana.com");

export const loadPayer = (keypairPath: string | undefined): Keypair => {
  if (keypairPath) {
    return Keypair.fromSecretKey(
      Buffer.from(
        JSON.parse(
          fs.readFileSync(keypairPath, {
            encoding: "utf-8",
          })
        )
      )
    );
  } else if (process.env.SECRET_KEY) {
    return Keypair.fromSecretKey(
      Buffer.from(
        JSON.parse(
          fs.readFileSync(process.env.SECRET_KEY, {
            encoding: "utf-8",
          })
        )
      )
    );
  } else {
    throw new Error(
      "You must specify option --keypair or SECRET_KEY env variable"
    );
  }
};
/**
 * Generate the TX to initialize a new market.
 * pulled from https://github.com/project-serum/serum-dex-ui/blob/c6d0da0fc645492800f48a62b3314ebb5eaf2401/src/utils/send.tsx#L473
 *
 * @param {Connection} connection
 * @param {PublicKey} payer
 * @param {PublicKey} baseMint
 * @param {PublicKey} quoteMint
 * @param {BN} baseLotSize
 * @param {BN} quoteLotSize
 * @param {PublicKey} dexProgramId
 */
export const createInitializeMarketTx = async ({
  connection,
  payer,
  baseMint,
  quoteMint,
  baseLotSize,
  quoteLotSize,
  dexProgramId,
}: {
  connection: Connection;
  payer: PublicKey;
  baseMint: PublicKey;
  quoteMint: PublicKey;
  baseLotSize: BN;
  quoteLotSize: BN;
  dexProgramId: PublicKey;
}): Promise<{
  tx1: Transaction;
  signers1: Signer[];
  tx2: Transaction;
  signers2: Signer[];
  market: Keypair;
}> => {
  const tokenProgramId = TOKEN_PROGRAM_ID;
  const market = new Keypair();
  const requestQueue = new Keypair();
  const eventQueue = new Keypair();
  const bids = new Keypair();
  const asks = new Keypair();
  const baseVault = new Keypair();
  const quoteVault = new Keypair();
  const feeRateBps = 0;
  const quoteDustThreshold = new BN(100);

  async function getVaultOwnerAndNonce(): Promise<[PublicKey, BN]> {
    const nonce = new BN(0);
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const vaultOwner = await PublicKey.createProgramAddress(
          [market.publicKey.toBuffer(), nonce.toArrayLike(Buffer, "le", 8)],
          dexProgramId
        );
        return [vaultOwner, nonce];
      } catch (e) {
        nonce.iaddn(1);
      }
    }
  }
  const [vaultOwner, vaultSignerNonce] = await getVaultOwnerAndNonce();

  const tx1 = new Transaction();
  // Create an initialize the pool accounts to hold the base and the quote assess
  const poolSize = 165;
  const poolCostLamports = await connection.getMinimumBalanceForRentExemption(
    poolSize
  );

  tx1.add(
    SystemProgram.createAccount({
      fromPubkey: payer,
      newAccountPubkey: baseVault.publicKey,
      lamports: poolCostLamports,
      space: poolSize,
      programId: tokenProgramId,
    }),
    SystemProgram.createAccount({
      fromPubkey: payer,
      newAccountPubkey: quoteVault.publicKey,
      lamports: poolCostLamports,
      space: poolSize,
      programId: tokenProgramId,
    }),
    createInitializeAccountInstruction(
      baseVault.publicKey,
      baseMint,
      vaultOwner
    ),
    createInitializeAccountInstruction(
      quoteVault.publicKey,
      quoteMint,
      vaultOwner
    )
  );
  const tx2 = new Transaction();
  tx2.add(
    SystemProgram.createAccount({
      fromPubkey: payer,
      newAccountPubkey: market.publicKey,
      lamports: await connection.getMinimumBalanceForRentExemption(
        Market.getLayout(dexProgramId).span
      ),
      space: Market.getLayout(dexProgramId).span,
      programId: dexProgramId,
    }),
    SystemProgram.createAccount({
      fromPubkey: payer,
      newAccountPubkey: requestQueue.publicKey,
      lamports: await connection.getMinimumBalanceForRentExemption(5120 + 12),
      space: 5120 + 12,
      programId: dexProgramId,
    }),
    SystemProgram.createAccount({
      fromPubkey: payer,
      newAccountPubkey: eventQueue.publicKey,
      lamports: await connection.getMinimumBalanceForRentExemption(262144 + 12),
      space: 262144 + 12,
      programId: dexProgramId,
    }),
    SystemProgram.createAccount({
      fromPubkey: payer,
      newAccountPubkey: bids.publicKey,
      lamports: await connection.getMinimumBalanceForRentExemption(65536 + 12),
      space: 65536 + 12,
      programId: dexProgramId,
    }),
    SystemProgram.createAccount({
      fromPubkey: payer,
      newAccountPubkey: asks.publicKey,
      lamports: await connection.getMinimumBalanceForRentExemption(65536 + 12),
      space: 65536 + 12,
      programId: dexProgramId,
    }),
    DexInstructions.initializeMarket({
      market: market.publicKey,
      requestQueue: requestQueue.publicKey,
      eventQueue: eventQueue.publicKey,
      bids: bids.publicKey,
      asks: asks.publicKey,
      baseVault: baseVault.publicKey,
      quoteVault: quoteVault.publicKey,
      baseMint,
      quoteMint,
      baseLotSize,
      quoteLotSize,
      feeRateBps,
      vaultSignerNonce,
      quoteDustThreshold,
      programId: dexProgramId,
    })
  );

  const { blockhash } = await connection.getRecentBlockhash();
  const signers1 = [baseVault, quoteVault];
  tx1.feePayer = payer;
  tx1.recentBlockhash = blockhash;
  tx1.partialSign(...signers1);
  const signers2 = [market, requestQueue, eventQueue, bids, asks];
  tx2.feePayer = payer;
  tx2.recentBlockhash = blockhash;
  tx2.partialSign(...signers2);
  return {
    tx1,
    signers1,
    tx2,
    signers2,
    market,
  };
};

(async () => {
  const baseMint = new PublicKey(
    "BzwRWwr1kCLJVUUM14fQthP6FJKrGpXjw3ZHTZ6PQsYa"
  );
  const quoteMint = new PublicKey(
    "E6Z6zLzk8MWY3TY8E87mr88FhGowEPJTeMWzkqtL6qkF"
  );
  const dexProgramId = new PublicKey(
    "DESVgJVGajEgKGXhb6XmqDHGz3VjdgP7rEVESBgxmroY"
  );
  const markets = await Market.findAccountsByMints(
    connection,
    baseMint,
    quoteMint,
    dexProgramId
  );

  console.log("*** PSY Spot markets", markets[0]?.publicKey?.toString());
  const payer = loadPayer(undefined);
  if (!markets.length) {
    // Create a spot market for the token
    console.log("*** wallet", payer.publicKey.toString());
    const { tx1, signers1, tx2, signers2, market } =
      await createInitializeMarketTx({
        connection,
        payer: payer.publicKey,
        baseMint,
        quoteMint,
        baseLotSize: new BN(100_000_000),
        quoteLotSize: new BN(1),
        dexProgramId,
      });
    console.log("Sending transaction 1");
    const tx1Id = await sendAndConfirmTransaction(
      connection,
      tx1,
      [payer, ...signers1],
      {
        commitment: "confirmed",
      }
    );
    console.log("TX ", tx1Id);
    console.log("Sending transaction 2");
    const tx2Id = await sendAndConfirmTransaction(
      connection,
      tx2,
      [payer, ...signers2],
      {
        commitment: "confirmed",
      }
    );
  } else {
    const marketKey = new PublicKey(
      "4Kz8UGuHLnng9x2hL5XMbPtxkqo8ubGzXenbbGjNVwW8"
    );
    const market = await Market.load(connection, marketKey, {}, dexProgramId);
    const bidPayerAddress = await getAssociatedTokenAddress(
      quoteMint,
      payer.publicKey
    );
    const askPayerAddress = await getAssociatedTokenAddress(
      baseMint,
      payer.publicKey
    );

    const openOrderAccounts = await market.findOpenOrdersAccountsForOwner(
      connection,
      payer.publicKey,
      0
    );
    let openOrdersAccount = openOrderAccounts[0]?.address;
    const transaction = new Transaction();
    const signers: Signer[] = [];
    if (!openOrdersAccount) {
      const ooKey = new Keypair();
      signers.push(ooKey);
      const ooIx = await OpenOrders.makeCreateAccountTransaction(
        connection,
        market.address,
        payer.publicKey,
        ooKey.publicKey,
        dexProgramId
      );
      transaction.add(ooIx);

      // @ts-ignore
      const initOO = DexInstructions.initOpenOrders({
        market: market.address,
        owner: payer.publicKey,
        openOrders: ooKey.publicKey,
        programId: dexProgramId,
      });
      transaction.add(initOO);
      openOrdersAccount = ooKey.publicKey;
    }

    const placeBidIx = await market.makePlaceOrderInstruction(connection, {
      // @ts-ignore
      owner: payer.publicKey,
      payer: bidPayerAddress,
      side: "buy",
      price: 0.75,
      size: 1_000,
      orderType: "limit",
      programId: dexProgramId,
      openOrdersAddressKey: openOrdersAccount,
    });
    transaction.add(placeBidIx);

    const placeAskIx = market.makePlaceOrderInstruction(connection, {
      // @ts-ignore
      owner: payer.publicKey,
      payer: askPayerAddress,
      side: "sell",
      price: 1.0,
      size: 1_000,
      orderType: "limit",
      programId: dexProgramId,
      openOrdersAddressKey: openOrdersAccount,
    });
    transaction.add(placeAskIx);

    const txId = await sendAndConfirmTransaction(
      connection,
      transaction,
      [payer, ...signers],
      { commitment: "confirmed" }
    );
    console.log("** placed bids and asks", txId);
  }
})();
