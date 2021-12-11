import { num } from "@arthuryeti/terra";
import { Coin, MsgExecuteContract } from "@terra-money/terra.js";

type CreateProvideMsgsOptions = {
  astroAirdropAmount: string;
  astroLockdropAmount: string;
  airdropClaimAmount: string;
  merkleProof?: string[];
  rootIndex?: number;
  hasClaimed?: boolean;
  uusdAmount: string;
  auctionContract: string;
  lockdropContract: string;
  airdropContract: string;
};

export const createProvideMsgs = (
  options: CreateProvideMsgsOptions,
  sender: string
): MsgExecuteContract[] => {
  const msgs = [];
  const {
    auctionContract,
    lockdropContract,
    airdropContract,
    astroAirdropAmount,
    airdropClaimAmount,
    astroLockdropAmount,
    hasClaimed,
    uusdAmount,
    merkleProof,
    rootIndex,
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

  if (num(astroAirdropAmount).gt(0)) {
    const executeClaimAirdropMsg = {
      claim: {
        claim_amount: airdropClaimAmount,
        merkle_proof: merkleProof,
        root_index: rootIndex,
      },
    };

    const claimAirdropMsg = new MsgExecuteContract(
      sender,
      airdropContract,
      executeClaimAirdropMsg
    );

    if (!hasClaimed) {
      msgs.push(claimAirdropMsg);
    }

    const executeDelegateAirdropMsg = {
      delegate_astro_to_bootstrap_auction: {
        amount_to_delegate: astroAirdropAmount,
      },
    };

    const delegateAirdropMsg = new MsgExecuteContract(
      sender,
      airdropContract,
      executeDelegateAirdropMsg
    );

    msgs.push(delegateAirdropMsg);
  }

  if (msgs.length == 0) {
    return null;
  }

  return msgs;
};

export default createProvideMsgs;
