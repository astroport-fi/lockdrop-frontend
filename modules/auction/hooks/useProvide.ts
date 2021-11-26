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
  astroAmount: string | null;
  onSuccess?: (txHash: string) => void;
  onError?: (txHash?: string) => void;
};

export const useProvide = ({
  uusdAmount,
  astroAmount,
  onSuccess,
  onError,
}: Params): ProvideState => {
  const { astroToken, auction } = useContracts();
  const address = useAddress();

  const msgs = useMemo(() => {
    if (uusdAmount == null && astroAmount == null) {
      return null;
    }

    return createProvideMsgs(
      {
        contract: auction,
        address,
        astroToken,
        uusdAmount,
        astroAmount,
      },
      address
    );
  }, [address, auction, astroToken, uusdAmount, astroAmount]);

  return useTransaction({
    msgs,
    onSuccess,
    onError,
  });
};

export default useProvide;
