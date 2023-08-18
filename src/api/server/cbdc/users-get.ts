import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { encodeParams } from '~/utils/params';

import { api } from '..';
import {
  GetActivitiesParams,
  GetActivitiesResponse,
  GetWithdrawBalancesParams,
  GetWithdrawBalancesResponse,
} from './types';

/**
 * Get all activities
 * GET /cbdc
 */
const getActivitiesAxios = async (params?: GetActivitiesParams) =>
  (await api.get<GetActivitiesResponse>(`/cbdc` + `${encodeParams(params)}`)).data;

export const useGetActivitiesQuery = (
  params?: GetActivitiesParams,
  options?: UseQueryOptions<GetActivitiesResponse>
) =>
  useQuery<GetActivitiesResponse>(
    ['cbdc', 'get-activities', params],
    () => getActivitiesAxios(params),
    {
      keepPreviousData: true,
      ...options,
    }
  );

/**
 * Get withdraw balances
 * GET /cbdc/balances
 */
const getWithdrawBalancesAxios = async (params?: GetWithdrawBalancesParams) =>
  (await api.get<GetWithdrawBalancesResponse>(`/cbdc/balances` + `${encodeParams(params)}`)).data;

export const useGetWithdrawBalancesQuery = (
  params?: GetWithdrawBalancesParams,
  options?: UseQueryOptions<GetWithdrawBalancesResponse>
) =>
  useQuery<GetWithdrawBalancesResponse>(
    ['cbdc', 'get-balances', params],
    () => getWithdrawBalancesAxios(params),
    {
      keepPreviousData: true,
      ...options,
    }
  );
