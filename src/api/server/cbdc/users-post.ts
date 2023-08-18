import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { api } from '..';
import {
  CreateDepositWithdrawRequest,
  CreateDepositWithdrawResponse,
  UseCreateDepositWithdrawMutationOptions,
} from './types';

/**
 * Create deposit withdraw
 * POST /cbdc
 */
const createUsersAxios = async (data: CreateDepositWithdrawRequest) =>
  (
    await api.post<
      CreateDepositWithdrawResponse,
      AxiosResponse<CreateDepositWithdrawResponse>,
      CreateDepositWithdrawRequest
    >(`/cbdc`, data)
  ).data;

export const useCreateUsersMutate = (options?: UseCreateDepositWithdrawMutationOptions) =>
  useMutation<
    CreateDepositWithdrawResponse,
    AxiosError<CreateDepositWithdrawResponse, CreateDepositWithdrawRequest>,
    CreateDepositWithdrawRequest
  >(['cbdc', 'create-deposit-withdraw'], createUsersAxios, { ...options });
