import React, { FC, ReactNode } from "react"
import { Box, Flex, Link, Spacer, VStack } from "@chakra-ui/react"
import ApolloCardHeader from "./ApolloCardHeader"
import MyLockdropDepositsHeader from "./MyLockdropDepositsHeader"
import MyxAstroTableRow from "./MyxAstroTableRow"
import ExternalLinkIcon from "./icons/ExternalLinkIcon"
import MyxAstroTableHeader from "./MyxAstroTableHeader"

type Props = {}

const assets = [
  {
    name: "xASTRO",
    amount: 20000,
    inWallet: 2500,
  },
]

const MyxAstroTable: FC<Props> = ({}) => {
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
      <MyxAstroTableHeader />
      {assets.map((assetRecord: any, i: number) => {
        const { name, amount, inWallet } = assetRecord
        return <MyxAstroTableRow key={"row-" + i} name={name} amount={amount} inWallet={inWallet} />
      })}
    </VStack>
  )
}

export default MyxAstroTable
