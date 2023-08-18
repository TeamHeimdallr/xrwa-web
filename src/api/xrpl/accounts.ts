import * as xrpl from 'xrpl';

import {
  BSD_WALLET_SEED,
  ENA_WALLET_SEED,
  KRW_WALLET_SEED,
  USTB_MASTER_WALLET_SEED,
} from '~/constants';
import { useXrplStore } from '~/states/data/xrpl';

export const useAccounts = () => {
  const bsdWallet = xrpl.Wallet.fromSeed(BSD_WALLET_SEED);
  const enaWallet = xrpl.Wallet.fromSeed(ENA_WALLET_SEED);
  const krwWallet = xrpl.Wallet.fromSeed(KRW_WALLET_SEED);
  const ustbWallet = xrpl.Wallet.fromSeed(USTB_MASTER_WALLET_SEED);

  const { client, isConnected } = useXrplStore();

  const getAccountTx = async (address: string) => {
    if (!isConnected) return;

    const payload: xrpl.AccountTxRequest = {
      command: 'account_tx',
      account: address,
      limit: 20,
    };

    const { result } = await client.request(payload);
    const { transactions } = result;

    // Add the transactions to the table
    const values = transactions.map(transaction => {
      const { meta, tx } = transaction;
      return {
        Account: tx?.Account,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Destination: (tx as any)?.Destination as string,
        Fee: tx?.Fee,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Amount: (tx as any)?.Amount as string,
        Hash: tx?.hash,
        TransactionType: tx?.TransactionType,
        result: typeof meta === 'string' ? '' : meta?.TransactionResult,
      };
    });

    return values;
  };

  const getAccountInfo = async (address: string) => {
    if (!isConnected) return;

    const {
      result: { account_data: accountData },
    } = await client.request({
      command: 'account_info',
      account: address,
      ledger_index: 'validated',
    });

    return accountData;
  };

  return {
    bsdWallet,
    enaWallet,
    krwWallet,
    ustbWallet,
    getAccountTx,
    getAccountInfo,
  };
};
