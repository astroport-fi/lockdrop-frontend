import React, {
  FC,
  ReactNode,
  useMemo,
  Context,
  createContext,
  useContext,
  Consumer,
} from "react";
import { useWallet } from "@terra-money/wallet-provider";
import dayjs from "dayjs";

import { useConfig as useLockdropConfig } from "modules/lockdrop";
import { useConfig as useAuctionConfig } from "modules/auction";

import { PairResponse, Tokens, Data } from "./types";

type Astro = {
  pairs: PairResponse[] | null;
  lockdropConfig: any | null;
  tokens: Tokens | null;
  data: Data | null;
  phase1StartDate: dayjs.Dayjs | null;
  phase1EndDate: dayjs.Dayjs | null;
  phase2StartDate: dayjs.Dayjs | null;
  phase2EndDate: dayjs.Dayjs | null;
};

export const AstroAppContext: Context<Astro> = createContext<Astro>({
  lockdropConfig: null,
  pairs: null,
  tokens: null,
  data: null,
  phase1StartDate: null,
  phase1EndDate: null,
  phase2StartDate: null,
  phase2EndDate: null,
});

type Props = {
  children: ReactNode;
  data: Data;
};

export const AstroAppProvider: FC<Props> = ({ children, data }) => {
  const {
    network: { name },
  } = useWallet();
  const lockdropConfig = useLockdropConfig();
  const auctionConfig = useAuctionConfig();

  const pairs = useMemo(() => {
    return data[name].pairs;
  }, [name, data]);

  const tokens = useMemo(() => {
    return data[name].tokens;
  }, [name, data]);

  const phase1StartDate = useMemo(() => {
    if (lockdropConfig == null) {
      return null;
    }

    const timestamp = lockdropConfig.init_timestamp * 1000;

    return dayjs(timestamp);
  }, [lockdropConfig]);

  const phase1EndDate = useMemo(() => {
    if (lockdropConfig == null || phase1StartDate == null) {
      return null;
    }

    return phase1StartDate
      .add(lockdropConfig.deposit_window, "second")
      .add(lockdropConfig.withdrawal_window, "second");
  }, [lockdropConfig, phase1StartDate]);

  const phase2StartDate = useMemo(() => {
    if (auctionConfig == null) {
      return null;
    }

    const timestamp = auctionConfig.init_timestamp * 1000;

    return dayjs(timestamp);
  }, [auctionConfig]);

  const phase2EndDate = useMemo(() => {
    if (auctionConfig == null || phase2StartDate == null) {
      return null;
    }

    return phase2StartDate
      .add(auctionConfig.deposit_window, "second")
      .add(auctionConfig.withdrawal_window, "second");
  }, [auctionConfig, phase2StartDate]);

  return (
    <AstroAppContext.Provider
      value={{
        pairs,
        tokens,
        data,
        lockdropConfig,
        phase1StartDate,
        phase1EndDate,
        phase2StartDate,
        phase2EndDate,
      }}
    >
      {children}
    </AstroAppContext.Provider>
  );
};

export function useAstroApp(): Astro {
  return useContext(AstroAppContext);
}

export const AstroAppConsumer: Consumer<Astro> = AstroAppContext.Consumer;
