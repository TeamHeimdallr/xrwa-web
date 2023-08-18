import * as xrpl from 'xrpl';

import { useXrplStore } from '~/states/data/xrpl';
import { TOKEN } from '~/types';

import { useAccounts } from './accounts';
import { useConnectWallet } from './connect-wallet';

/**
 * @description CBDC 를 ustb wallet 으로 Deposit 하는 hook.
 */
export const useDepositCBDC = () => {
  const { client, isConnected } = useXrplStore();
  const { wallet } = useConnectWallet();
  const { bsdWallet, enaWallet, krwWallet, ustbWallet } = useAccounts();

  const depositCBDC = async (type: TOKEN, amount: string) => {
    if (!isConnected || !wallet) return;

    const cbdcWallet = type === 'BSD' ? bsdWallet : type === 'ENA' ? enaWallet : krwWallet;

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
    } = await client.request({ command: 'account_lines', account: ustbWallet.address });

    const trustline = lines.find(line => line.currency === type);
    if (
      trustline === undefined ||
      Number(trustline?.limit) < Number(trustline?.balance) + Number(amount)
    ) {
      const currencyCode = type;
      const trustSetTx: xrpl.TrustSet = {
        TransactionType: 'TrustSet',
        Account: ustbWallet.address,
        LimitAmount: {
          currency: currencyCode,
          issuer: cbdcWallet.address,
          value:
            trustline === undefined
              ? '100000000'
              : (10 * (Number(trustline?.balance) + Number(amount))).toString(),
        },
        Flags: xrpl.TrustSetFlags.tfSetNoRipple,
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
    const sendTokenTx: xrpl.Payment = {
      TransactionType: 'Payment',
      Account: wallet.address,
      Amount: {
        currency: type,
        value: amount,
        issuer: cbdcWallet.address,
      },
      Destination: ustbWallet.address,
      DestinationTag: 1,
    };

    const payPrepared = await client.autofill(sendTokenTx);
    const paySigned = wallet.sign(payPrepared);
    console.log(`Sending ${amount} ${type} to ${ustbWallet.address}...`);
    const payResult = await client.submitAndWait(paySigned.tx_blob);

    const payTxMeta = payResult?.result?.meta;
    if (typeof payTxMeta !== 'object' || payTxMeta?.TransactionResult !== 'tesSUCCESS') {
      throw `Error sending transaction: ${payResult}`;
    }
    console.log(`Transaction completed - https://testnet.xrpl.org/transactions/${paySigned.hash}`);
  };

  return { depositCBDC };
};
