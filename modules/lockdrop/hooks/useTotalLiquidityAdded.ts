import { useTerraWebapp } from "@arthuryeti/terra";
import { gql } from "graphql-request";
import { useQuery } from "react-query";
import { forEach } from "lodash";

import { useAstroswap, useContracts } from "modules/common";
import useHive from "hooks/useHive";
import { getUusdAmount } from "libs/helpers";
import { ONE_TOKEN } from "constants/constants";

type Response = {
  terraswap_pool: string;
  terraswap_amount_in_lockups: string;
  incentives_share: string;
  weighted_amount: string;
  generator_astro_per_share: string;
  generator_proxy_per_share: string;
  is_staked: boolean;
  migration_info: {
    terraswap_migrated_amount: string;
    astroport_lp_token: string;
  };
};

const createQuery = (contract, pairs) => {
  return gql`
    {
      ${pairs.map((pair) => {
        return `
          balance${pair.lp}: wasm {
            contractQuery(
              contractAddress: "${pair.lp}"
              query: {
                balance: {
                  address: "${contract}"
                }
              }
            )
          }

          pool${pair.contract}: wasm {
            contractQuery(
              contractAddress: "${pair.contract}"
              query: {
                pool: { }
              }
            )
          }
        `;
      })}
    }
`;
};

export const useTotalLiquidityAdded = () => {
  const { lockdrop } = useContracts();
  const { pairs } = useAstroswap();

  const formattedPairs = pairs.map((pair) => ({
    lp: pair.liquidity_token,
    contract: pair.contract_addr,
  }));

  const query = createQuery(lockdrop, formattedPairs);

  const response = useHive({
    name: "total-liquidity-added",
    query,
  });

  if (response == null) {
    return null;
  }

  let totalLiquidityAdded = 0;

  forEach(formattedPairs, (pair) => {
    const balance =
      +response[`balance${pair.lp}`].contractQuery.balance / ONE_TOKEN;
    const pool = response[`pool${pair.contract}`].contractQuery;
    const totalShare = +pool.total_share / ONE_TOKEN;
    const uusdAmount = getUusdAmount(pool);

    const uusdAmountOfLp = (balance * uusdAmount) / totalShare;

    totalLiquidityAdded += uusdAmountOfLp * 2;
  });

  return totalLiquidityAdded;
};

export default useTotalLiquidityAdded;
