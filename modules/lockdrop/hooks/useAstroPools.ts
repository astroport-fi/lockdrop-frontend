import { num, useAddress } from "@arthuryeti/terra";
import { gql } from "graphql-request";

import { ONE_TOKEN } from "constants/constants";
import { useContracts, useLunaPrice } from "modules/common";
import { useUserInfo } from "modules/lockdrop";
import { useHive } from "hooks/useHive";
import { getAssetAmountsInPool } from "libs/terra";

const createQuery = (pairs, address) => {
  if (pairs.length === 0) {
    return;
  }

  return gql`
    {
      ${pairs.map(({ lp, contract }) => {
        return `
          pool${lp}: wasm {
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

export const useAstroPools = () => {
  const { pairs, lockdrop } = useContracts();
  const lunaPrice = useLunaPrice();
  const userInfo = useUserInfo();
  const address = useAddress();

  const query = createQuery(pairs, lockdrop);

  const result = useHive({
    name: "astro-pools",
    query,
    options: {
      enabled: !!query,
    },
  });

  if (userInfo == null || result == null) {
    return [];
  }

  return userInfo.lockup_infos.map((info) => {
    const { assets, total_share } =
      result[`pool${info.terraswap_lp_token}`].contractQuery;
    const { balance } =
      result[`balance${info.terraswap_lp_token}`].contractQuery;

    const { token1 } = getAssetAmountsInPool(assets, "uusd");

    let amountOfUst = num(token1);

    if (token1 == null) {
      const { token1: uluna } = getAssetAmountsInPool(assets, "uluna");
      amountOfUst = num(uluna).times(lunaPrice).div(ONE_TOKEN);
    }

    const totalLiquidityInUst = amountOfUst.times(2).div(ONE_TOKEN).toNumber();

    const totalLiquidity = num(balance).div(ONE_TOKEN).toNumber();
    const totalLiquidityLockedInUst = num(balance)
      .times(totalLiquidityInUst)
      .div(total_share)
      .toNumber();
    const myLiquidity = num(info.lp_units_locked).div(ONE_TOKEN).toNumber();
    const myLiquidityInUst = num(info.lp_units_locked)
      .times(totalLiquidityInUst)
      .div(total_share)
      .toNumber();

    return {
      name: info.terraswap_lp_token,
      totalLiquidity,
      totalLiquidityInUst: totalLiquidityLockedInUst,
      myLiquidity,
      myLiquidityInUst,
      lockEnd: info.unlock_timestamp,
      duration: info.duration,
      astroRewards: +info.astro_rewards / ONE_TOKEN,
    };
  });
};

export default useAstroPools;
