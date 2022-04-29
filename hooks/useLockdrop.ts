import {
  AccAddress,
  Coins,
  MsgExecuteContract,
  Fee
} from '@terra-money/terra.js';
import { useRecoilValue } from 'recoil';
import networks, {
  isSupportedNetwork,
  SupportedNetwork
} from '../store/networks';
import { networkNameState } from '../data/network';
import { TxResult, useWallet } from '@terra-money/wallet-provider';
import { lcdClientQuery } from '../data/network';
import { addressState } from '../data/wallet';
import useFee from './useFee';

// an example hook for a contract.
// e.g. cw3
// Todo: replace message types (currently any) with real types.
// replace useContract with contract name/type.
// add executions using execute template.
// add queries using query template.

export const useLockdrop = (contractAddress: AccAddress) => {
  let networkName = useRecoilValue(networkNameState);
  if (!networkName || !isSupportedNetwork(networkName)) networkName = 'mainnet';

  const lockdropAddress =
    networks[networkName as SupportedNetwork].contracts.apolloLockdrop;

  const { post } = useWallet();

  const fee = useFee();

  const userWalletAddr = useRecoilValue(addressState);
  const lcdClient = useRecoilValue(lcdClientQuery);

  function executeExample(proposal_id: number): Promise<TxResult> {
    const executeMsg = createExecuteMsg({
      execute: { proposal_id }
    });

    return post({
      msgs: [executeMsg],
      fee: new Fee(fee.gas, { uusd: fee.amount })
    });
  }

  // query
  function query<T>(queryMsg: any) {
    return lcdClient.wasm.contractQuery<T>(contractAddress, queryMsg);
  }

  // prepare execution
  function createExecuteMsg(executeMsg: any, coins?: Coins.Input) {
    return new MsgExecuteContract(
      userWalletAddr,
      contractAddress,
      executeMsg,
      coins
    );
  }

  function queryExample(proposal_id: number) {
    return query<any>({ proposal: { proposal_id } });
  }

  return {
    executeExample,
    queryExample
  };
};
