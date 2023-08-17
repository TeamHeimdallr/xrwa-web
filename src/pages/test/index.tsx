import { useState } from 'react';
import tw from 'twin.macro';
import { Wallet } from 'xrpl';

import { useConnectWallet } from '~/api/xrpl/connect-wallet';
import { createTrustline } from '~/api/xrpl/create-trustline';
import { sendCurrency } from '~/api/xrpl/send-currency';
import { setAccount } from '~/api/xrpl/set-account';
import { useXrplStore } from '~/states/data/xrpl';

const TestPage = () => {
  const { connect, disconnect, wallet, balance, accountData } = useConnectWallet();
  const xrwaWallet = Wallet.fromSeed('sEd7EExeXE9iuc9txLJuHoiU7Kp8t7X');

  const { client } = useXrplStore();
  const [deposit, setDeposit] = useState<number>(0);
  const [userBalance, setUserBalance] = useState<string>('');
  const [xrawBalance, setXrawBalance] = useState<string>('');

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

    // send currency
    if (wallet && xrwaWallet) {
      await sendCurrency({
        currency: 'CBC',
        issuer: wallet.address,
        signer: wallet,
        to: xrwaWallet.address,
        amount: deposit.toString(),
        client: client,
      });
    }
  };

  const getBalance = async () => {
    if (wallet) {
      const userBalanceRaw = await client.request({
        command: 'gateway_balances',
        account: wallet.address,
        ledger_index: 'validated',
        hotwallet: [xrwaWallet.address],
      });

      setUserBalance(JSON.stringify(userBalanceRaw.result, null, 2));
    }

    const xrwaBalanceRaw = await client.request({
      command: 'gateway_balances',
      account: xrwaWallet.address,
      ledger_index: 'validated',
    });

    setXrawBalance(JSON.stringify(xrwaBalanceRaw.result, null, 2));
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
          Deposit for
        </Button>
        <Button
          onClick={() => {
            getBalance();
          }}
        >
          Get Balance
        </Button>
        <div>Balance for User</div>
        <div>{userBalance}</div>
        <div>Balance for XRWA</div>
        <div>{xrawBalance}</div>
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
