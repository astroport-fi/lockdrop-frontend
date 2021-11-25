import { ONE_TOKEN } from "constants/constants";
import { useUserInfo } from "modules/lockdrop";

export const useAstroPools = () => {
  const userInfo = useUserInfo();

  if (userInfo == null) {
    return [];
  }

  return userInfo.lockup_infos.map((info) => {
    return {
      name: info.terraswap_lp_token,
      myLiquidity: +info.lp_units_locked / ONE_TOKEN,
      lockEnd: info.unlock_timestamp,
      duration: info.duration,
      astroRewards: +info.astro_rewards / ONE_TOKEN,
    };
  });
};

export default useAstroPools;
