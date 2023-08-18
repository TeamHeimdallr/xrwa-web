import * as xrpl from 'xrpl';

import { USTB_MINTER_SEED } from '~/constants';
import { useXrplStore } from '~/states/data/xrpl';
import { useAccounts } from './accounts';

/**
 * @description USTB 를 생성하는 hook. 단 한번만 호출하면 됨.
 */
export const useCreateUSTB = () => {
  const { client } = useXrplStore();
  const { ustbWallet } = useAccounts();

  const ustbMinterWallet = xrpl.Wallet.fromSeed(USTB_MINTER_SEED);

  const createUSTB = async (amount: string) => {
    if (Number(amount) == 0) return;

    const settingsTx: xrpl.AccountSet = {
      TransactionType: 'AccountSet',
      Account: ustbMinterWallet.address,
      TransferRate: 0,
      TickSize: 5,
      Domain: '787261772E776F726C64', // xrwa.world
      SetFlag: xrpl.AccountSetAsfFlags.asfDefaultRipple,
      Flags: xrpl.AccountSetTfFlags.tfDisallowXRP | xrpl.AccountSetTfFlags.tfRequireDestTag,
    };

    const prepared = await client.autofill<xrpl.AccountSet>(settingsTx);
    const signed = ustbMinterWallet.sign(prepared);
    const result = await client.submitAndWait(signed.tx_blob);

    const txMeta = result?.result?.meta;
    if (typeof txMeta !== 'object' || txMeta?.TransactionResult !== 'tesSUCCESS') {
      throw `Error sending transaction: ${result}`;
    }

    console.log(`Transaction completed - https://testnet.xrpl.org/transactions/${signed.hash}`);

    //// ustb wallet prepare
    const {
      result: { account_data: ustbAccountData },
    } = await client.request({ command: 'account_info', account: ustbWallet.address });

    if (ustbAccountData?.Flags === 0) {
      const settingsTx: xrpl.AccountSet = {
        TransactionType: 'AccountSet',
        Account: ustbWallet.address,
        Domain: '787261772E776F726C64', // xrwa.world
        SetFlag: xrpl.AccountSetAsfFlags.asfRequireAuth,
        Flags: xrpl.AccountSetTfFlags.tfDisallowXRP | xrpl.AccountSetTfFlags.tfRequireDestTag,
      };

      const prepared = await client.autofill<xrpl.AccountSet>(settingsTx);
      const signed = ustbWallet.sign(prepared);
      console.log('sending AccountSet transaction for ustb wallet...');
      const result = await client.submitAndWait(signed.tx_blob);

      const txMeta = result?.result?.meta;
      if (typeof txMeta !== 'object' || txMeta?.TransactionResult !== 'tesSUCCESS') {
        throw `Error sending transaction: ${result}`;
      }
      console.log(`AccountSet completed - https://testnet.xrpl.org/transactions/${signed.hash}`);
    }

    //// trust line prepare
    const {
      result: { lines },
    } = await client.request({ command: 'account_lines', account: ustbWallet.address });

    const trustline = lines.find(line => line.currency === 'UST');

    if (
      trustline === undefined ||
      Number(trustline?.limit) < Number(trustline?.balance) + Number(amount)
    ) {
      const trustSetTx: xrpl.TrustSet = {
        TransactionType: 'TrustSet',
        Account: ustbWallet.address,
        LimitAmount: {
          currency: 'UST',
          issuer: ustbMinterWallet.address,
          value:
            trustline === undefined
              ? '100000000'
              : (100 * (Number(trustline?.balance) + Number(amount))).toString(),
        },
      };

      const tsPrepared = await client.autofill<xrpl.TrustSet>(trustSetTx);
      const tsSigned = ustbWallet.sign(tsPrepared);
      console.log('Creating trust line from hot address to issuer...');
      const tsResult = await client.submitAndWait(tsSigned.tx_blob);

      const tsTxMeta = tsResult?.result?.meta;
      if (typeof tsTxMeta !== 'object' || tsTxMeta?.TransactionResult !== 'tesSUCCESS') {
        throw `Error sending transaction: ${tsResult}`;
      }
      console.log(`Transaction completed - https://testnet.xrpl.org/transactions/${tsSigned.hash}`);
    }

    //// send token
    const issueQuantity = amount;
    const sendTokenTx: xrpl.Payment = {
      TransactionType: 'Payment',
      Account: ustbMinterWallet.address,
      Amount: {
        currency: 'UST',
        value: issueQuantity,
        issuer: ustbMinterWallet.address,
      },
      Destination: ustbWallet.address,
      DestinationTag: 1,
    };

    const payPrepared = await client.autofill(sendTokenTx);
    const paySigned = ustbMinterWallet.sign(payPrepared);
    console.log(`Sending ${issueQuantity} UST to ${ustbWallet.address}...`);
    const payResult = await client.submitAndWait(paySigned.tx_blob);

    const payTxMeta = payResult?.result?.meta;
    if (typeof payTxMeta !== 'object' || payTxMeta?.TransactionResult !== 'tesSUCCESS') {
      throw `Error sending transaction: ${payResult}`;
    }
    console.log(`Transaction completed - https://testnet.xrpl.org/transactions/${paySigned.hash}`);
  };

  return { createUSTB };
};
