import React, { FC, useState } from 'react';
import {
  chakra,
  HStack,
  Link,
  Button,
  Text,
  Checkbox,
  VStack
} from '@chakra-ui/react';
import NextLink from 'next/link';

import WalletPopover from 'components/WalletPopover';
import TerraIcon from 'components/icons/TerraIcon';

type Props = {
  onClick: () => void;
};

const WalletDisclaimerPopover: FC<Props> = ({ onClick }) => {
  const [disclaimerChecked, setDisclaimerChecked] = useState(false);

  return (
    <WalletPopover
      title="Disclaimer"
      offset={[-85, -40]}
      triggerElement={() => (
        <chakra.button
          type="button"
          color="white"
          _focus={{
            outline: 'none',
            boxShadow: 'none'
          }}
          _hover={{
            bg: 'brand.purple'
          }}
          bg="brand.lightBlue"
          py="2"
          px="4"
          borderRadius="full">
          <HStack spacing="3">
            <TerraIcon width="1.25rem" height="1.25rem" />
            <Text>Connect your wallet</Text>
          </HStack>
        </chakra.button>
      )}>
      <VStack mt="5" spacing="10" align="stretch">
        <VStack spacing="6" fontWeight="500">
          <Checkbox
            colorScheme="primary"
            alignItems="flex-start"
            size="md"
            isChecked={disclaimerChecked}
            onChange={(e) => setDisclaimerChecked(e.target.checked)}>
            <Text pl="2" textStyle="small">
              I acknowledge and agree that the Site solely provides information
              about data on the Terra blockchain. I accept that the Site
              operators have no custody over my funds, ability or duty to
              transact on my behalf or power to reverse my transactions. The
              Site operators do not endorse or provide any warranty with respect
              to any tokens.
            </Text>
          </Checkbox>
        </VStack>
        <VStack spacing="3">
          <Button
            variant="primary"
            isFullWidth
            onClick={onClick}
            isDisabled={!disclaimerChecked}>
            Accept
          </Button>
        </VStack>
      </VStack>
    </WalletPopover>
  );
};

export default WalletDisclaimerPopover;
