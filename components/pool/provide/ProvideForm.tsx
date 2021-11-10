import React, { FC, useEffect, useState, useCallback } from "react";
import { chakra } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { TxStep } from "@arthuryeti/terra";

import { toAmount } from "libs/parse";
import { PairResponse } from "modules/common";
import { PoolFormType, ProvideFormMode } from "types/common";
import { useProvide } from "modules/pool";
import useDebounceValue from "hooks/useDebounceValue";

import ProvideFormInitial from "components/pool/provide/ProvideFormInitial";
import FormConfirm from "components/common/FormConfirm";
import FormLoading from "components/common/FormLoading";
import FormSuccess from "components/common/FormSuccess";
import FormSummary from "components/common/FormSummary";
import FormError from "components/common/FormError";

type FormValues = {
  token1: {
    amount: string;
    asset: string;
  };
  token2: {
    amount: string;
    asset: string;
  };
};

type Props = {
  pair: string;
  pool: any;
};

const ProvideForm: FC<Props> = ({ pair, pool }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const methods = useForm<FormValues>({
    defaultValues: {
      token1: {
        amount: undefined,
        asset: pool?.token1.asset,
      },
      token2: {
        amount: undefined,
        asset: pool?.token2.asset,
      },
    },
  });

  const token1 = methods.watch("token1");
  const token2 = methods.watch("token2");

  const debouncedAmount1 = useDebounceValue(token1.amount, 200);
  const debouncedAmount2 = useDebounceValue(token2.amount, 200);

  const state = useProvide({
    contract: pair,
    pool: pool,
    token1: token1.asset,
    token2: token2.asset,
    amount1: toAmount(debouncedAmount1),
    amount2: toAmount(debouncedAmount2),
  });

  const submit = async () => {
    state.provideLiquidity();
  };

  useEffect(() => {
    if (state.txStep == TxStep.Broadcasting) {
      setShowConfirm(false);
    }
  }, [state.txStep]);

  const resetForm = useCallback(() => {
    methods.reset();
    state.reset();
  }, [state, methods]);

  if (state.txStep == TxStep.Broadcasting || state.txStep == TxStep.Posting) {
    return <FormLoading txHash={state.txHash} />;
  }

  if (state.txStep == TxStep.Success) {
    return (
      <FormSuccess
        contentComponent={
          <FormSummary
            label1="You are providing"
            label2="and"
            token1={token1}
            token2={token2}
          />
        }
        details={[{ label: "APY", value: "12%" }]}
        onCloseClick={resetForm}
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
      <chakra.form onSubmit={methods.handleSubmit(submit)} width="full">
        {!showConfirm && (
          <ProvideFormInitial
            token1={token1}
            token2={token2}
            pool={pool}
            state={state}
            onClick={() => setShowConfirm(true)}
          />
        )}

        {showConfirm && (
          <FormConfirm
            fee={state.fee}
            actionLabel="Confirm Provide"
            contentComponent={
              <FormSummary
                label1="You are providing"
                label2="and"
                token1={token1}
                token2={token2}
              />
            }
            details={[{ label: "APY", value: "12%" }]}
            onCloseClick={() => setShowConfirm(false)}
          />
        )}
      </chakra.form>
    </FormProvider>
  );
};

export default ProvideForm;
