import { useMemo } from "react";
import { useAddress, useTransaction, TxStep } from "@arthuryeti/terra";

import { createProvideMsgs } from "modules/auction";
import { useContracts } from "modules/common";

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
  const { astroToken, auction, lockdrop } = useContracts();
  const address = useAddress();

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
        address,
        astroToken,
        uusdAmount,
        astroAirdropAmount,
        astroLockdropAmount,
      },
      address
    );
  }, [
    address,
    auction,
    astroToken,
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
