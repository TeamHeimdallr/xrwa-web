import { AccountLinesRequest, AccountLinesResponse, GatewayBalancesRequest } from 'xrpl';

import { TOKEN_LIST } from '~/constants';
import { useCBDCBalanceStore } from '~/states/data/user-cbdc-balance';
import { useXrplStore } from '~/states/data/xrpl';
import { getCurrencyPriceUSD } from '~/utils/currency';

import { useConnectWallet } from './connect-wallet';

export const useBalance = () => {
  const { client, isConnected } = useXrplStore();

  const { wallet } = useConnectWallet();
  const { cbdcBalance, usdBalance, setCBDCBalance, setUSDBalance } = useCBDCBalanceStore();

  const getBalance = async (address: string, hotWallet?: string[]) => {
    if (!isConnected) return;

    const req = hotWallet
      ? ({
          command: 'gateway_balances',
          account: address,
          ledger_index: 'validated',
          hotwallet: hotWallet,
        } as GatewayBalancesRequest)
      : ({
          command: 'account_lines',
          account: address,
          ledger_index: 'validated',
        } as AccountLinesRequest);

    const balances = await client.request(req);
    return balances;
  };

  const getCBDCBalance = async () => {
    if (!isConnected || !wallet) return;

    const res = (await getBalance(wallet.address)) as AccountLinesResponse;
    if (!res) return;

    const {
      result: { lines },
    } = res;

    const cbdcBalance = lines
      .filter(line => TOKEN_LIST.includes(line.currency))
      .map(line => ({ currency: line.currency, balance: Number(line.balance ?? 0) }));

    const usdBalance = cbdcBalance.reduce((acc, cur) => {
      const { currency, balance } = cur;

      const price = getCurrencyPriceUSD(currency);
      const total = price * balance;

      return acc + total;
    }, 0);

    setCBDCBalance({
      BSD: cbdcBalance.find(line => line.currency === 'BSD')?.balance ?? 0,
      ENA: cbdcBalance.find(line => line.currency === 'ENA')?.balance ?? 0,
      KRW: cbdcBalance.find(line => line.currency === 'KRW')?.balance ?? 0,
    });
    setUSDBalance(usdBalance);
  };

  return { getBalance, getCBDCBalance, cbdcBalance, usdBalance };
};
