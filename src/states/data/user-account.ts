import { Wallet } from 'xrpl';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { logger } from '~/states/middleware/logger';
import { AccountData } from '~/types';

interface Account {
  wallet: Wallet | undefined;
  balance: number | undefined;
  accountData: AccountData | undefined;
}
interface UserAccountState {
  account: Account;
  setAccount: (account: Account) => void;
  reset: () => void;
}

export const useAccountStore = create<UserAccountState>()(
  immer(
    logger(set => ({
      name: 'user-account-store',
      account: {
        wallet: undefined,
        balance: undefined,
        accountData: undefined,
      },
      setAccount: (account: Account) => set(() => ({ account })),
      reset: () =>
        set(() => ({
          account: { wallet: undefined, balance: undefined, accountData: undefined },
        })),
    }))
  )
);
