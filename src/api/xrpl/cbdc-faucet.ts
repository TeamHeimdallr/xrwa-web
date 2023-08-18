import * as xrpl from 'xrpl';

import { useXrplStore } from '~/states/data/xrpl';
import { TOKEN } from '~/types';

import { useAccounts } from './accounts';
import { useConnectWallet } from './connect-wallet';

/**
 * @description CBDC 를 생성하는 hook. cbdc 별 wallet 이 하나씩 생성되는 구조이고, 단 한번만 호출하면 됨.
 */
export const useFaucetCBDC = () => {
  const { client, isConnected } = useXrplStore();
  const { wallet } = useConnectWallet();
  const { bsdWallet, enaWallet, krwWallet } = useAccounts();

  const getTrustLines = async () => {
    if (!isConnected || !wallet) return;

    const payload: xrpl.AccountCurrenciesRequest = {
      command: 'account_currencies',
      account: wallet.address,
    };

    const {
      result: { receive_currencies: receiveCurrencies },
    } = await client.request(payload);

    return receiveCurrencies;
  };
  const faucetCBDC = async (type: TOKEN) => {
    if (!isConnected || !wallet) return;

    const trustLines = await getTrustLines();
    // [ 'BSD', 'ENA', 'KRW']

    const cbdcWallet = type === 'BSD' ? bsdWallet : type === 'ENA' ? enaWallet : krwWallet;
    const currencyCode = type;

    if (trustLines?.includes(currencyCode)) {
      //// send token
      const issueQuantity = '500';
      const sendTokenTx: xrpl.Payment = {
        TransactionType: 'Payment',
        Account: cbdcWallet.address,
        Amount: {
          currency: type,
          value: issueQuantity,
          issuer: cbdcWallet.address,
        },
        Destination: wallet.address,
        DestinationTag: 1,
      };

      const payPrepared = await client.autofill(sendTokenTx);
      const paySigned = cbdcWallet.sign(payPrepared);
      console.log(`Sending ${issueQuantity} ${type} to ${wallet.address}...`);
      const payResult = await client.submitAndWait(paySigned.tx_blob);

      const payTxMeta = payResult?.result?.meta;
      if (typeof payTxMeta !== 'object' || payTxMeta?.TransactionResult !== 'tesSUCCESS') {
        throw `Error sending transaction: ${payResult}`;
      }
      console.log(
        `Transaction completed - https://testnet.xrpl.org/transactions/${paySigned.hash}`
      );
      return;
    }

    //// wallet prepare
    const {
      result: { account_data: accountData },
    } = await client.request({ command: 'account_info', account: wallet.address });

    if (accountData?.Flags === 0) {
      const settingsTx: xrpl.AccountSet = {
        TransactionType: 'AccountSet',
        Account: wallet.address,
        Domain: '787261772E776F726C64', // xrwa.world
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

    //// trust line prepare
    const trustSetTx: xrpl.TrustSet = {
      TransactionType: 'TrustSet',
      Account: wallet.address,
      LimitAmount: {
        currency: currencyCode,
        issuer: cbdcWallet.address,
        value: '10000000',
      },
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

    //// send token
    const issueQuantity = '500';
    const sendTokenTx: xrpl.Payment = {
      TransactionType: 'Payment',
      Account: cbdcWallet.address,
      Amount: {
        currency: type,
        value: issueQuantity,
        issuer: cbdcWallet.address,
      },
      Destination: wallet.address,
      DestinationTag: 1,
    };

    const payPrepared = await client.autofill(sendTokenTx);
    const paySigned = cbdcWallet.sign(payPrepared);
    console.log(`Sending ${issueQuantity} ${type} to ${wallet.address}...`);
    const payResult = await client.submitAndWait(paySigned.tx_blob);

    const payTxMeta = payResult?.result?.meta;
    if (typeof payTxMeta !== 'object' || payTxMeta?.TransactionResult !== 'tesSUCCESS') {
      throw `Error sending transaction: ${payResult}`;
    }
    console.log(`Transaction completed - https://testnet.xrpl.org/transactions/${paySigned.hash}`);
  };

  return { faucetCBDC };
};
