import React, { FC, useEffect, useState, useCallback } from "react";
import { chakra } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { TxStep } from "@arthuryeti/terra";

import { toAmount } from "libs/parse";
import { PairResponse, useContracts } from "modules/common";
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
  astro: {
    amount: string;
    asset: string;
  };
  uusd: {
    amount: string;
    asset: string;
  };
};

const ProvideForm: FC = () => {
  const { astroToken } = useContracts();
  const [showConfirm, setShowConfirm] = useState(false);
  const methods = useForm<FormValues>({
    defaultValues: {
      astro: {
        amount: "",
        asset: astroToken,
      },
      uusd: {
        amount: "",
        asset: "uusd",
      },
    },
  });

  const astro = methods.watch("astro");
  const uusd = methods.watch("uusd");

  const debouncedAstroAmount = useDebounceValue(astro.amount, 200);
  const debouncedUusdAmount = useDebounceValue(uusd.amount, 200);

  const state = useProvide({
    astroAmount: toAmount(debouncedAstroAmount),
    uusdAmount: toAmount(debouncedUusdAmount),
  });

  const submit = async () => {
    state.submit();
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
            token1={astro}
            token2={uusd}
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
            astro={astro}
            uusd={uusd}
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
                token1={astro}
                token2={uusd}
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
