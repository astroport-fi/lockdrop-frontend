import {
  FC,
  ReactNode,
  useMemo,
  Context,
  createContext,
  useContext,
  Consumer,
} from "react";
import { useWallet } from "@terra-money/wallet-provider";

import { useConfig } from "modules/lockdrop";

import { PairResponse, Routes, Tokens, Data } from "./types";
import { formatPairsToRoutes } from "./helpers";

type Astro = {
  pairs: PairResponse[] | null;
  routes: Routes | null;
  tokens: Tokens | null;
  data: Data | null;
};

export const AstroContext: Context<Astro> = createContext<Astro>({
  pairs: [],
  routes: null,
  tokens: null,
  data: null,
});

type Props = {
  children: ReactNode;
  data: Data;
};

export const AstroProvider: FC<Props> = ({ children, data }) => {
  const {
    network: { name },
  } = useWallet();
  const config = useConfig();

  const pairs = useMemo(() => {
    return data[name].pairs;
  }, [name, data]);

  const tokens = useMemo(() => {
    return data[name].tokens;
  }, [name, data]);

  const routes = useMemo(() => {
    if (!pairs) {
      return null;
    }
    return formatPairsToRoutes(pairs);
  }, [pairs]);

  return (
    <AstroContext.Provider
      value={{
        pairs,
        routes,
        tokens,
        data,
      }}
    >
      {children}
    </AstroContext.Provider>
  );
};

export function useAstro(): Astro {
  return useContext(AstroContext);
}

export const AstroConsumer: Consumer<Astro> = AstroContext.Consumer;
