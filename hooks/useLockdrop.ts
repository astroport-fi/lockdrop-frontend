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

// From lockdrop integration test:
//
// executions:
// 1. Deposit 1000000 Astro into Astroport Staking for 1000000 xAstro with Wallet 1 - astroportStaking.enterAstroToken('1000000', astroToken)
// 2. Deposit 1000000 xAstro for 52 weeks with Wallet 1 - apollo.lockdrop.depositAsset('1000000', 52, xAstroToken)
// 3. Deposit 1000000 Astro for 26 weeks with Wallet 1 - apollo.lockdrop.depositAstroAndIncreaseLockup('1000000', 26, xAstroToken)
//
//queries:
// 1.  Wallet 1 Lockup Positions - apollo.lockdrop.getUserInfo - wallet.key.accAddress contracts.astroport.xastroToken
//   assert(wallet1Query.lockup_positions_index == 1); // Check that there is 1 lockup position
//   assert(wallet1Query.lockup_infos[0].units_locked == '1000000'); // Check that the lockup position has 1000000 xAstro locked
//   assert(wallet1Query.lockup_infos[0].weighted_sum == '6900000'); // Check that the lockdrop position has 6900000 apAstro
//
// 2.  'Wallet 1 query after second deposit using astro token as deposit' - apollo.lockdrop.getUserInfo - wallet.key.accAddress contracts.astroport.xastroToken
//     assert(userQueryAfter2ndDeposit.lockup_positions_index == 2); // Check that there are 2 lockup positions
//     assert(userQueryAfter2ndDeposit.lockup_infos[0].units_locked == '1000000'); // Check that the second lockup position has 1000000 xAstro locked
//     assert(userQueryAfter2ndDeposit.lockup_infos[0].weighted_sum == '2400000'); // Check that the second lockup position has 2400000 apAstro
//
// tests:
// 1.'Deposit 1000000 Astro into Astroport Staking for 1000000 xAstro with Wallet 1'
// 2.'Deposit 1000000 Astro for 26 weeks with Wallet 1'
//

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
