import { Wallet } from 'xrpl';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { logger } from '~/states/middleware/logger';
import { AccountData } from '~/types';

interface UserState {
  wallet: Wallet | undefined;
  balance: number | undefined;
  accountData: AccountData | undefined;
}

export interface SelectedTokenState {
  selected: UserState;
  select: (select: UserState) => void;
  reset: () => void;
}

export const useUserState = create<SelectedTokenState>()(
  immer(
    logger(set => ({
      name: 'user-store',
      selected: {
        wallet: undefined,
        balance: undefined,
        accountData: undefined,
      },
      select: (select: UserState) => set(() => ({ selected: select })),
      reset: () =>
        set(() => ({
          selected: {
            wallet: undefined,
            balance: undefined,
            accountData: undefined,
          },
        })),
    }))
  )
);
