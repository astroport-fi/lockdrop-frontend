import React, { FC } from "react";
import Link from "next/link";
import { Button, Flex } from "@chakra-ui/react";

type Props = {
  name: string;
};

const MyActionsTd: FC<Props> = ({ name }) => {
  return (
    <Flex justify="flex-end" align="center">
      <Link href={`/unlock/${name}`} passHref>
        <Button as="a" variant="primary" size="sm">
          Unlock LP Tokens
        </Button>
      </Link>
    </Flex>
  );
};

export default MyActionsTd;
