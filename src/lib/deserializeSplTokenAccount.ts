import { AccountInfo } from "@solana/web3.js";
import { AccountLayout, RawAccount } from "@solana/spl-token2";

export const deserializeSplTokenAccount = (
  accountInfo: AccountInfo<Buffer>
): RawAccount => AccountLayout.decode(accountInfo.data);
