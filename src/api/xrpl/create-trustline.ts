import { Wallet, TransactionMetadata, Client } from 'xrpl';
import { useXrplStore } from '~/states/data/xrpl';

export interface CreateTrustLineProps {
  currency: string;
  issuer: string;
  signer: Wallet;
  to: string;
  amount: string;
  client: Client;
}
export async function createTrustline({
  currency,
  issuer,
  signer,
  to,
  amount,
  client,
}: CreateTrustLineProps) {
  console.log('create trustline');

  const tx = {
    TransactionType: 'TrustSet' as 'TrustSet',
    Account: to,
    LimitAmount: {
      currency: currency,
      issuer: issuer,
      value: amount,
    },
  };

  const prepared = await client.autofill(tx);
  const signed = signer.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  const meta = result.result.meta as TransactionMetadata;

  if (meta !== undefined && meta.TransactionResult == 'tesSUCCESS') {
    console.log('trustline success');
    console.log(result);
  } else {
    console.log('error when create trustline');

    throw `Error sending transaction: ${meta.TransactionResult}`;
  }
}
