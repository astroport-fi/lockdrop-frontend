import { Text } from "@chakra-ui/react";
import { Fee } from "@terra-money/terra.js";

import { useFeeToString } from "hooks/useFeeToString";

type Props = {
  fee: Fee;
};

const FormFee = ({ fee }: Props) => {
  const feeString = useFeeToString(fee);

  if (!feeString) {
    return <Text mt="2">&nbsp;</Text>;
  }

  return (
    <Text variant="light" mt="2" textAlign="center">
      {`TX Fee: ${feeString}`}
    </Text>
  );
};

export default FormFee;
