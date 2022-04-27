import React, { FC, ReactNode } from "react"
import {
  Box,
  HStack,
  Link,
  Stack,
  Flex,
  Spacer,
  VStack,
  Icon,
  FlexProps,
  Grid,
} from "@chakra-ui/react"
import CardHeader from "./CardHeader"
import Card from "./Card"
import ApolloCardBody from "./ApolloCardBody"
import ApolloCardHeader from "./ApolloCardHeader"
import ExternalLinkIcon from "components/icons/ExternalLinkIcon"

type Props = {}

const LockdropPageHeader: FC<Props> = ({}) => {
  return (
    <VStack my='0' spacing='2' align='stretch'>
      <Grid templateColumns='repeat(3, 1fr)' gap={6}>
        <Box px='5'>
          <h2>Stage I</h2>
          <p>
            During Stage 1 (Day 1-5) there are no limits on deposits and withdrawals of xASTRO. Once
            Stage 2 (Day 6) begins yo uwill only be able to withdraw xASTRO.
          </p>
        </Box>
        <Box px='5'>
          <h2>TIME LEFT IN THIS STAGE</h2>
        </Box>
        <Box px='5'>
          <h2>Timeline</h2>
        </Box>
      </Grid>
    </VStack>
  )
}

export default LockdropPageHeader
