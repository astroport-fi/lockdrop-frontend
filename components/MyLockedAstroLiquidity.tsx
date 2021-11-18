import React, { useMemo } from "react";
import { Box } from "@chakra-ui/react";

import { useAstroPools } from "modules/lockdrop";

import CardHeader from "components/CardHeader";
import Card from "components/Card";
import PoolTable from "components/pool/table/PoolTable";
import PoolNameTd from "components/pool/table/PoolNameTd";
import PoolTotalTd from "components/pool/table/PoolTotalTd";
import LockEndTd from "components/pool/table/LockEndTd";
import NumberTd from "components/pool/table/NumberTd";
import MyActionsTd from "components/pool/table/MyActionsTd";

const MyLockedAstroLiquidity = () => {
  const pools = useAstroPools();
  const columns = useMemo(
    () => [
      {
        Header: "Pool Name",
        Cell: ({ row }: any) => <PoolNameTd row={row} />,
        accessor: "name",
      },
      {
        Header: "My Locked Astroport Liquidity",
        Cell: ({ row }: any) => <NumberTd value={row.original.myLiquidity} />,
        accessor: "myLiquidity",
      },
      {
        Header: "Total Locked Astroport Liquidity",
        Cell: ({ row }: any) => <PoolTotalTd value={row.original.name} />,
        accessor: "totalLockedAstroportLiquidity",
      },
      {
        Header: "My Lock Ends",
        Cell: ({ row }: any) => <LockEndTd row={row} />,
        accessor: "lockEnd",
      },
      {
        Header: "Est. ASTRO Rewards",
        Cell: ({ row }: any) => <NumberTd value={row.original.astroRewards} />,
        accessor: "astroRewards",
      },
      {
        Header: "Dual Rewards",
        accessor: "dualRewards",
      },
      {
        Header: "",
        Cell: ({ row }: any) => <MyActionsTd name={row.original.name} />,
        accessor: "actions",
      },
    ],
    []
  );

  return (
    <Box>
      <CardHeader label="My Locked Astroport Liquidity" />
      <Card noPadding>
        <PoolTable columns={columns} data={pools} />
      </Card>
    </Box>
  );
};

export default MyLockedAstroLiquidity;
