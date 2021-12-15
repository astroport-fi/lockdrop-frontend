import React, { useMemo } from "react";
import { Box, Flex } from "@chakra-ui/react";

import { useTerraswapPools } from "modules/lockdrop";

import CardHeader from "components/CardHeader";
import CheckIcon from "components/icons/CheckIcon";
import Card from "components/Card";
import PoolTable from "components/auction/table/PoolTable";
import PoolNameTd from "components/auction/table/PoolNameTd";
import NumberTd from "components/auction/table/NumberTd";
import NumberWithUstTd from "components/auction/table/NumberWithUstTd";
import ActionsTd from "components/auction/table/ActionsTd";
import { useRowSelect } from "react-table";

const MyTerraswapPools = () => {
  const pools = useTerraswapPools();

  const columns = useMemo(
    () => [
      {
        Header: "Pool Name",
        Cell: ({ row }: any) => <PoolNameTd row={row} />,
        accessor: "name",
        width: 100,
      },
      {
        Header: "Total Locked Liquidity",
        Cell: ({ row }: any) => (
          <NumberWithUstTd
            value={row.original.totalLiquidity}
            valueInUst={row.original.totalLiquidityInUst}
          />
        ),
        accessor: "totalLiquidity",
      },
      {
        Header: "My Terraswap Liquidity",
        Cell: ({ row }: any) => (
          <NumberWithUstTd
            value={row.original.myLiquidity}
            valueInUst={row.original.myLiquidityInUst}
          />
        ),
        accessor: "myLiquidity",
        width: 80,
      },
      {
        Header: "Astro Allocated to Pool",
        Cell: ({ row }: any) => (
          <NumberTd value={row.original.astroAllocated} />
        ),
        accessor: "astroAllocated",
        width: 80,
      },
      {
        Header: "Dual Rewards",
        Cell: ({ row }: any) => (
          <Box>
            <CheckIcon d={row.original.dualRewards} />
          </Box>
        ),
        accessor: "dualRewards",
        width: 25,
      },
      {
        Header: "",
        Cell: ({ row }: any) => <ActionsTd row={row} />,
        accessor: "actions",
        width: 70,
      },
    ],
    []
  );

  return (
    <Box>
      <CardHeader
        label="My Eligible Terraswap Pools"
        description="The table below shows Terraswap pools eligible for ASTRO tokens if you migrate them to Astroport during Phase 1."
      />
      <Card noPadding>
        <PoolTable columns={columns} data={pools} />
      </Card>
    </Box>
  );
};

export default MyTerraswapPools;
