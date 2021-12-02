import { gql } from "graphql-request";

import { useGraphql } from "hooks/useGraphql";

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
  const query = createQuery();

  return useGraphql({
    name: "airdrop",
    query,
    variables: { address },
    options: {
      enabled: !!address,
    },
  });
};

export default useAirdrop;
