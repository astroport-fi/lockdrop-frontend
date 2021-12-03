import React, { useMemo } from "react";
import { Box, Text } from "@chakra-ui/react";

import { useTerraswapPools } from "modules/lockdrop";

import CardHeader from "components/CardHeader";
import CheckIcon from "components/icons/CheckIcon";
import Card from "components/Card";
import PoolTable from "components/auction/table/PoolTable";
import PoolNameTd from "components/auction/table/PoolNameTd";
import NumberTd from "components/auction/table/NumberTd";
import ActionsTd from "components/auction/table/ActionsTd";

const MyTerraswapPools = () => {
  const pools = useTerraswapPools();

  const columns = useMemo(
    () => [
      {
        Header: "Pool Name",
        Cell: ({ row }: any) => <PoolNameTd row={row} />,
        accessor: "name",
      },
      {
        Header: "Total Terraswap Liquidity",
        Cell: ({ row }: any) => (
          <NumberTd value={row.original.totalLiquidity} />
        ),
        accessor: "totalLiquidity",
      },
      {
        Header: "My Terraswap Liquidity",
        Cell: ({ row }: any) => <NumberTd value={row.original.myLiquidity} />,
        accessor: "myLiquidity",
      },
      {
        Header: "Astro Allocated to Pool",
        Cell: ({ row }: any) => (
          <NumberTd value={row.original.astroAllocated} />
        ),
        accessor: "astroAllocated",
      },
      {
        Header: "Dual Rewards",
        Cell: () => (
          <Box>
            <CheckIcon />
          </Box>
        ),
        accessor: "dualRewards",
        disableSortBy: true,
      },
      {
        Header: "",
        Cell: ({ row }: any) => <ActionsTd row={row} />,
        accessor: "actions",
      },
    ],
    []
  );

  return (
    <Box>
      <CardHeader label="My Eligible Terraswap Pools" />
      <Card noPadding>
        <PoolTable columns={columns} data={pools} />
      </Card>
    </Box>
  );
};

export default MyTerraswapPools;
