import React, { FC, useState, useEffect } from "react";
import { chakra } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { useQueryClient } from "react-query";
import { TxStep, useTerraWebapp } from "@arthuryeti/terra";
import { useRouter } from "next/router";

import { useLock } from "modules/lockdrop";

import FormLoading from "components/common/FormLoading";
import FormError from "components/common/FormError";
import FormSuccess from "components/common/FormSuccess";
import FormSummary from "components/common/FormSummary";
import LockFormInitial from "components/lockdrop/lock/LockFormInitial";
import LockFormDisclaimer from "components/lockdrop/lock/LockFormDisclaimer";

type FormValues = {
  token: {
    amount: string;
    asset: string;
  };
  duration: number;
};

type Props = {
  lpToken: string;
};

const LockForm: FC<Props> = ({ lpToken }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const methods = useForm<FormValues>({
    defaultValues: {
      token: {
        amount: "",
        asset: lpToken,
      },
      duration: 2,
    },
    mode: "all",
  });

  const { watch, handleSubmit } = methods;
  const token = watch("token");
  const duration = watch("duration");

  const handleSuccess = () => {
    queryClient.invalidateQueries("userInfo");
    queryClient.invalidateQueries("terraswap-pools");
  };

  const handleSuccessClose = () => {
    router.push("/active-phase");
  };

  const state = useLock({
    asset: token.asset,
    amount: token.amount,
    duration,
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

  if (state.txStep == TxStep.Broadcasting || state.txStep == TxStep.Posting) {
    return <FormLoading txHash={state.txHash} />;
  }

  if (state.txStep == TxStep.Success) {
    return (
      <FormSuccess
        contentComponent={
          <FormSummary
            label="You've locked"
            tokens={[{ ...token, isLp: true }]}
          />
        }
        details={[{ label: "Duration", value: `${duration} weeks` }]}
        onCloseClick={handleSuccessClose}
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
          <LockFormInitial state={state} onClick={() => setShowConfirm(true)} />
        )}
        {showConfirm && (
          <LockFormDisclaimer onCloseClick={() => setShowConfirm(false)} />
        )}
      </chakra.form>
    </FormProvider>
  );
};

export default LockForm;
