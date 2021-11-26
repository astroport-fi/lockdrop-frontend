import React, { FC } from "react";
import { detect } from "detect-browser";
import { Extension } from "@terra-money/terra.js";
import { format } from "libs/parse";
import { truncate } from "libs/text";
import {
  useWallet,
  WalletStatus,
  useInstallChromeExtension,
  useConnectedWallet,
} from "@terra-money/wallet-provider";
import { useBalance } from "@arthuryeti/terra";

import NextLink from "next/link";

import WalletPopover from "components/WalletPopover";

import {
  Link,
  Text,
  Flex,
  Box,
  Center,
  HStack,
  chakra,
  useDisclosure,
  VStack,
  Button,
} from "@chakra-ui/react";

import ConnectWalletModal from "components/modals/ConnectWalletModal";
import WalletInfoPopover from "components/popovers/WalletInfoPopover";
import TerraIcon from "components/icons/TerraIcon";
import ChromeIcon from "components/icons/ChromeIcon";

const TerraWallet: FC = () => {
  const browser = detect();
  const terraStation = new Extension();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { status } = useWallet();
  let popoverOpen = false;
  const wallet = useConnectedWallet();
  const balance = useBalance("uusd");

  const installExtension = useInstallChromeExtension();

  if (browser?.name !== "chrome") {
    return (
      <Link
        href="https://www.google.com/chrome/"
        isExternal
        _hover={{
          textDecoration: "none",
        }}
        _focus={{
          outline: "none",
          boxShadow: "none",
        }}
        bg="white"
        py="2"
        px="4"
        borderRadius="full"
      >
        <HStack spacing="3">
          <ChromeIcon width="1.25rem" height="1.25rem" />
          <Text>Get Chrome</Text>
        </HStack>
      </Link>
    );
  } else if (!terraStation.isAvailable) {
    return (
      <chakra.button
        onClick={installExtension}
        _hover={{
          textDecoration: "none",
        }}
        _focus={{
          outline: "none",
          boxShadow: "none",
        }}
        bg="#14398E"
        color="white"
        py="2"
        px="4"
        borderRadius="full"
      >
        <HStack spacing="3">
          <TerraIcon width="1.25rem" height="1.25rem" />
          <Text>Install Terra Station</Text>
        </HStack>
      </chakra.button>
    );
  } else if (status === WalletStatus.WALLET_CONNECTED) {
    return (
      <WalletInfoPopover
        triggerElement={() => (
          <chakra.button type="button">
            <Flex color="white" spacing="0.5" justify="center">
              <Box
                color="white"
                bg="brand.lightBlue"
                py="2"
                px="3"
                borderTopLeftRadius="full"
                borderBottomLeftRadius="full"
                mr="0.5"
              >
                <HStack spacing="3">
                  <TerraIcon width="1.25rem" height="1.25rem" />
                  <Text fontSize="sm" color="white">
                    {wallet && truncate(wallet.terraAddress)}
                  </Text>
                </HStack>
              </Box>
              <Center
                color="white"
                bg="brand.lightBlue"
                py="2"
                px="3"
                borderTopRightRadius="full"
                borderBottomRightRadius="full"
              >
                <HStack spacing="3">
                  <Text fontSize="sm" color="white">
                    UST
                  </Text>
                  <Text fontSize="sm" color="white">
                    {format(balance, "uusd")}
                  </Text>
                </HStack>
              </Center>
            </Flex>
          </chakra.button>
        )}
      />
    );
  }

  return (
    <>
      <WalletPopover
        title="Terms of Service"
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
        <Text>
          By connecting a wallet, you agree to Astroport’s Terms of Service and
          acknowledge that you have read and understand the protocol’s
          disclaimers.
        </Text>
        <VStack mt="8" spacing="3">
          <Button variant="primary" isFullWidth onClick={onOpen}>
            Accept
          </Button>
          <NextLink href="terms-and-conditions" passHref>
            <Link opacity="0.4">Read Terms of Service</Link>
          </NextLink>
        </VStack>
      </WalletPopover>
      <ConnectWalletModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default TerraWallet;
