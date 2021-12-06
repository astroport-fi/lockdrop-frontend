import { useMemo } from "react";
import { useAddress, useTransaction, TxStep } from "@arthuryeti/terra";

import { createProvideMsgs } from "modules/auction";
import { useContracts } from "modules/common";
import { useAirdrop } from "modules/airdrop";

export type ProvideState = {
  error: any;
  fee: any;
  txHash?: string;
  txStep: TxStep;
  reset: () => void;
  submit: () => void;
};

type Params = {
  uusdAmount: string | null;
  astroAirdropAmount: string | null;
  astroLockdropAmount: string | null;
  onSuccess?: (txHash: string) => void;
  onError?: (txHash?: string) => void;
};

export const useProvide = ({
  uusdAmount,
  astroAirdropAmount,
  astroLockdropAmount,
  onSuccess,
  onError,
}: Params): ProvideState => {
  const { astroToken, auction, lockdrop, airdrop } = useContracts();
  const address = useAddress();
  const airdropData = useAirdrop(address);

  const msgs = useMemo(() => {
    if (
      uusdAmount == null &&
      astroLockdropAmount == null &&
      astroAirdropAmount == null
    ) {
      return null;
    }

    return createProvideMsgs(
      {
        auctionContract: auction,
        lockdropContract: lockdrop,
        airdropContract: airdrop,
        address,
        astroToken,
        uusdAmount,
        astroAirdropAmount,
        astroLockdropAmount,
        airdropClaimAmount: airdropData?.amount,
        merkleProof: airdropData?.merkle_proof,
        rootIndex: airdropData?.index,
      },
      address
    );
  }, [
    address,
    auction,
    airdrop,
    lockdrop,
    astroToken,
    airdropData,
    uusdAmount,
    astroAirdropAmount,
    astroLockdropAmount,
  ]);

  return useTransaction({
    msgs,
    onSuccess,
    onError,
  });
};

export default useProvide;
