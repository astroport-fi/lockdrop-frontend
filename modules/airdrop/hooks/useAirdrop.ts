import { gql } from "graphql-request";

import { useGraphql } from "hooks/useGraphql";
import data from "../airdrop.json";

const createQuery = () => {
  return gql`
    query Query($address: ID!) {
      airdrop(address: $address) {
        amount
        claimed
        proofs
        createdAt
      }
    }
  `;
};

export const useAirdrop = (address: string | undefined) => {
  // const query = createQuery();

  // return useGraphql({
  //   name: "airdrop",
  //   query,
  //   variables: { address },
  //   options: {
  //     enabled: !!address,
  //   },
  // });

  // TODO: change to api call
  return data.find((item) => item.address === address);
};

export default useAirdrop;
