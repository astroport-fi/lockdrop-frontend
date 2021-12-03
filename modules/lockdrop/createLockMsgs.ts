import { toBase64, toTerraAmount } from "@arthuryeti/terra";
import { MsgExecuteContract } from "@terra-money/terra.js";

type CreateLockMsgsOptions = {
  asset: string;
  amount: string;
  duration: number;
  contract: string;
};

export const createLockMsgs = (
  options: CreateLockMsgsOptions,
  sender: string
): MsgExecuteContract[] => {
  const { contract, asset, amount, duration } = options;

  const terraAmount = toTerraAmount(amount);

  const allowanceMsg = new MsgExecuteContract(sender, asset, {
    increase_allowance: {
      amount: terraAmount,
      spender: contract,
    },
  });

  const lockMsg = new MsgExecuteContract(sender, asset, {
    send: {
      contract,
      amount: terraAmount,
      msg: toBase64({
        increase_lockup: {
          duration,
        },
      }),
    },
  });

  return [allowanceMsg, lockMsg];
};

export default createLockMsgs;
