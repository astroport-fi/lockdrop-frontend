import React, { useMemo } from "react";
import { Box, Text } from "@chakra-ui/react";

import { useTerraswapPools } from "modules/lockdrop";

import CardHeader from "components/CardHeader";
import Card from "components/Card";
import PoolTable from "components/pool/table/PoolTable";
import PoolNameTd from "components/pool/table/PoolNameTd";
import NumberTd from "components/pool/table/NumberTd";
import ActionsTd from "components/pool/table/ActionsTd";

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
        Header: "Total migrated Terraswap liquidity",
        Cell: ({ row }: any) => <NumberTd value={row.original.totalMigrated} />,
        accessor: "totalMigrated",
      },
      {
        Header: "My migrated Terraswap liquidity",
        // Cell: () => <Text>xxxx</Text>,
        accessor: "myMigrated",
      },
      {
        Header: "Astro Allocated to Pool",
        Cell: ({ row }: any) => (
          <NumberTd value={row.original.astroAllocated} />
        ),
        accessor: "astroAllocated",
        // sortType: (rowA, rowB) => {
        //   return rowB.original.total_share - rowA.original.total_share;
        // },
      },
      {
        Header: "Dual Rewards",
        accessor: "dualRewards",
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
