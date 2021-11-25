import { gql } from "graphql-request";
import { forEach } from "lodash";

import { useTerraswapPools } from "modules/lockdrop";
import { useHive } from "hooks/useHive";
import { getUusdAmount } from "libs/helpers";
import { ONE_TOKEN } from "constants/constants";

const createQuery = (pools) => {
  return gql`
    {
      ${pools.map((pool) => {
        return `
          ${pool}: wasm {
            contractQuery(
              contractAddress: "${pool}"
              query: {
                pool: {}
              }
            )
          }
        `;
      })}
    }
`;
};

export const useTotalLiquidityAdded = () => {
  const items = useTerraswapPools();

  const variables = items.map((item) => {
    return item.terraswapPool;
  });

  const query = createQuery(variables);

  const result = useHive({
    name: "total-liquidity-added",
    query,
    options: {
      enabled: variables.length > 0,
    },
  });

  if (result == null) {
    return null;
  }

  let total = 0;

  forEach(items, (item) => {
    const balance = item.totalLiquidity;
    const pool = result[item.terraswapPool].contractQuery;
    const totalShare = +pool.total_share / ONE_TOKEN;
    const uusdAmount = getUusdAmount(pool);

    const uusdAmountOfLp = (balance * uusdAmount) / totalShare;

    if (uusdAmountOfLp > 0) {
      total += uusdAmountOfLp * 2;
    }
  });

  return total;
};

export default useTotalLiquidityAdded;
