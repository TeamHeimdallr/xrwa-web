import tw from 'twin.macro';

import { useConnectWallet } from '~/api/xrpl/connect-wallet';

const MainPage = () => {
  const { connect, disconnect, wallet, balance, accountData } = useConnectWallet();

  return (
    <Wrapper>
      <div>
        <button onClick={() => connect()}>connect</button>
        <button onClick={() => disconnect()}>disconnect</button>
      </div>

      <br />
      <div>address: {wallet?.address}</div>
      <div>seed: {wallet?.seed}</div>
      <div>balance: {balance}xrp</div>
      <div style={{ whiteSpace: 'pre-wrap' }}>
        accountData: {JSON.stringify(accountData, null, 2)}
      </div>
    </Wrapper>
  );
};

const Wrapper = tw.div``;

export default MainPage;
