import React, { FC, useMemo } from "react";
import { fromTerraAmount, num, TxStep } from "@arthuryeti/terra";

import { ONE_TOKEN } from "constants/constants";
import { useEstimatedAstroRewards, usePool } from "modules/lockdrop";

import CommonFooter, { ConfirmButton } from "components/CommonFooter";

type Props = {
  data: any;
  amount: string;
  lpToken: string;
  duration: number;
  onConfirmClick: () => void;
};

const UnlockFormFooter: FC<Props> = ({
  data,
  amount,
  duration,
  lpToken,
  onConfirmClick,
}) => {
  const estimatedAstroRewards = useEstimatedAstroRewards({
    lpToken,
    amount,
    duration,
  });
  const pool = usePool(lpToken);

  const shareOfPool = useMemo(() => {
    if (pool == null || estimatedAstroRewards == null) {
      return null;
    }

    const incentive = num(pool.incentives_share).div(ONE_TOKEN);

    return num(estimatedAstroRewards).div(incentive).toFixed(2);
  }, [pool, estimatedAstroRewards]);

  const cells = [
    {
      title: "My new est. ASTRO rewards",
      value: `${fromTerraAmount(estimatedAstroRewards)} ASTRO`,
    },
    {
      title: "My current share of this pool’s ASTRO rewards",
      value: `${shareOfPool || "0.00"}%`,
    },
  ];

  const confirmButton: ConfirmButton = {
    title: "Unlock LP token",
    isLoading: data.txStep == TxStep.Estimating,
    isDisabled: data.txStep != TxStep.Ready,
    type: "submit",
    onClick: onConfirmClick,
  };

  return (
    <CommonFooter cells={cells} fee={data.fee} confirmButton={confirmButton} />
  );
};

export default UnlockFormFooter;
