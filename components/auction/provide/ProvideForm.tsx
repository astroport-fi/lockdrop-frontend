import React, { FC, useEffect, useState, useCallback } from "react";
import { chakra } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { useQueryClient } from "react-query";
import { TxStep } from "@arthuryeti/terra";

import { toAmount } from "libs/parse";
import { useContracts } from "modules/common";
import { useProvide } from "modules/auction";
import useDebounceValue from "hooks/useDebounceValue";

import ProvideFormInitial from "components/auction/provide/ProvideFormInitial";
import ProvideFormDisclaimer from "components/auction/provide/ProvideFormDisclaimer";
import FormLoading from "components/common/FormLoading";
import FormSuccess from "components/common/FormSuccess";
import FormSummary from "components/common/FormSummary";
import FormError from "components/common/FormError";

type FormValues = {
  astroLockdrop: {
    amount: string;
    asset: string;
  };
  astroAirdrop: {
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
  const queryClient = useQueryClient();
  const methods = useForm<FormValues>({
    defaultValues: {
      astroLockdrop: {
        amount: "",
        asset: astroToken,
      },
      astroAirdrop: {
        amount: "",
        asset: astroToken,
      },
      uusd: {
        amount: "",
        asset: "uusd",
      },
    },
  });

  const astroLockdrop = methods.watch("astroLockdrop");
  const astroAirdrop = methods.watch("astroAirdrop");
  const uusd = methods.watch("uusd");

  const debouncedAstroAirdropAmount = useDebounceValue(
    astroAirdrop.amount,
    200
  );
  const debouncedAstroLockdropAmount = useDebounceValue(
    astroLockdrop.amount,
    200
  );
  const debouncedUusdAmount = useDebounceValue(uusd.amount, 200);

  const handleSuccess = () => {
    queryClient.invalidateQueries("userInfo");
  };

  const state = useProvide({
    astroLockdropAmount: toAmount(debouncedAstroLockdropAmount),
    astroAirdropAmount: toAmount(debouncedAstroAirdropAmount),
    uusdAmount: toAmount(debouncedUusdAmount),
    onSuccess: handleSuccess,
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
            token1={astroLockdrop}
            token2={uusd}
          />
        }
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
            state={state}
            onClick={() => setShowConfirm(true)}
          />
        )}

        {showConfirm && (
          <ProvideFormDisclaimer onCloseClick={() => setShowConfirm(false)} />
        )}
      </chakra.form>
    </FormProvider>
  );
};

export default ProvideForm;
