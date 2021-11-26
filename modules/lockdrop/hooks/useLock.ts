import { useMemo } from "react";
import { useAddress, useTransaction, TxStep, num } from "@arthuryeti/terra";

import { createLockMsgs } from "modules/lockdrop";
import { useContracts } from "modules/common";

export type LockState = {
  error: any;
  fee: any;
  txHash?: string;
  txStep: TxStep;
  reset: () => void;
  submit: () => void;
};

type Params = {
  duration: number;
  token: {
    asset: string;
    amount: string;
  };
  onSuccess?: (txHash: string) => void;
  onError?: (txHash?: string) => void;
};

export const useLock = ({
  token,
  duration,
  onSuccess,
  onError,
}: Params): LockState => {
  const address = useAddress();
  // TODO: Change to the right contract
  const { lockdrop } = useContracts();

  const msgs = useMemo(() => {
    if (
      token.amount == "" ||
      num(token.amount).isEqualTo("0") ||
      duration == null
    ) {
      return null;
    }

    return createLockMsgs(
      {
        contract: lockdrop,
        token,
        duration,
      },
      address
    );
  }, [address, lockdrop, token, duration]);

  const { submit, ...rest } = useTransaction({
    msgs,
    onSuccess,
    onError,
  });

  return {
    ...rest,
    submit,
  };
};

export default useLock;
