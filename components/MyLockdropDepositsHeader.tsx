import React, { FC, ReactNode } from "react"
import { Box, Flex, HStack, Link, Spacer, Stack, VStack } from "@chakra-ui/react"
import ApolloCardHeader from "./ApolloCardHeader"
import ApolloCardBody from "./ApolloCardBody"
import ExternalLinkIcon from "./icons/ExternalLinkIcon"

type Props = {}

const deposits = [
  {
    amount: 15000,
    unlocksOn: "2023-04-06T00:00:00.000Z",
    rewards: 75000,
    percentOfRewards: 0.7,
  },
  {
    amount: 5000,
    unlocksOn: "2022-06-06T00:00:00.000Z",
    rewards: 55000,
    percentOfRewards: 0.25,
  },
]

const MyLockdropDepositsHeader: FC<Props> = () => {
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
      <Box>Amount Locked</Box>
      <Spacer />
      <Box>Fully Unlocks On</Box>
      <Spacer />
      <Box>Est. Lockdrop Rewards</Box>
      <Spacer />
      <Box>Est. % of Lockdrop Rewards</Box>
      <Spacer />
      <Box>Actions</Box>
    </HStack>
  )
}

export default MyLockdropDepositsHeader
