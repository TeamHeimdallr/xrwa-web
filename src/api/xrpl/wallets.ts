import { Wallet } from 'xrpl';

import { BSD_WALLET_SEED, ENA_WALLET_SEED, KRW_WALLET_SEED } from '~/constants';

export const useWallets = () => {
  const bsdWallet = Wallet.fromSeed(BSD_WALLET_SEED);
  const enaWallet = Wallet.fromSeed(ENA_WALLET_SEED);
  const krwWallet = Wallet.fromSeed(KRW_WALLET_SEED);

  return { bsdWallet, enaWallet, krwWallet };
};
