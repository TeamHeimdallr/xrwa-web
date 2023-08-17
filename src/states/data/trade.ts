import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { logger } from '~/states/middleware/logger';
import { TRADE_OPTIONS } from '~/types';

export interface TradeState {
  selected: TRADE_OPTIONS;
  select: (select: TRADE_OPTIONS) => void;
  reset: () => void;
}
export interface SelectedTokenState {
  selected: string;
  select: (select: string) => void;
  reset: () => void;
}

export const useTradeState = create<TradeState>()(
  immer(
    logger(set => ({
      name: 'trade-store',
      selected: TRADE_OPTIONS.DEPOSIT,
      select: (select: TRADE_OPTIONS) => set(() => ({ selected: select })),
      reset: () => set(() => ({ selected: TRADE_OPTIONS.WITHDRAW })),
    }))
  )
);

export const useSelectedTokenState = create<SelectedTokenState>()(
  immer(
    logger(set => ({
      name: 'selected-token-store',
      selected: 'BSD',
      select: (select: string) => set(() => ({ selected: select })),
      reset: () => set(() => ({ selected: '' })),
    }))
  )
);
