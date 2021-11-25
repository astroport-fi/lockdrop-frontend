import React, { FC } from "react";
import Link from "next/link";
import { Button, IconButton, Flex } from "@chakra-ui/react";

import GraphIcon from "components/icons/GraphIcon";

type Props = {
  row: any;
};

const ActionsTd: FC<Props> = ({ row }) => {
  const { name, myLiquidity } = row.original;

  const renderLock = () => {
    if (myLiquidity == 0) {
      return;
    }

    return (
      <Link href={`/lock/${name}`} passHref>
        <Button as="a" variant="primary" size="sm" isFullWidth>
          Lock Lp Tokens
        </Button>
      </Link>
    );
  };

  const renderProvide = () => {
    if (myLiquidity > 0) {
      return;
    }

    return (
      <Link href={`/lock/${name}`} passHref>
        <Button as="a" variant="secondary" size="sm" isFullWidth>
          Provide Liquidity
        </Button>
      </Link>
    );
  };

  return (
    <Flex justify={{ md: "flex-end" }}>
      {renderLock()}
      {renderProvide()}
    </Flex>
  );
};

export default ActionsTd;
