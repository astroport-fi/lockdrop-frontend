import React from 'react';
import {
  Flex,
  HStack,
  Image,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  VStack,
  Box,
  Link
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import TerraWallet from 'components/TerraWallet';
import BurgerIcon from 'components/icons/BurgerIcon';
import CloseIcon from 'components/icons/CloseIcon';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const menuItems = [
    {
      text: 'Information',
      link: '/'
    },
    {
      text: 'Lockdrop',
      link: '/active-phase'
    }
  ];

  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <Box className={styles.header}>
      <Box display="flex" alignItems="center">
        <Image src="/logo-apollo.svg" alt="Apollo Logo" />
        <Box display="flex" ml={1.5}>
          {menuItems.map((item, index) => (
            <Box
              className={`${item.link === router.pathname && styles.active} ${
                styles.menuItem
              }`}
              key={index}>
              {item.link ? (
                <NextLink href={item.link} passHref>
                  <p>{item.text}</p>
                </NextLink>
              ) : (
                <p>{item.text}</p>
              )}
            </Box>
          ))}
        </Box>
      </Box>
      <HStack spacing="5" justify="flex-end">
        <Box display={['none', 'none', 'block', 'block']}>
          <TerraWallet />
        </Box>
        <Box display={[null, null, null, 'none']}>
          <Button variant="icon" ref={btnRef} onClick={onOpen} pr="0" mr="-2">
            <BurgerIcon color="white" width="1.5rem" height="1.5rem" />
          </Button>
        </Box>
      </HStack>
      <Drawer
        isOpen={isOpen}
        placement="left"
        size="sm"
        onClose={onClose}
        finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <Flex
            height="100%"
            bg="brand.purple"
            zIndex="100"
            px={['6', null, '12']}
            py="8"
            direction="column">
            <Flex justify="space-between" width="100%" align="center">
              <Box flexShrink={0}>
                <Image
                  src="/logo-astroport.svg"
                  alt="Astroport. The future of trading."
                />
              </Box>
              <Button variant="icon" mr="-2" onClick={onClose}>
                <CloseIcon color="white" width="1.5rem" height="1.5rem" />
              </Button>
            </Flex>
            <Box mt="20">
              <VStack spacing="4" align="flex-start" textTransform="uppercase">
                <Link href="/" color="white">
                  Information
                </Link>
                <Link href="/active-phase" color="white">
                  Lockdrop
                </Link>
              </VStack>
            </Box>
            <VStack spacing="10" align="flex-start" mt="auto">
              <TerraWallet />
              <HStack spacing="12" align="flex-start" display="none">
                <Link
                  href="https://astroport.fi/terms-and-conditions"
                  textTransform="uppercase"
                  color="white"
                  opacity="0.7"
                  isExternal>
                  Terms of use
                </Link>
              </HStack>
            </VStack>
          </Flex>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Header;
