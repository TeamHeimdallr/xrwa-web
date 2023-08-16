import { useEffect, useState } from 'react';

import { useXrplStore } from '~/states/data/xrpl';
import { useXummStore } from '~/states/data/xumm';
import { AccountData } from '~/types';

export const useConnectWalletXumm = () => {
  const { xumm } = useXummStore();
  const { client } = useXrplStore();

  const [account, setAccount] = useState<string>();
  const [balance, setBalance] = useState<number>();
  const [accountData, setAccountData] = useState<AccountData>();

  const getAccount = async () => {
    const account = await xumm.user.account;
    if (!account) return;

    const {
      result: { account_data: accountData },
    } = await client.request({ command: 'account_info', account });

    setAccount(account);
    setBalance(Number(accountData.Balance));
    setAccountData(accountData);
  };

  useEffect(() => {
    xumm.on('success', getAccount);

    return () => {
      xumm.off('success', getAccount);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    connect: xumm.authorize,
    disconnect: xumm.logout,

    account,
    balance,
    accountData,
  };
};
