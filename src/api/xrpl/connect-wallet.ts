import { useEffect, useState } from 'react';
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts';
import { Wallet } from 'xrpl';

import { XRPL_WALLET_KEY } from '~/constants';
import { useUserState } from '~/states/data/user';
import { useXrplStore } from '~/states/data/xrpl';
import { AccountData } from '~/types';

export const useConnectWallet = () => {
  const currentWalletSeed = useReadLocalStorage<string>(XRPL_WALLET_KEY) ?? '';
  const [walletSeed, setWalletSeed] = useLocalStorage<string>(XRPL_WALLET_KEY, currentWalletSeed);

  const [wallet, setWallet] = useState<Wallet>();
  const [balance, setBalance] = useState<number>();
  const [accountData, setAccountData] = useState<AccountData>();

  const { select } = useUserState();

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
    setWallet(undefined);
    setBalance(undefined);
    setAccountData(undefined);
    select({ wallet: undefined, balance: undefined, accountData: undefined });
  };

  const getInfo = async (wallet: Wallet, currentBalance?: number) => {
    const balance = currentBalance ?? Number(await client.getXrpBalance(wallet.address)) ?? 0;

    const {
      result: { account_data: accountData },
    } = await client.request({ command: 'account_info', account: wallet.address });

    setWallet(wallet);
    setBalance(balance);
    setAccountData(accountData);
    select({ wallet, balance, accountData });
  };

  useEffect(() => {
    if (walletSeed) {
      retrive();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return { connect, disconnect, create, retrive, wallet, balance, accountData };
};
