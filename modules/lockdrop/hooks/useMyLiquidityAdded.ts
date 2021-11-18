import { gql } from "graphql-request";
import { forEach } from "lodash";

import {
  useAstroPools,
  useTerraswapPools,
  useUserInfo,
} from "modules/lockdrop";
import { useHive } from "hooks/useHive";
import { getUusdAmount } from "libs/helpers";
import { ONE_TOKEN } from "constants/constants";

const createQuery = (items) => {
  return gql`
    {
      ${items.map((item) => {
        return `
          ${item.lpToken}: wasm {
            contractQuery(
              contractAddress: "${item.pool}"
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

export const useMyLiquidityAdded = () => {
  const items = useTerraswapPools();
  const astroItems = useAstroPools();
  const userInfo = useUserInfo();

  const variables = items.map((item) => {
    return {
      lpToken: item.name,
      pool: item.terraswapPool,
    };
  });

  const query = createQuery(variables);

  const result = useHive({
    name: "my-liquidity-added",
    query,
    options: {
      enabled: variables.length > 0,
    },
  });

  if (result == null) {
    return null;
  }

  let total = 0;

  forEach(astroItems, (item) => {
    const balance = item.myLiquidity;
    const pool = result[item.name].contractQuery;
    const totalShare = +pool.total_share / ONE_TOKEN;
    const uusdAmount = getUusdAmount(pool);

    const uusdAmountOfLp = (balance * uusdAmount) / totalShare;

    if (uusdAmountOfLp > 0) {
      total += uusdAmountOfLp * 2;
    }
  });

  return total;
};

export default useMyLiquidityAdded;
