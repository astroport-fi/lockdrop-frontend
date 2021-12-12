import React, { FC } from "react";
import copy from "copy-to-clipboard";
import {
  Box,
  chakra,
  Center,
  Flex,
  HStack,
  Image,
  Link,
  useToast,
  Button,
  Text,
  VStack,
} from "@chakra-ui/react";
import { fromTerraAmount, useAddress, useBalance } from "@arthuryeti/terra";
import { useWallet, useConnectedWallet } from "@terra-money/wallet-provider";

import { truncate } from "libs/text";
import { useTokenInfo } from "modules/common";
import useFinder from "hooks/useFinder";

import WalletPopover from "components/WalletPopover";
import TerraIcon from "components/icons/TerraIcon";
import CopyIcon from "components/icons/CopyIcon";
import ViewIcon from "components/icons/ViewIcon";
// import CloseIcon from "components/icons/CloseIcon";

const WalletInfoPopover: FC = () => {
  const { getIcon, getSymbol } = useTokenInfo();
  const { disconnect } = useWallet();
  const wallet = useConnectedWallet();
  const toast = useToast();
  const icon = getIcon("uusd");
  const symbol = getSymbol("uusd");
  const balance = useBalance("uusd");
  const terraAddress = useAddress();
  const finder = useFinder();

  const copyAddress = () => {
    copy(terraAddress);
    toast({
      title: "Address copied",
      description: "Your Terra address is now in your clipboard",
      status: "info",
      duration: 2000,
      isClosable: false,
    });
  };

  return (
    <WalletPopover
      title="In my wallet"
      offset={[-60, -40]}
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
                  {fromTerraAmount(balance, "0,0.00")}
                </Text>
              </HStack>
            </Center>
          </Flex>
        </chakra.button>
      )}
    >
      <Flex direction="column" justify="center">
        <Flex flex={1} justify="space-between" align="center" py="2">
          <HStack flex={1}>
            <Image boxSize="8" src={icon} alt="" />
            <Box>
              <Text textStyle="h3" lineHeight="1">
                {symbol}
              </Text>
              <Text textStyle="small" variant="dimmed">
                Terra
              </Text>
            </Box>
          </HStack>
          <Flex direction="column" width={1 / 3} gridRowGap={1}>
            <HStack flex={1} justify="space-between">
              <Text flex={1} textStyle="small" variant="dimmed">
                In Wallet:{" "}
              </Text>
              <Text textStyle="small">$ {fromTerraAmount(balance)}</Text>
            </HStack>
            {/* <HStack justify="space-between">
                <Text flex={1} textStyle="small" variant="dimmed">
                  Price:{" "}
                </Text>
                <Text textStyle="small" variant="dimmed">
                  {fromTerraAmount(price)}
                </Text>
              </HStack> */}
          </Flex>
        </Flex>
        <VStack mt={6} align="flex-start">
          <Text textStyle="minibutton">My Address</Text>
          <Text textStyle="small" variant="dimmed">
            {truncate(terraAddress, [16, 16])}
          </Text>
        </VStack>
        <Flex mt={6} justify="space-between">
          <chakra.button onClick={copyAddress}>
            <HStack>
              <CopyIcon width="1.5rem" height="1.5rem" fill="brand.deepBlue" />
              <Text textStyle="small" variant="dimmed">
                Copy Address
              </Text>
            </HStack>
          </chakra.button>
          <Link isExternal href={finder(terraAddress)}>
            <HStack>
              <ViewIcon width="1.5rem" height="1.5rem" fill="brand.deepBlue" />
              <Text textStyle="small" variant="dimmed">
                View on Terra Finder
              </Text>
            </HStack>
          </Link>
        </Flex>
      </Flex>
      <Box mt="6">
        <Button
          type="button"
          variant="primary"
          isFullWidth
          onClick={() => disconnect()}
        >
          Disconnect
        </Button>
      </Box>
    </WalletPopover>
  );
};

export default WalletInfoPopover;
