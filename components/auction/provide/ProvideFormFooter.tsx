import React, { FC } from "react";
import { TxStep } from "@arthuryeti/terra";

import { useFeeToString } from "hooks/useFeeToString";

import CommonFooter, { ConfirmButton } from "components/CommonFooter";

type Props = {
  data: any;
  onConfirmClick: () => void;
};

const ProvideFormFooter: FC<Props> = ({ data, onConfirmClick }) => {
  const cells = [
    // {
    //   title: "Share of Pool",
    //   value: `${shareOfPool || "0"}%`,
    // },
    // {
    //   title: "Est. ASTRO Rewards",
    //   value: "20,000",
    // },
    // {
    //   title: "Lock ends",
    //   value: "17/11/21",
    // },
  ];

  const confirmButton: ConfirmButton = {
    title: "Provide Liquidity",
    isLoading: data.txStep == TxStep.Estimating,
    isDisabled: data.txStep != TxStep.Ready,
    type: "submit",
    onClick: onConfirmClick,
  };

  return (
    <CommonFooter cells={cells} fee={data.fee} confirmButton={confirmButton} />
  );
};

export default ProvideFormFooter;
