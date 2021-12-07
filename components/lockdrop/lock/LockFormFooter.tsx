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
  isDisabled?: boolean;
};

const LockFormFooter: FC<Props> = ({
  data,
  amount,
  duration,
  lpToken,
  onConfirmClick,
  isDisabled = false,
}) => {
  const estimatedAstroRewards = useEstimatedAstroRewards({
    lpToken,
    amount,
    duration,
  });
  const pool = usePool(lpToken);
  // const estimatedAstroRewards = useEstimatedAstroRewards({
  //   lpToken,
  //   amount,
  //   duration,
  // });

  const shareOfPool = useMemo(() => {
    if (pool == null || estimatedAstroRewards == null) {
      return null;
    }

    const incentive = num(pool.incentives_share).div(ONE_TOKEN);

    return num(estimatedAstroRewards).div(incentive).toFixed(2);
  }, [pool, estimatedAstroRewards]);

  const cells = [
    {
      title: "Est. ASTRO Rewards",
      value: `${fromTerraAmount(estimatedAstroRewards)} ASTRO`,
    },
    {
      title: "My current share of this pool’s ASTRO rewards",
      value: `${shareOfPool || "0.00"}%`,
    },
  ];

  const confirmButton: ConfirmButton = {
    title: "Lock LP Token",
    isLoading: data.txStep == TxStep.Estimating,
    isDisabled: data.txStep != TxStep.Ready || isDisabled,
    type: "submit",
    onClick: onConfirmClick,
  };

  return (
    <CommonFooter cells={cells} fee={data.fee} confirmButton={confirmButton} />
  );
};

export default LockFormFooter;
