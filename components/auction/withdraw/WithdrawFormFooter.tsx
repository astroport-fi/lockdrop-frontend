import React, { FC } from "react";
import { fromTerraAmount, num, TxStep } from "@arthuryeti/terra";

import CommonFooter, { ConfirmButton } from "components/CommonFooter";
import { useUserInfo } from "modules/auction";
import { ONE_TOKEN } from "constants/constants";

type Props = {
  data: any;
  amount: number;
  onConfirmClick: () => void;
};

const WithdrawFormFooter: FC<Props> = ({ data, amount, onConfirmClick }) => {
  const userInfo = useUserInfo();
  const newUst = num(userInfo?.ust_delegated)
    .div(ONE_TOKEN)
    .minus(amount)
    .toString();

  const cells = [
    {
      title: "My ASTRO in the pool",
      value: fromTerraAmount(userInfo?.astro_delegated, "0,0.00"),
    },
    {
      title: "My new UST in the pool",
      value: newUst,
    },
  ];

  const confirmButton: ConfirmButton = {
    title: "Withdraw Liquidity",
    isLoading: data.txStep == TxStep.Estimating,
    isDisabled: data.txStep != TxStep.Ready,
    type: "submit",
    onClick: onConfirmClick,
  };

  return (
    <CommonFooter cells={cells} fee={data.fee} confirmButton={confirmButton} />
  );
};

export default WithdrawFormFooter;
