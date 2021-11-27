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

import { PairResponse, Tokens, Data } from "./types";

type Astro = {
  pairs: PairResponse[] | null;
  config: any | null;
  tokens: Tokens | null;
  data: Data | null;
};

export const AstroAppContext: Context<Astro> = createContext<Astro>({
  config: null,
  pairs: null,
  tokens: null,
  data: null,
});

type Props = {
  children: ReactNode;
  data: Data;
};

export const AstroAppProvider: FC<Props> = ({ children, data }) => {
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

  return (
    <AstroAppContext.Provider
      value={{
        pairs,
        tokens,
        data,
        config,
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
