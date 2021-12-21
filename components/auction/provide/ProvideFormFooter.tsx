import React, { FC } from "react";
import { TxStep } from "@arthuryeti/terra";

import { useProvideFooter } from "modules/auction";

import CommonFooter, { ConfirmButton } from "components/CommonFooter";
import numeral from "numeral";

type Props = {
  data: any;
  ustAmount: any;
  astroAmount: any;
  onConfirmClick: () => void;
};

const ProvideFormFooter: FC<Props> = ({
  data,
  ustAmount,
  astroAmount,
  onConfirmClick,
}) => {
  const items = useProvideFooter({
    ustAmount,
    astroAmount,
  });

  const rewards = numeral(items.estAstroRewards).format("0,0.00");

  const cells = [
    {
      title: "Share of Pool",
      value: `${items.shareOfPool || "0"}%`,
    },
    {
      title: "Est. ASTRO Rewards",
      value: `${rewards || "0"} ASTRO`,
    },
    {
      title: "Lock ends",
      value: items.lockEnds,
    },
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
