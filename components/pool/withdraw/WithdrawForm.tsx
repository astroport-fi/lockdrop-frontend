import React, { FC, useState, useEffect } from "react";
import { chakra } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { TxStep } from "@arthuryeti/terra";

import useDebounceValue from "hooks/useDebounceValue";
import { PairResponse } from "modules/common";
import { toAmount } from "libs/parse";
import { useWithdraw } from "modules/pool";

import FormError from "components/common/FormError";
import FormSummary from "components/common/FormSummary";
import FormLoading from "components/common/FormLoading";
import FormSuccess from "components/common/FormSuccess";
import FormConfirm from "components/common/FormConfirm";
import WithdrawFormInitial from "components/pool/withdraw/WithdrawFormInitial";

type FormValues = {
  token: {
    amount: string;
    asset: string;
  };
};

type Props = {
  pair: any;
  pool: any;
};

const WithdrawForm: FC<Props> = ({ pair, pool }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const methods = useForm<FormValues>({
    defaultValues: {
      token: {
        amount: "",
        asset: "uusd",
      },
    },
  });

  const token = methods.watch("token");

  const debouncedAmount = useDebounceValue(token.amount, 500);

  const state = useWithdraw({
    contract: pair.contract,
    lpToken: pair.lpToken,
    amount: toAmount(debouncedAmount),
  });

  const {
    fee,
    txStep,
    withdraw,
    token1,
    token1Amount,
    token2,
    token2Amount,
    reset,
  } = state;

  const submit = async () => {
    withdraw();
  };

  useEffect(() => {
    if (txStep == TxStep.Broadcasting) {
      setShowConfirm(false);
    }
  }, [txStep]);

  if (txStep == TxStep.Broadcasting || txStep == TxStep.Posting) {
    return <FormLoading txHash={state.txHash} />;
  }

  if (txStep == TxStep.Success) {
    return (
      <FormSuccess
        contentComponent={
          <FormSummary
            label1="You are receving"
            label2="and"
            token1={{ asset: token1, amount: token1Amount }}
            token2={{ asset: token2, amount: token2Amount }}
          />
        }
        details={[{ label: "Price Impact", value: "0.02%" }]}
        onCloseClick={reset}
      />
    );
  }

  if (txStep == TxStep.Failed) {
    return (
      <FormError
        content="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
        nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
        sed diam voluptua."
        onCloseClick={state.reset}
        onClick={state.reset}
      />
    );
  }

  return (
    <FormProvider {...methods}>
      <chakra.form onSubmit={methods.handleSubmit(submit)} width="full">
        {!showConfirm && (
          <WithdrawFormInitial
            pool={pool}
            token={token}
            state={state}
            onClick={() => setShowConfirm(true)}
          />
        )}
        {showConfirm && (
          <FormConfirm
            fee={fee}
            actionLabel="Confirm Withdraw"
            contentComponent={
              <FormSummary
                label1="You are receving"
                label2="and"
                token1={{ asset: token1, amount: token1Amount }}
                token2={{ asset: token2, amount: token2Amount }}
              />
            }
            details={[{ label: "Price Impact", value: "0.02%" }]}
            onCloseClick={reset}
          />
        )}
      </chakra.form>
    </FormProvider>
  );
};

export default WithdrawForm;
