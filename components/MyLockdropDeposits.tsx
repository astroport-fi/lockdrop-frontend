import React, { FC, ReactNode } from "react"
import { Box, Flex, Link, Spacer, VStack } from "@chakra-ui/react"
import ApolloCardHeader from "./ApolloCardHeader"
import ApolloCardBody from "./ApolloCardBody"
import ExternalLinkIcon from "./icons/ExternalLinkIcon"
import MyLockdropDepositsHeader from "./MyLockdropDepositsHeader"
import MyLockdropDepositsRow from "./MyLockdropDepositsRow"

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

const MyLockdropDeposits: FC<Props> = () => {
  return (
    <VStack my='0' spacing='0' align='stretch'>
      <ApolloCardHeader>
        <Flex direction={"row"}>
          <h2>My Lockdrop Deposits</h2>
          <Spacer />
          <Link>Learn more</Link>
          <ExternalLinkIcon mt={2} />
        </Flex>
      </ApolloCardHeader>
      <MyLockdropDepositsHeader />
      {deposits.map((deposit: any, i: number) => {
        const { amount, unlocksOn, rewards, percentOfRewards } = deposit
        return (
          <MyLockdropDepositsRow
            key={"row-" + i}
            amount={amount}
            unlocksOn={unlocksOn}
            rewards={rewards}
            percentOfRewards={percentOfRewards}
          />
        )
      })}
    </VStack>
  )
}

export default MyLockdropDeposits
