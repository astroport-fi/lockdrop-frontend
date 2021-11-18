import React, { FC } from "react";
import { Box, Text, Image, HStack } from "@chakra-ui/react";

import { useTokenInfo } from "modules/common";
import { usePool } from "modules/pool";

type Props = {
  row: any;
};

const PoolNameTd: FC<Props> = ({ row }) => {
  const { name } = row.original;
  const { getIcon, getSymbol } = useTokenInfo();

  return <Text fontSize="sm">{getSymbol(name)}</Text>;
};

export default PoolNameTd;
