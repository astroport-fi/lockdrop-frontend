import React, { FC } from "react";
import { TxStep } from "@arthuryeti/terra";

import { useFeeToString } from "hooks/useFeeToString";

import CommonFooter, { ConfirmButton } from "components/CommonFooter";

type Props = {
  data: any;
  onConfirmClick: () => void;
};

const ProvideFormFooter: FC<Props> = ({ data, onConfirmClick }) => {
  const feeString = useFeeToString(data.fee);
  const shareOfPool = "1.02";

  const cells = [
    {
      title: "Liquidity",
      value: "20,000",
    },
    {
      title: "Share of Pool",
      value: `${shareOfPool || "0"}%`,
    },
    {
      title: "TX Fee",
      value: feeString || "0.00",
    },
  ];

  const confirmButton: ConfirmButton = {
    title: "Provide Liquidity",
    isLoading: data.txStep == TxStep.Estimating,
    isDisabled: data.txStep != TxStep.Ready,
    type: "submit",
    onClick: onConfirmClick,
  };

  return <CommonFooter cells={cells} confirmButton={confirmButton} />;
};

export default ProvideFormFooter;
