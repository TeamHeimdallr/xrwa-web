import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import {
  BalanceWithdraws,
  DepositWithdraw,
  DepositWithdrawStatus,
  DepositWithdrawType,
} from '~/types';

/**
 * Get all activities
 * GET /cbdc
 */
export interface GetActivitiesParams {}
export interface GetActivitiesResponse {
  data: DepositWithdraw[];
}

/**
 * Get withdraw balances
 * GET /cbdc/balances
 */
export interface GetWithdrawBalancesParams {}
export interface GetWithdrawBalancesResponse {
  data: BalanceWithdraws;
}

/**
 * Create deposit withdraw
 * POST /cbdc
 */
export interface CreateDepositWithdrawRequest {
  type: DepositWithdrawType;

  account: string;
  destination: string;

  amount: string;
  currency: string;

  status: DepositWithdrawStatus;

  date: Date;
  unlockDate?: Date;

  exchangeRate: number;
  tx: string;
}
export interface CreateDepositWithdrawResponse {}
export type UseCreateDepositWithdrawMutationOptions = UseMutationOptions<
  CreateDepositWithdrawResponse,
  AxiosError<CreateDepositWithdrawResponse, CreateDepositWithdrawRequest>,
  CreateDepositWithdrawRequest
>;
