import { Xumm } from 'xumm';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { XUMM_API_KEY } from '~/constants';

import { logger } from '../middleware/logger';

export interface XummState {
  xumm: Xumm;
}

export const useXummStore = create<XummState>()(
  immer(
    logger(_set => ({
      name: 'xumm-store',

      xumm: new Xumm(XUMM_API_KEY),
    }))
  )
);
