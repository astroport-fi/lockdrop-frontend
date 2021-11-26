import React, { FC } from "react";
import { fromTerraAmount, TxStep } from "@arthuryeti/terra";

import { useFeeToString } from "hooks/useFeeToString";

import CommonFooter, { ConfirmButton } from "components/CommonFooter";

type Props = {
  data: any;
  onConfirmClick: () => void;
};

const WithdrawFormFooter: FC<Props> = ({ data, onConfirmClick }) => {
  const feeString = useFeeToString(data.fee);

  const cells = [
    {
      title: "My ASTRO in the pool",
      value: fromTerraAmount("12222"),
    },
    {
      title: "My new UST in the pool",
      value: fromTerraAmount("12222"),
    },
    {
      title: "My new share of pool",
      value: fromTerraAmount("12222"),
    },
    {
      title: "Lock ends",
      value: fromTerraAmount("12222"),
    },
  ];

  const confirmButton: ConfirmButton = {
    title: "Withdraw Liquidity",
    isLoading: data.txStep == TxStep.Estimating,
    isDisabled: data.txStep != TxStep.Ready,
    type: "submit",
    onClick: onConfirmClick,
  };

  return <CommonFooter cells={cells} confirmButton={confirmButton} />;
};

export default WithdrawFormFooter;
