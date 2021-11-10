import React, { FC } from "react";
import Link from "next/link";
import { Button, IconButton, Flex } from "@chakra-ui/react";

import GraphIcon from "components/icons/GraphIcon";

type Props = {
  row: any;
};

const ActionsTd: FC<Props> = ({ row }) => {
  const { name } = row.original;

  return (
    <Flex justify="flex-end" align="center">
      <Link href={`/lock/${name}`} passHref>
        <Button as="a" variant="primary" size="sm">
          Lock Lp Tokens
        </Button>
      </Link>
    </Flex>
  );
};

export default ActionsTd;
