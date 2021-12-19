import React, { FC, useState, useEffect } from "react";
import { chakra } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { TxStep } from "@arthuryeti/terra";
import { useRouter } from "next/router";

import useDebounceValue from "hooks/useDebounceValue";
import { toAmount } from "libs/parse";
import { useWithdraw } from "modules/auction";

import FormError from "components/common/FormError";
import FormSummary from "components/common/FormSummary";
import FormLoading from "components/common/FormLoading";
import FormSuccess from "components/common/FormSuccess";
import FormConfirm from "components/common/FormConfirm";
import WithdrawFormInitial from "components/auction/withdraw/WithdrawFormInitial";

type FormValues = {
  token: {
    amount: string;
    asset: string;
  };
};

const WithdrawForm: FC = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();
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
    amount: toAmount(debouncedAmount),
  });

  const { fee, txStep, submit } = state;

  const handleSuccessClose = () => {
    router.push("/active-phase");
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
            label="You've withdrawn"
            tokens={[{ asset: "uusd", amount: debouncedAmount }]}
          />
        }
        onCloseClick={handleSuccessClose}
      />
    );
  }

  if (txStep == TxStep.Failed) {
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
          <WithdrawFormInitial
            token={token}
            state={state}
            onClick={() => setShowConfirm(true)}
          />
        )}
        {showConfirm && (
          <FormConfirm
            fee={fee}
            actionLabel="Confirm Withdrawal"
            contentComponent={
              <FormSummary
                label="You'll withdraw"
                tokens={[{ asset: "uusd", amount: debouncedAmount }]}
              />
            }
            onCloseClick={() => setShowConfirm(false)}
          />
        )}
      </chakra.form>
    </FormProvider>
  );
};

export default WithdrawForm;
