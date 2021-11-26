import { num, toBase64 } from "@arthuryeti/terra";
import { Coin, MsgExecuteContract } from "@terra-money/terra.js";

type CreateProvideMsgsOptions = {
  astroAmount: string;
  uusdAmount: string;
  astroToken: string;
  address: string;
  contract: string;
};

export const createProvideMsgs = (
  options: CreateProvideMsgsOptions,
  sender: string
): MsgExecuteContract[] => {
  const msgs = [];
  const { address, astroToken, contract, astroAmount, uusdAmount } = options;

  const coins = [new Coin("uusd", uusdAmount)];

  const executeUstMsg = {
    deposit_ust: {},
  };

  const ustMsg = new MsgExecuteContract(sender, contract, executeUstMsg, coins);

  const executeAstroMsg = {
    send: {
      contract: contract,
      amount: astroAmount,
      msg: toBase64({
        delegate_astro_tokens: {
          user_address: address,
        },
      }),
    },
  };

  const astroMsg = new MsgExecuteContract(sender, astroToken, executeAstroMsg);

  if (num(uusdAmount).gt(0)) {
    msgs.push(ustMsg);
  }

  if (num(astroAmount).gt(0)) {
    msgs.push(astroMsg);
  }

  return msgs;
};

export default createProvideMsgs;
