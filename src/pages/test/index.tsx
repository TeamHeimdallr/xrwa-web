import { useState } from 'react';
import tw from 'twin.macro';
import { Wallet } from 'xrpl';

import { useConnectWallet } from '~/api/xrpl/connect-wallet';
import { createTrustline } from '~/api/xrpl/create-trustline';
import { setAccount } from '~/api/xrpl/set-account';
import { useXrplStore } from '~/states/data/xrpl';

const TestPage = () => {
  const { connect, disconnect, wallet, balance, accountData } = useConnectWallet();
  const xrwaWallet = Wallet.fromSeed('sEd7EExeXE9iuc9txLJuHoiU7Kp8t7X');

  const { client } = useXrplStore();
  const [deposit, setDeposit] = useState<number>(0);

  const price = 0.9;

  const handleDeposit = async () => {
    // set account flags
    if (wallet && xrwaWallet) {
      if (accountData?.Flags === 0) {
        await setAccount({ signer: wallet, client: client });
      }

      const {
        result: { account_data: xrwaAccountData },
      } = await client.request({ command: 'account_info', account: xrwaWallet.address });

      console.log(xrwaAccountData);

      if (xrwaAccountData?.Flags === 0) {
        await setAccount({ signer: xrwaWallet, client: client });
      }
    }

    // create trustline
    if (wallet && xrwaWallet) {
      await createTrustline({
        currency: 'CBC',
        issuer: wallet.address,
        signer: xrwaWallet,
        to: xrwaWallet.address,
        amount: deposit.toString(),
        client: client,
      });
    }
  };

  return (
    <Wrapper>
      <div>
        <Button onClick={() => connect()}>connect</Button>
        <Button onClick={() => disconnect()}>disconnect</Button>
      </div>

      <br />
      <div>address: {wallet?.address}</div>
      <div>seed: {wallet?.seed}</div>
      <div>balance: {balance}xrp</div>
      <div style={{ whiteSpace: 'pre-wrap' }}>
        accountData: {JSON.stringify(accountData, null, 2)}
      </div>

      <Deposit>
        <Input>
          <div>CBDC</div>
          <input type="number" onChange={e => setDeposit(Number(e.target.value))} value={deposit} />
        </Input>
        <Input>
          <div>USTB</div>
          <input disabled type="number" value={deposit * price} />
        </Input>
        <Button
          onClick={() => {
            handleDeposit();
          }}
        >
          Deposit for {wallet?.address} {accountData?.Flags} {deposit}
        </Button>
      </Deposit>
    </Wrapper>
  );
};

const Wrapper = tw.div`m-100`;
const Button = tw.button`
  clickable w-200
`;
const Deposit = tw.div`
  flex flex-col my-50 font-sb-18 gap-20
`;
const Input = tw.div`
  flex gap-20
`;

export default TestPage;
