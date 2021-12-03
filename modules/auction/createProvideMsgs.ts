import { num, toBase64 } from "@arthuryeti/terra";
import { Coin, MsgExecuteContract } from "@terra-money/terra.js";

type CreateProvideMsgsOptions = {
  astroAirdropAmount: string;
  astroLockdropAmount: string;
  uusdAmount: string;
  astroToken: string;
  address: string;
  auctionContract: string;
  lockdropContract: string;
};

export const createProvideMsgs = (
  options: CreateProvideMsgsOptions,
  sender: string
): MsgExecuteContract[] => {
  const msgs = [];
  const {
    address,
    astroToken,
    auctionContract,
    lockdropContract,
    astroAirdropAmount,
    astroLockdropAmount,
    uusdAmount,
  } = options;

  if (num(uusdAmount).gt(0)) {
    const coins = [new Coin("uusd", uusdAmount)];

    const executeUstMsg = {
      deposit_ust: {},
    };

    const ustMsg = new MsgExecuteContract(
      sender,
      auctionContract,
      executeUstMsg,
      coins
    );

    msgs.push(ustMsg);
  }

  if (num(astroLockdropAmount).gt(0)) {
    const executeAstroLockdropMsg = {
      delegate_astro_to_auction: {
        amount: astroLockdropAmount,
      },
    };

    const astroLockdropMsg = new MsgExecuteContract(
      sender,
      lockdropContract,
      executeAstroLockdropMsg
    );

    msgs.push(astroLockdropMsg);
  }

  return msgs;
};

export default createProvideMsgs;
