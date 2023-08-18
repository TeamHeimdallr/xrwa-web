import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { logger } from '~/states/middleware/logger';

interface CBDCBalance {
  BSD: number;
  ENA: number;
  KRW: number;
}
interface UserCBDCBalanceState {
  cbdcBalance: CBDCBalance;
  usdBalance: number;

  setCBDCBalance: (cbdcBalance: CBDCBalance) => void;
  setUSDBalance: (useBalance: number) => void;
  reset: () => void;
}

export const useCBDCBalanceStore = create<UserCBDCBalanceState>()(
  immer(
    logger(set => ({
      name: 'user-cbdc-balance-store',
      cbdcBalance: {
        BSD: 0,
        ENA: 0,
        KRW: 0,
      },
      usdBalance: 0,

      setCBDCBalance: (cbdcBalance: CBDCBalance) => set(() => ({ cbdcBalance })),
      setUSDBalance: (usdBalance: number) => set(() => ({ usdBalance })),

      reset: () =>
        set(() => ({
          cbdcBalance: { BSD: undefined, ENA: undefined, KRW: undefined },
          usdBalance: 0,
        })),
    }))
  )
);
