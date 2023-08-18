import { useEffect } from 'react';
import tw from 'twin.macro';

import { useBalance } from '~/api/xrpl/balance';
import { useConnectWallet } from '~/api/xrpl/connect-wallet';
import { CardPrimary } from '~/components/card/card-primary';
import { Gnb } from '~/components/gnb';
import { IconLocked, IconTotal, IconWithdraw } from '~/components/icons';
import Table from '~/components/table';
import { useXrplStore } from '~/states/data/xrpl';

const MyPage = () => {
  const { isConnected } = useXrplStore();
  const { wallet } = useConnectWallet();
  const { getCBDCBalance, cbdcBalance, usdBalance } = useBalance();

  useEffect(() => {
    if (!isConnected || !wallet) return;

    getCBDCBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, wallet]);

  // TODO: use this
  console.log(cbdcBalance, usdBalance);

  return (
    <>
      <Gnb />
      <Wrapper>
        <DashBoardWrapper>
          <DashBoardTitle>Dashboard</DashBoardTitle>
          <DashBoardCardWrapper>
            <CardPrimary
              icon={<IconTotal />}
              title="Total Balance in USD"
              contents={usdBalance}
              cardType="value"
            />
            <CardPrimary
              icon={<IconLocked />}
              title="Unlocked Balance in USD"
              contents={1234567}
              cardType="value"
            />
            <CardPrimary
              icon={<IconWithdraw />}
              title="Withdrawing Balance in USD"
              contents={123455}
              cardType="value"
            />
          </DashBoardCardWrapper>
        </DashBoardWrapper>
        <DealsWrapper>
          <Table />
        </DealsWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = tw.div`
  flex flex-col items-center gap-80 pt-60`;

const DashBoardWrapper = tw.div`
  flex flex-col w-960 gap-16
`;

const DashBoardTitle = tw.div`
  font-b-24 text-black
`;

const DashBoardCardWrapper = tw.div`
  flex gap-24
`;

const DealsWrapper = tw.div`
  flex flex-col w-960 gap-16
`;

export default MyPage;
