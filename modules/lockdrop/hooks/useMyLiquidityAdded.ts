import { useAddress, useTerraWebapp } from "@arthuryeti/terra";
import { gql } from "graphql-request";
import { useQuery } from "react-query";
import { forEach } from "lodash";

import { useAstroswap, useContracts } from "modules/common";
import useHive from "hooks/useHive";
import { getUusdAmount } from "libs/helpers";
import { ONE_TOKEN } from "constants/constants";
import { useUserInfo } from "..";

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

const createQuery = (pairs) => {
  return gql`
    {
      ${pairs.map((pair) => {
        return `
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

export const useMyLiquidityAdded = () => {
  const { lockdrop } = useContracts();
  const userInfo = useUserInfo();
  const { pairs } = useAstroswap();

  const formattedPairs = pairs.map((pair) => ({
    lp: pair.liquidity_token,
    contract: pair.contract_addr,
  }));

  const query = createQuery(formattedPairs);

  const response = useHive({
    name: "my-liquidity-added",
    query,
  });

  if (response == null || userInfo == null) {
    return null;
  }

  let myLiquidityAdded = 0;

  // forEach(userInfo.lockup_infos, (lockupInfo) => {
  //   const balance = +lockupInfo.lp_units_locked / ONE_TOKEN;
  //   const pool = response[`pool${pair.contract}`].contractQuery;
  //   const totalShare = +pool.total_share / ONE_TOKEN;
  //   const uusdAmount = getUusdAmount(pool);

  //   const uusdAmountOfLp = (balance * uusdAmount) / totalShare;

  //   myLiquidityAdded += uusdAmountOfLp * 2;
  // });

  return myLiquidityAdded;
};

export default useMyLiquidityAdded;
