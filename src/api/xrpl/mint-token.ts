import * as xrpl from 'xrpl';

import { BSD_WALLET_SEED, ENA_WALLET_SEED, KRW_WALLET_SEED } from '~/constants';
import { useXrplStore } from '~/states/data/xrpl';
import { CBDC } from '~/types';

/**
 * @description CBDC 를 생성하는 hook. cbdc 별 wallet 이 하나씩 생성되는 구조이고, 단 한번만 호출하면 됨.
 */
export const useCreateCBDC = () => {
  const { client, isConnected } = useXrplStore();

  const bsdWallet = xrpl.Wallet.fromSeed(BSD_WALLET_SEED);
  const enaWallet = xrpl.Wallet.fromSeed(ENA_WALLET_SEED);
  const krwWallet = xrpl.Wallet.fromSeed(KRW_WALLET_SEED);

  const createCBDC = async (type: CBDC) => {
    if (!isConnected) return;

    const wallet = type === 'BSD' ? bsdWallet : type === 'ENA' ? enaWallet : krwWallet;

    const coldSettingsTx: xrpl.AccountSet = {
      TransactionType: 'AccountSet',
      Account: wallet.address,
      TransferRate: 0,
      TickSize: 5,
      Domain: '787261772E776F726C64', // xrwa.world
      SetFlag: xrpl.AccountSetAsfFlags.asfDefaultRipple,
      Flags: xrpl.AccountSetTfFlags.tfDisallowXRP | xrpl.AccountSetTfFlags.tfRequireDestTag,
    };

    const cstPrepared = await client.autofill<xrpl.AccountSet>(coldSettingsTx);
    const cstSigned = wallet.sign(cstPrepared);
    const cstResult = await client.submitAndWait(cstSigned.tx_blob);

    const txMeta = cstResult?.result?.meta;
    if (typeof txMeta !== 'object' || txMeta?.TransactionResult !== 'tesSUCCESS') {
      throw `Error sending transaction: ${cstResult}`;
    }
  };

  return { createCBDC };
};
