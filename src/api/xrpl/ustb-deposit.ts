import * as xrpl from 'xrpl';

import { useXrplStore } from '~/states/data/xrpl';

import { useAccounts } from './accounts';
import { useConnectWallet } from './connect-wallet';

/**
 * @description USTB 를 user wallet 으로 transfer 하는 hook. (deposit 시에 사용)
 */
export const useDepositUSTB = () => {
  const { client, isConnected } = useXrplStore();
  const { wallet } = useConnectWallet();
  const { ustbWallet, ustbMinterWallet } = useAccounts();

  const depositUSTB = async (amount: string) => {
    if (!isConnected || !wallet) return;

    //// user wallet prepare
    const {
      result: { account_data: accountData },
    } = await client.request({ command: 'account_info', account: wallet.address });

    if (accountData?.Flags === 0) {
      const settingsTx: xrpl.AccountSet = {
        TransactionType: 'AccountSet',
        Account: wallet.address,
        Domain: '787261772E776F726C64', // xrwa.world
        SetFlag: xrpl.AccountSetAsfFlags.asfRequireAuth,
        Flags: xrpl.AccountSetTfFlags.tfDisallowXRP | xrpl.AccountSetTfFlags.tfRequireDestTag,
      };

      const prepared = await client.autofill<xrpl.AccountSet>(settingsTx);
      const signed = wallet.sign(prepared);
      console.log('sending AccountSet transaction...');
      const result = await client.submitAndWait(signed.tx_blob);

      const txMeta = result?.result?.meta;
      if (typeof txMeta !== 'object' || txMeta?.TransactionResult !== 'tesSUCCESS') {
        throw `Error sending transaction: ${result}`;
      }
      console.log(`AccountSet completed - https://testnet.xrpl.org/transactions/${signed.hash}`);
    }

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
    } = await client.request({ command: 'account_lines', account: wallet.address });

    const trustline = lines.find(line => line.currency === 'UST');
    if (
      trustline === undefined ||
      Number(trustline?.limit) < Number(trustline?.balance) + Number(amount)
    ) {
      const trustSetTx: xrpl.TrustSet = {
        TransactionType: 'TrustSet',
        Account: wallet.address,
        LimitAmount: {
          currency: 'UST',
          issuer: ustbMinterWallet.address,
          value:
            trustline === undefined
              ? '100000000'
              : (10 * (Number(trustline?.balance) + Number(amount))).toString(),
        },
        Flags: xrpl.TrustSetFlags.tfSetNoRipple,
      };

      const tsPrepared = await client.autofill<xrpl.TrustSet>(trustSetTx);
      const tsSigned = wallet.sign(tsPrepared);
      console.log('Creating trust line from hot address to issuer...');
      const tsResult = await client.submitAndWait(tsSigned.tx_blob);

      const tsTxMeta = tsResult?.result?.meta;
      if (typeof tsTxMeta !== 'object' || tsTxMeta?.TransactionResult !== 'tesSUCCESS') {
        throw `Error sending transaction: ${tsResult}`;
      }
      console.log(`Transaction completed - https://testnet.xrpl.org/transactions/${tsSigned.hash}`);
    }

    //// send token
    const sendTokenTx: xrpl.Payment = {
      TransactionType: 'Payment',
      Account: ustbWallet.address,
      Amount: {
        currency: 'UST',
        value: amount,
        issuer: ustbMinterWallet.address,
      },
      Destination: wallet.address,
      DestinationTag: 1,
    };

    const payPrepared = await client.autofill(sendTokenTx);
    const paySigned = ustbWallet.sign(payPrepared);
    console.log(`Sending ${amount} UST to ${ustbWallet.address}...`);
    const payResult = await client.submitAndWait(paySigned.tx_blob);

    const payTxMeta = payResult?.result?.meta;
    if (typeof payTxMeta !== 'object' || payTxMeta?.TransactionResult !== 'tesSUCCESS') {
      throw `Error sending transaction: ${payResult}`;
    }
    console.log(`Transaction completed - https://testnet.xrpl.org/transactions/${paySigned.hash}`);
  };

  return { depositUSTB };
};
