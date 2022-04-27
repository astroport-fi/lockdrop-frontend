import React, { FC, ReactNode } from "react"
import { Box, Flex, HStack, Link, Spacer, Stack, VStack } from "@chakra-ui/react"
import ApolloCardHeader from "./ApolloCardHeader"
import ApolloCardBody from "./ApolloCardBody"
import ExternalLinkIcon from "./icons/ExternalLinkIcon"

type Props = {}

const MyxAstroTableHeader: FC<Props> = () => {
  return (
    <HStack
      my='0'
      spacing='0'
      align='stretch'
      bg='white.50'
      px='8'
      py='4'
      fontSize='.8rem'
      borderBottomWidth='2px'
      borderColor='white.100'
      position='relative'
      color='whiteAlpha.500'
    >
      <Box>Asset</Box>
      <Spacer />
      <Box>In Lockdrop</Box>
      <Spacer />
      <Box>In Wallet</Box>
      <Spacer />
      <Box>Actions</Box>
    </HStack>
  )
}

export default MyxAstroTableHeader
