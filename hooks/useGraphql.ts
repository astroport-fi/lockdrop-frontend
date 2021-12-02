import { request } from "graphql-request";
import { useQuery } from "react-query";

import { GRAPHQL } from "constants/constants";

type Params = {
  name: string | string[];
  query: any;
  variables?: {
    [key: string]: any;
  };
  options?: any;
};

export const useGraphql = ({ name, query, variables, options }: Params) => {
  return useQuery(
    name,
    () => {
      return request(GRAPHQL, query, variables);
    },
    options
  );
};

export default useGraphql;
