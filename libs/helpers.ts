import { ONE_TOKEN } from "constants/constants";
import { findIndex } from "lodash";

import { isTypeNativeAssetInfo, PoolResponse } from "modules/common";

export function getUusdAmount(pool: PoolResponse) {
  const index = findIndex(pool.assets, (asset) => {
    if (isTypeNativeAssetInfo(asset.info)) {
      return asset.info.native_token?.denom === "uusd";
    }
  });

  if (pool.assets[index] == null) {
    return 0;
  }

  return +pool.assets[index].amount / ONE_TOKEN;
}
