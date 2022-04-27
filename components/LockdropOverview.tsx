import React, { FC, ReactNode } from "react"
import { Box, Flex, Link, Spacer, VStack } from "@chakra-ui/react"
import ApolloCardHeader from "./ApolloCardHeader"
import ApolloCardBody from "./ApolloCardBody"
import ExternalLinkIcon from "./icons/ExternalLinkIcon"

type Props = {}

const LockdropOverview: FC<Props> = ({}) => {
  return (
    <VStack my='0' spacing='0' align='stretch'>
      <ApolloCardHeader>
        <Flex direction={"row"}>
          <h2>xASTRO Lockdrop</h2>
          <Spacer />
          <Link>Learn more</Link>
          <ExternalLinkIcon mt={2} />
        </Flex>
      </ApolloCardHeader>
      <ApolloCardBody>Yo</ApolloCardBody>
    </VStack>
  )
}

export default LockdropOverview
