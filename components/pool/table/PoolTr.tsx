import React, { FC, Fragment } from "react";

import Tr from "components/Tr";
import Td from "components/Td";

type Props = {
  row: any;
};

const PoolTr: FC<Props> = ({ row }) => {
  return (
    <Tr {...row.getRowProps()}>
      {row.cells.map((cell) => {
        return (
          <Td key={cell} {...cell.getCellProps()}>
            {cell.render("Cell")}
          </Td>
        );
      })}
    </Tr>
  );
};

export default PoolTr;
