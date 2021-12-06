import { useAddress, useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

import { useContracts } from "modules/common";
import { ONE_TOKEN } from "constants/constants";

type Response = {
  total_astro_rewards: string;
  delegated_astro_rewards: string;
  astro_transferred: boolean;
  claimable_generator_astro_debt: string;
  claimable_generator_proxy_debt: string;
  lockup_infos: {
    terraswap_lp_token: string;
    lp_units_locked: string;
    withdrawal_flag: boolean;
    astro_rewards?: string;
    duration: string;
    generator_astro_debt: string;
    claimable_generator_astro_debt: string;
    generator_proxy_debt: string;
    claimable_generator_proxy_debt: string;
    unlock_timestamp: string;
    astroport_lp_units?: string;
    astroport_lp_token?: string;
    astroport_lp_transferred?: string;
  }[];
};

export const useUserInfo = () => {
  const { client } = useTerraWebapp();
  const address = useAddress();
  const { lockdrop } = useContracts();

  const { data, isLoading } = useQuery(
    ["userInfo", "lockdrop", address],
    () => {
      return client.wasm.contractQuery<Response>(lockdrop, {
        user_info: {
          address,
        },
      });
    }
  );

  if (isLoading || data == null) {
    return null;
  }

  return {
    estimatedAstroReward: +data.total_astro_rewards / ONE_TOKEN,
    ...data,
  };
};

export default useUserInfo;
