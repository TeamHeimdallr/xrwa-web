import * as xrpl from 'xrpl';

import { USTB_MASTER_WALLET_SEED } from '~/constants';
import { useXrplStore } from '~/states/data/xrpl';

/**
 * @description USTB 를 생성하는 hook. 단 한번만 호출하면 됨.
 */
export const useCreateUSTB = () => {
  const { client, isConnected } = useXrplStore();

  const ustbWallet = xrpl.Wallet.fromSeed(USTB_MASTER_WALLET_SEED);

  const createUSTB = async () => {
    if (!isConnected) return;

    const wallet = ustbWallet;

    const settingsTx: xrpl.AccountSet = {
      TransactionType: 'AccountSet',
      Account: wallet.address,
      TransferRate: 0,
      TickSize: 5,
      Domain: '787261772E776F726C64', // xrwa.world
      SetFlag: xrpl.AccountSetAsfFlags.asfDefaultRipple,
      Flags: xrpl.AccountSetTfFlags.tfDisallowXRP | xrpl.AccountSetTfFlags.tfRequireDestTag,
    };

    const prepared = await client.autofill<xrpl.AccountSet>(settingsTx);
    const signed = wallet.sign(prepared);
    const result = await client.submitAndWait(signed.tx_blob);

    const txMeta = result?.result?.meta;
    if (typeof txMeta !== 'object' || txMeta?.TransactionResult !== 'tesSUCCESS') {
      throw `Error sending transaction: ${result}`;
    }
  };

  return { createUSTB };
};
