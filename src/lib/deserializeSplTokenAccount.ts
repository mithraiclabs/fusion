import { AccountInfo, PublicKey } from "@solana/web3.js";
import { AccountLayout, RawAccount } from "@solana/spl-token";

export const deserializeSplTokenAccount = (
  accountInfo: AccountInfo<Buffer>
): RawAccount => AccountLayout.decode(accountInfo.data);