import React, { FC, useState } from "react";
import {
  Box,
  Flex,
  VStack,
  Text,
  IconButton,
  Button,
  Checkbox,
  Link,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

import Card from "components/Card";
import CloseModalIcon from "components/icons/CloseModalIcon";

type Props = {
  onCloseClick: () => void;
};

const MotionBox = motion(Box);

const LockFormDisclaimer: FC<Props> = ({ onCloseClick }) => {
  const [checkedItems, setCheckedItems] = useState([false, false]);
  const allChecked = checkedItems.every(Boolean);

  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      w="470px"
      m="0 auto"
      mt="10"
    >
      <Card>
        <Flex justify="space-between" align="center" mb="6">
          <Text fontSize="lg" color="red.500">
            Disclaimer
          </Text>
          <IconButton
            aria-label="Close"
            icon={<CloseModalIcon w="1.5rem" h="1.5rem" />}
            variant="icon"
            onClick={onCloseClick}
          />
        </Flex>

        <Text variant="light" fontSize="xs" mt="6" lineHeight="1.2">
          Please check the boxes below to confirm your agreement to the{" "}
          <Link color="#75B5FF" href="/disclaimer" isExternal>
            Lockdrop Disclaimers
          </Link>
        </Text>

        <VStack mt="8" pl="4" spacing="6">
          <Checkbox
            colorScheme="green"
            alignItems="flex-start"
            pt="2"
            isChecked={checkedItems[0]}
            onChange={(e) =>
              setCheckedItems([e.target.checked, checkedItems[1]])
            }
          >
            <Text fontSize="sm" ml="4" lineHeight="1.2" fontWeight="bold">
              I have read and understood, and do hereby agree to be legally
              bound by, the Lockdrop Disclaimers. Such agreement is irrevocable.
            </Text>
          </Checkbox>
          <Checkbox
            colorScheme="green"
            alignItems="flex-start"
            pt="2"
            isChecked={checkedItems[1]}
            onChange={(e) =>
              setCheckedItems([checkedItems[0], e.target.checked])
            }
          >
            <Text fontSize="sm" ml="4" lineHeight="1.2" fontWeight="bold">
              I acknowledge and agree that my lockup of tokens places the tokens
              under the control of decentralized software code and is{" "}
              <Text as="span" color="red.500">
                completely irreversible
              </Text>{" "}
              for the selected time period. Locking tokens entails serious
              financial and technological risks, including the risk of declines
              in price, ‘impermanent loss’, stolen tokens and frozen tokens. Any
              and all losses or injuries you suffer are uninsured and will not
              be subject to any refund or other compensation or legal remedy.
            </Text>
          </Checkbox>
        </VStack>

        <Flex flexDir="column" align="flex-start" mt="8" mb="4">
          <Text variant="light" fontSize="xs" mb="2" lineHeight="1.2">
            Lockdrop deposits begin locking at 7:00 AM UTC on December 19, 2021
          </Text>
          <Button
            variant="primary"
            minW="64"
            size="sm"
            type="submit"
            alignSelf="center"
            isDisabled={!allChecked}
          >
            Lock LP Token
          </Button>
        </Flex>
      </Card>
    </MotionBox>
  );
};

export default LockFormDisclaimer;
