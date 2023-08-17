import { useState } from 'react';
import tw from 'twin.macro';
import { Wallet } from 'xrpl';

import { useConnectWallet } from '~/api/xrpl/connect-wallet';
import { createTrustline } from '~/api/xrpl/create-trustline';

const TestPage = () => {
  const { connect, disconnect, wallet, balance, accountData } = useConnectWallet();
  const xrwaWallet = Wallet.fromSeed('sEd7EExeXE9iuc9txLJuHoiU7Kp8t7X');

  const [deposit, setDeposit] = useState<number>(0);

  const price = 0.9;

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
            if (wallet)
              createTrustline({
                currency: 'CBC',
                issuer: xrwaWallet.address,
                signer: wallet,
                to: xrwaWallet.address,
                amount: deposit.toString(),
              });
          }}
        >
          Deposit for {wallet?.address}
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
