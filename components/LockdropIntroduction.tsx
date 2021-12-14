import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Link,
  AspectRatio,
  Image,
  Stack,
  VStack,
  Button,
} from "@chakra-ui/react";

import NextLink from "next/link";

import Card from "components/Card";

const LockdropIntroduction = () => {
  return (
    <Card>
      <Stack
        spacing={["16", null, "5%"]}
        direction={["column", null, "row"]}
        align="center"
        justify="space-between"
      >
        <VStack spacing="6" align="flex-start" width={["100%", null, "45%"]}>
          <Heading as="h1" size="2xl" my="2" mr="6">
            Help launch Astroport and get ASTRO tokens
          </Heading>
          <Text fontSize="14px">
            The Journey to Astroport starts now and we want you to get onboard.
            Your courage will be rewarded with Astroport governance tokens and
            power over the fate of the ship. Our voyage is separated into 3
            different phases. Join below or{" "}
            <Link
              color="#83B3FD"
              href="https://docs.astroport.fi/astroport/astroport/astro-faq#lockdrop"
              isExternal
            >
              fly here
            </Link>{" "}
            to learn more about Astroport.
          </Text>
          {/* <NextLink href="/active-phase" passHref>
            <Button as="a" variant="primary" width="256px">
              Go to active phase
            </Button>
          </NextLink> */}
        </VStack>
        <AspectRatio
          position="relative"
          width={["100%", null, "50%"]}
          ratio={527 / 357}
        >
          <Box position="relative" width="100%" height="100%">
            <Box
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              zIndex="1"
            >
              <Image
                src="/astro-intro-coins.png"
                srcSet="astro-intro-coins@2x.png 2x"
                alt=""
                className="intro-1"
                width="100%"
              ></Image>
            </Box>
            <Flex
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              zIndex="2"
              align="center"
              justify="center"
            >
              <Image
                src="/astro-intro-vortex.png"
                srcSet="astro-intro-vortex@2x.png 2x"
                alt=""
                className="intro-2"
                width="100%"
              ></Image>
            </Flex>
            <Flex
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              zIndex="3"
              align="center"
              justify="center"
            >
              <Image
                src="/astro-intro-face.png"
                srcSet="astro-intro-face@2x.png 2x"
                alt=""
                className="intro-3"
                width="100%"
              ></Image>
            </Flex>
          </Box>
        </AspectRatio>
      </Stack>
    </Card>
  );
};

export default LockdropIntroduction;
