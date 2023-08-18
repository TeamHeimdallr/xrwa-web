export type DepositWithdrawStatus = 'locked' | 'withdrawn';
export type DepositWithdrawType = 'deposit' | 'withdraw';

export interface DepositWithdraw {
  id: number;

  type: DepositWithdrawStatus;

  account: string;
  destination: string;

  amount: string;
  currency: string;

  status: DepositWithdrawType;

  date: Date;
  unlockDate: Date;

  exchangeRate: number;
  tx: string;
}

export interface BalanceCurrency {
  currency: string;
  amount: number;
}

export interface BalanceWithdraws {
  withdrawns: BalanceCurrency[];
  withdrawings: BalanceCurrency[];
}
