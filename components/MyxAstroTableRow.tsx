import React, { FC, ReactNode } from "react"
import { Box, Button, Flex, HStack, Link, Spacer, Stack, VStack } from "@chakra-ui/react"
import ApolloCardHeader from "./ApolloCardHeader"
import ApolloCardBody from "./ApolloCardBody"
import ExternalLinkIcon from "./icons/ExternalLinkIcon"

type Props = {
  name: any
  amount: string
  inWallet: number
}

const MyxAstroTableRow: FC<Props> = ({ name, amount, inWallet }: Props) => {
  return (
    <HStack
      my='0'
      spacing='0'
      align='stretch'
      px='8'
      py='4'
      background={"whiteAlpha.50"}
      borderBottomWidth='2px'
      borderColor='white.100'
      position='relative'
      color='whiteAlpha.500'
      _last={{
        borderBottomWidth: "0",
        borderBottomRadius: 10,
      }}
    >
      <Box>{name}</Box>
      <Spacer />
      <Box>{amount}</Box>
      <Spacer />
      <Box>{inWallet}</Box>
      <Spacer />
      <Box>
        <Button>Lock xASTRO</Button>
      </Box>
    </HStack>
  )
}

export default MyxAstroTableRow
