import { Wallet, TransactionMetadata, Client } from 'xrpl';
import { useXrplStore } from '~/states/data/xrpl';

export interface SendCurrencyProps {
  currency: string;
  issuer: string;
  signer: Wallet;
  to: string;
  amount: string;
  client: Client;
}
export async function sendCurrency({
  currency,
  issuer,
  signer,
  to,
  amount,
  client,
}: SendCurrencyProps) {
  console.log('send currency');

  const tx = {
    TransactionType: 'Payment' as 'Payment',
    Account: signer.address,
    Amount: {
      currency: currency,
      issuer: issuer,
      value: amount,
    },
    Destination: to,
  };

  const prepared = await client.autofill(tx);
  const signed = signer.sign(prepared);

  const result = await client.submitAndWait(signed.tx_blob);

  const meta = result.result.meta as TransactionMetadata;

  if (meta !== undefined && meta.TransactionResult == 'tesSUCCESS') {
    console.log('send currency success');
    console.log(result);

    return signed.hash;
  } else {
    console.log('error when sending currency');

    throw `Error sending transaction: ${meta.TransactionResult}`;
  }
}
