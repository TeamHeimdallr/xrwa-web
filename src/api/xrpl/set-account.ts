import { Wallet, TransactionMetadata, AccountSetAsfFlags } from 'xrpl';
import { useXrplStore } from '~/states/data/xrpl';

export interface SetAccountProps {
  signer: Wallet;
  isClear?: boolean;
}
export async function setAccount({ signer, isClear }: SetAccountProps) {
  const { client } = useXrplStore();
  console.log('set account');

  const tx = isClear
    ? {
        TransactionType: 'AccountSet' as 'AccountSet',
        Account: signer.address,
        ClearFlag: AccountSetAsfFlags.asfDefaultRipple,
      }
    : {
        TransactionType: 'AccountSet' as 'AccountSet',
        Account: signer.address,
        SetFlag: AccountSetAsfFlags.asfDefaultRipple,
      };

  const prepared = await client.autofill(tx);
  const signed = signer.sign(prepared);

  const result = await client.submitAndWait(signed.tx_blob);

  const meta = result.result.meta as TransactionMetadata;

  if (meta !== undefined && meta.TransactionResult == 'tesSUCCESS') {
    console.log('set account flag success');
    console.log(result);
  } else {
    console.log('error when set account flag');

    throw `Error sending transaction: ${meta.TransactionResult}`;
  }
}
