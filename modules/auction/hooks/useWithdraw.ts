import { useMemo } from "react";
import { useAddress, useTransaction, TxStep, num } from "@arthuryeti/terra";

import { useContracts } from "modules/common";
import { createWithdrawMsgs } from "modules/auction";

export type WithdrawState = {
  error: any;
  fee: any;
  txHash?: string;
  txStep: TxStep;
  reset: () => void;
  submit: () => void;
};

type Params = {
  amount: string | null;
  onSuccess?: (txHash: string) => void;
  onError?: (txHash?: string) => void;
};

export const useWithdraw = ({
  amount,
  onSuccess,
  onError,
}: Params): WithdrawState => {
  const { auction } = useContracts();
  const address = useAddress();

  const msgs = useMemo(() => {
    if (amount == null || num(amount).isEqualTo("0")) {
      return null;
    }

    return createWithdrawMsgs(
      {
        contract: auction,
        amount,
      },
      address
    );
  }, [address, auction, amount]);

  return useTransaction({
    msgs,
    onSuccess,
    onError,
  });
};

export default useWithdraw;
