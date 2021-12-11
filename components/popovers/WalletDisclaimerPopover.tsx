import React, { FC, useState } from "react";
import {
  chakra,
  HStack,
  Link,
  Button,
  Text,
  Checkbox,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";

import WalletPopover from "components/WalletPopover";
import TerraIcon from "components/icons/TerraIcon";

type Props = {
  onClick: () => void;
};

const WalletDisclaimerPopover: FC<Props> = ({ onClick }) => {
  const [checkedItems, setCheckedItems] = useState([false, false]);
  const allChecked = checkedItems.every(Boolean);

  return (
    <WalletPopover
      title="Disclaimer"
      offset={[-85, -40]}
      triggerElement={() => (
        <chakra.button
          type="button"
          color="white"
          _focus={{
            outline: "none",
            boxShadow: "none",
          }}
          _hover={{
            bg: "brand.purple",
          }}
          bg="brand.lightBlue"
          py="2"
          px="4"
          borderRadius="full"
        >
          <HStack spacing="3">
            <TerraIcon width="1.25rem" height="1.25rem" />
            <Text>Connect your wallet</Text>
          </HStack>
        </chakra.button>
      )}
    >
      <Text textStyle="small">
        By connecting a wallet, you agree to Astroport’s Terms of Service and
        acknowledge that you have read and understand the protocol’s
        disclaimers. Please check the boxes below to confirm your agreement to
        the{" "}
        <Link
          href="https://astroport.fi/terms-and-conditions"
          color="brand.purple"
          isExternal
        >
          Astroport Terms and Conditions
        </Link>
      </Text>
      <VStack mt="10" spacing="10" align="stretch">
        <VStack spacing="6" fontWeight="500">
          <Checkbox
            colorScheme="purple"
            alignItems="flex-start"
            size="md"
            isChecked={checkedItems[0]}
            onChange={(e) =>
              setCheckedItems([e.target.checked, checkedItems[1]])
            }
          >
            <Text pl="2" textStyle="small">
              I have read and understood, and do hereby agree to be legally
              bound as a ‘User’ under, the Terms, including all future
              amendments thereto. Such agreement is irrevocable and will apply
              to all of my uses of the Site without me providing confirmation in
              each specific instance.
            </Text>
          </Checkbox>
          <Checkbox
            colorScheme="primary"
            alignItems="flex-start"
            size="md"
            isChecked={checkedItems[1]}
            onChange={(e) =>
              setCheckedItems([checkedItems[0], e.target.checked])
            }
          >
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
            isDisabled={!allChecked}
          >
            Accept
          </Button>
        </VStack>
      </VStack>
    </WalletPopover>
  );
};

export default WalletDisclaimerPopover;
