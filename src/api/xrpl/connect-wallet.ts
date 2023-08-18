import { useEffect } from 'react';
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts';
import { Wallet } from 'xrpl';

import { XRPL_WALLET_KEY } from '~/constants';
import { useAccountStore } from '~/states/data/user-account';
import { useXrplStore } from '~/states/data/xrpl';

export const useConnectWallet = () => {
  const currentWalletSeed = useReadLocalStorage<string>(XRPL_WALLET_KEY) ?? '';
  const [walletSeed, setWalletSeed] = useLocalStorage<string>(XRPL_WALLET_KEY, currentWalletSeed);

  const { account, setAccount } = useAccountStore();

  const { client, isConnected } = useXrplStore();

  const retrive = async () => {
    if (!isConnected || !walletSeed) return;

    const wallet = Wallet.fromSeed(walletSeed);
    await getInfo(wallet);
  };

  const create = async () => {
    if (!isConnected) return;

    const { wallet, balance } = await client.fundWallet();
    const walletSeed = wallet.seed ?? '';
    setWalletSeed(walletSeed);

    await getInfo(wallet, balance);
  };

  const connect = async (seed?: string) => {
    if (!isConnected) return;

    if (seed) {
      const wallet = Wallet.fromSeed(seed);
      setWalletSeed(wallet.seed ?? '');

      await getInfo(wallet);
      return;
    }

    if (walletSeed) {
      await retrive();
      return;
    }

    await create();
  };

  const disconnect = async () => {
    if (!isConnected) return;
    setWalletSeed('');
    setAccount({ wallet: undefined, balance: undefined, accountData: undefined });
  };

  const getInfo = async (wallet: Wallet, currentBalance?: number) => {
    const balance = currentBalance ?? Number(await client.getXrpBalance(wallet.address)) ?? 0;

    const {
      result: { account_data: accountData },
    } = await client.request({ command: 'account_info', account: wallet.address });

    setAccount({ wallet, balance, accountData });
  };

  useEffect(() => {
    if (walletSeed && !account.wallet) {
      retrive();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, walletSeed, account.wallet]);

  return {
    connect,
    disconnect,
    create,
    retrive,
    wallet: account.wallet,
    balance: account.balance,
    accountData: account.accountData,
  };
};
