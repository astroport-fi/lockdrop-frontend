import React, { FC } from "react";
import { Text } from "@chakra-ui/react";

import { useTokenInfo } from "modules/common";

type Props = {
  row: any;
};

const PoolNameTd: FC<Props> = ({ row }) => {
  const { name } = row.original;
  const { getSymbol } = useTokenInfo();

  return <Text fontSize="sm">{getSymbol(name)}</Text>;
};

export default PoolNameTd;
