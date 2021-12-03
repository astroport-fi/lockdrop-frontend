/* eslint-disable react/jsx-key */
import React, { FC } from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
import { useTable, useSortBy } from "react-table";

import Table from "components/Table";
import Tr from "components/Tr";
import Td from "components/Td";
import PoolTr from "components/auction/table/PoolTr";
import ChevronDownIcon from "components/icons/ChevronDownIcon";

type Props = {
  columns: any[];
  data: any;
};

const PoolTable: FC<Props> = ({ columns, data }) => {
  const tableInstance = useTable({ columns, data }, useSortBy);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <Table {...getTableProps()}>
      {headerGroups.map((headerGroup) => (
        <Tr isHead {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column: any) => (
            <Td
              color="white.700"
              {...column.getHeaderProps(column.getSortByToggleProps())}
            >
              <HStack>
                <Text fontSize="xs" variant="light">
                  {column.render("Header")}
                </Text>
                {column.isSorted &&
                  (column.isSortedDesc ? (
                    <ChevronDownIcon />
                  ) : (
                    <ChevronDownIcon style={{ transform: "rotate(180deg)" }} />
                  ))}
              </HStack>
            </Td>
          ))}
        </Tr>
      ))}
      {rows.length ? (
        <Box {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return <PoolTr row={row} />;
          })}
        </Box>
      ) : (
        <Tr>
          <Text fontSize="sm">
            Migrate Terraswap LP Tokens to get ASTRO rewards. Learn More
          </Text>
        </Tr>
      )}
    </Table>
  );
};

export default PoolTable;
