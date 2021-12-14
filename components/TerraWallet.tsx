import React, { FC } from "react";
import { detect } from "detect-browser";
import { Extension } from "@terra-money/terra.js";
import {
  useWallet,
  WalletStatus,
  useInstallChromeExtension,
  useConnectedWallet,
} from "@terra-money/wallet-provider";

import WalletDisclaimerPopover from "components/popovers/WalletDisclaimerPopover";

import { Link, Text, HStack, chakra, useDisclosure } from "@chakra-ui/react";

import ConnectWalletModal from "components/modals/ConnectWalletModal";
import WalletInfoPopover from "components/popovers/WalletInfoPopover";
import TerraIcon from "components/icons/TerraIcon";
import ChromeIcon from "components/icons/ChromeIcon";

const TerraWallet: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { status } = useWallet();
  const browser = detect();
  // const terraStation = new Extension();
  // const installExtension = useInstallChromeExtension();

  if (!["chrome", "opera", "edge", "edge-chromium"].includes(browser?.name)) {
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
  }

  // if (!terraStation.isAvailable) {
  //   return (
  //     <chakra.button
  //       onClick={installExtension}
  //       _hover={{
  //         textDecoration: "none",
  //       }}
  //       _focus={{
  //         outline: "none",
  //         boxShadow: "none",
  //       }}
  //       bg="#14398E"
  //       color="white"
  //       py="2"
  //       px="4"
  //       borderRadius="full"
  //     >
  //       <HStack spacing="3">
  //         <TerraIcon width="1.25rem" height="1.25rem" />
  //         <Text>Install Terra Station</Text>
  //       </HStack>
  //     </chakra.button>
  //   );
  // }

  if (status === WalletStatus.WALLET_CONNECTED) {
    return <WalletInfoPopover />;
  }

  return (
    <>
      <WalletDisclaimerPopover onClick={onOpen} />
      <ConnectWalletModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default TerraWallet;
