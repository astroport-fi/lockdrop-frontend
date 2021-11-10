import React, { FC, useState, useEffect } from "react";
import { chakra } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { TxStep } from "@arthuryeti/terra";

import { useUnlockLpToken } from "modules/pool";
import { useFeeToString } from "hooks/useFeeToString";
import { PairResponse } from "modules/common";

import FormLoading from "components/common/FormLoading";
import FormError from "components/common/FormError";
import FormConfirm from "components/common/FormConfirm";
import FormSuccess from "components/common/FormSuccess";
import FormSummary from "components/common/FormSummary";
import UnlockFormInitial from "components/lp/unlock/UnlockFormInitial";

type FormValues = {
  lpToken: {
    amount: string;
    asset: string;
  };
};

type Props = {
  pair: PairResponse;
};

const UnlockForm: FC<Props> = ({ pair }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const methods = useForm<FormValues>({
    defaultValues: {
      lpToken: {
        amount: undefined,
        asset: pair.liquidity_token,
      },
    },
  });

  const { watch, handleSubmit } = methods;
  const lpToken = watch("lpToken");

  const state = useUnlockLpToken(lpToken);

  const submit = async () => {
    state.submit();
  };

  useEffect(() => {
    if (state.txStep == TxStep.Broadcasting) {
      setShowConfirm(false);
    }
  }, [state.txStep]);

  const feeString = useFeeToString(state.fee);

  if (state.txStep == TxStep.Broadcasting || state.txStep == TxStep.Posting) {
    return <FormLoading txHash={state.txHash} />;
  }

  if (state.txStep == TxStep.Success) {
    return (
      <FormSuccess
        contentComponent={
          <FormSummary label1="You are staking" token1={lpToken} />
        }
        details={[{ label: "APY", value: "12%" }]}
        onCloseClick={state.reset}
      />
    );
  }

  if (state.txStep == TxStep.Failed) {
    return (
      <FormError
        content={state.error}
        onCloseClick={state.reset}
        onClick={state.reset}
      />
    );
  }

  return (
    <FormProvider {...methods}>
      <chakra.form onSubmit={handleSubmit(submit)} width="full">
        {!showConfirm && (
          <UnlockFormInitial
            state={state}
            onClick={() => setShowConfirm(true)}
          />
        )}

        {showConfirm && (
          <FormConfirm
            fee={state.fee}
            actionLabel="Confirm Unstaking LP Token"
            contentComponent={
              <FormSummary label1="You are staking" token1={lpToken} />
            }
            details={[{ label: "APY", value: "12%" }]}
            onCloseClick={() => setShowConfirm(false)}
          />
        )}
      </chakra.form>
    </FormProvider>
  );
};

export default UnlockForm;
