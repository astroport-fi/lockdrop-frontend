import { gql } from "graphql-request";
import { num, useAddress } from "@arthuryeti/terra";
import { sortBy } from "lodash";

import { useContracts, useLunaPrice } from "modules/common";
import { useHive } from "hooks/useHive";
import { getAssetAmountsInPool } from "libs/terra";
import { ONE_TOKEN } from "constants/constants";

const createQuery = (lockdropContract, pairs, address) => {
  if (pairs.length === 0) {
    return;
  }

  return gql`
    {
      ${pairs.map(({ lp, contract }) => {
        return `
          ${lp}: wasm {
            contractQuery(
              contractAddress: "${lockdropContract}"
              query: {
                pool: {
                  terraswap_lp_token: "${lp}"
                }
              }
            )
          }

          ${contract}: wasm {
            contractQuery(
              contractAddress: "${contract}"
              query: {
                pool: { }
              }
            )
          }

          balance${lp}: wasm {
            contractQuery(
              contractAddress: "${lp}"
              query: {
                balance: {
                  address: "${address}"
                }
              }
            )
          }
        `;
      })}
    }
`;
};

export const useTerraswapPools = () => {
  const { lockdrop, pairs } = useContracts();
  const address = useAddress();
  const lunaPrice = useLunaPrice();

  const query = createQuery(lockdrop, pairs, address);

  const result = useHive({
    name: "terraswap-pools",
    query,
    options: {
      enabled: !!query,
    },
  });

  if (result == null) {
    return [];
  }

  const items = pairs.map(({ lp, contract }) => {
    const { incentives_share, terraswap_pool } = result[lp].contractQuery;
    const { balance } = result[`balance${lp}`].contractQuery;
    const { total_share, assets } = result[contract].contractQuery;
    const { token1 } = getAssetAmountsInPool(assets, "uusd");

    let amountOfUst = num(token1);

    if (token1 == null) {
      const { token1: uluna } = getAssetAmountsInPool(assets, "uluna");
      amountOfUst = num(uluna).times(lunaPrice).div(ONE_TOKEN);
    }

    // TODO: change to use parse terra amount
    const astroAllocated = num(incentives_share).div(ONE_TOKEN).toNumber();
    const totalLiquidity = num(total_share).div(ONE_TOKEN).toNumber();
    const totalLiquidityInUst = amountOfUst.times(2).div(ONE_TOKEN).toNumber();
    const myLiquidity = num(balance).div(ONE_TOKEN).toNumber();
    const myLiquidityInUst = num(balance)
      .times(totalLiquidityInUst)
      .div(total_share)
      .toNumber();

    return {
      name: lp,
      totalLiquidity,
      totalLiquidityInUst,
      myLiquidity,
      myLiquidityInUst,
      dualRewards: true,
      terraswapPool: terraswap_pool,
      astroAllocated,
    };
  });

  return sortBy(items, "myLiquidity").reverse();
};

export default useTerraswapPools;
