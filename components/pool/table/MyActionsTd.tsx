import React, { FC } from "react";
import Link from "next/link";
import { Button, Flex } from "@chakra-ui/react";

type Props = {
  name: string;
  duration: number;
};

const MyActionsTd: FC<Props> = ({ name, duration }) => {
  return (
    <Flex justify={{ md: "flex-end" }}>
      <Link href={`/unlock/${name}/${duration}`} passHref>
        <Button as="a" variant="secondary" size="sm" isFullWidth>
          Unlock LP Tokens
        </Button>
      </Link>
    </Flex>
  );
};

export default MyActionsTd;
