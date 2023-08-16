import { AccountInfoResponse } from 'xrpl';

export type AccountData = Pick<AccountInfoResponse['result'], 'account_data'>['account_data'];
