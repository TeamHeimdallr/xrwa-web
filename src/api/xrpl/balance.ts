import { useXrplStore } from '~/states/data/xrpl';

export const useBalance = () => {
  const { client, isConnected } = useXrplStore();

  const getBalance = async (address: string, hotWallet?: string[]) => {
    if (!isConnected) return;

    const req = hotWallet
      ? {
          command: 'gateway_balances',
          account: address,
          ledger_index: 'validated',
          hotwallet: hotWallet,
        }
      : {
          command: 'account_lines',
          account: address,
          ledger_index: 'validated',
        };

    const balances = await client.request(req);
    return balances;
  };

  return { getBalance };
};
