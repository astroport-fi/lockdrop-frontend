import { request } from "graphql-request";
import { useQuery } from "react-query";

type Params = {
  name: string | string[];
  query: any;
  variables?: {
    [key: string]: any;
  };
};

export const useHive = ({ name, query, variables }: Params) => {
  const GRAPHQL = "https://testnet-hive.terra.dev/graphql";

  const { data, isLoading } = useQuery(name, () => {
    return request(GRAPHQL, query, variables);
  });

  if (isLoading || data == null) {
    return null;
  }

  return data;
};

export default useHive;
