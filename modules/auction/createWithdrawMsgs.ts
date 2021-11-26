import { MsgExecuteContract } from "@terra-money/terra.js";

type CreateWithdrawMsgsOptions = {
  contract: string;
  amount: string;
};

export const createWithdrawMsgs = (
  options: CreateWithdrawMsgsOptions,
  sender: string
) => {
  const { contract, amount } = options;

  const executeMsg = {
    withdraw_ust: {
      amount,
    },
  };

  const msg = new MsgExecuteContract(sender, contract, executeMsg);

  return [msg];
};
