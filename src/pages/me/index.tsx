import { useEffect } from 'react';
import tw, { css, styled } from 'twin.macro';

import { useBalance } from '~/api/xrpl/balance';
import { useConnectWallet } from '~/api/xrpl/connect-wallet';
import LogoBsd from '~/assets/images/logo-bahama.png';
import LogoKrw from '~/assets/images/logo-krw.png';
import LogoEna from '~/assets/images/logo-nigeria.png';
import { CardPrimary } from '~/components/card/card-primary';
import { Gnb } from '~/components/gnb';
import { IconLocked, IconTotal, IconWithdraw } from '~/components/icons';
import Table from '~/components/table';
import { useXrplStore } from '~/states/data/xrpl';
import { formatNumberWithComma } from '~/utils/number';

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
          <DashBoardTitle>Balance</DashBoardTitle>
          <BalanceCardWrapper>
            <BalanceCard>
              <BalanceImg src={LogoBsd} />
              <BalanceTextWrapper>
                <BalanceAmount>{formatNumberWithComma(999999999999)}</BalanceAmount>
                <BalanceTitle>BSD</BalanceTitle>
              </BalanceTextWrapper>
            </BalanceCard>
            <Divider />
            <BalanceCard>
              <BalanceImg src={LogoEna} />
              <BalanceTextWrapper>
                <BalanceAmount>{formatNumberWithComma(999999999999)}</BalanceAmount>
                <BalanceTitle>ENA</BalanceTitle>
              </BalanceTextWrapper>
            </BalanceCard>
            <Divider />
            <BalanceCard>
              <BalanceImg src={LogoKrw} />
              <BalanceTextWrapper>
                <BalanceAmount>{formatNumberWithComma(999999999999)}</BalanceAmount>
                <BalanceTitle>KRW</BalanceTitle>
              </BalanceTextWrapper>
            </BalanceCard>
          </BalanceCardWrapper>
        </DashBoardWrapper>

        <DashBoardWrapper>
          <DashBoardTitle>Portfolio</DashBoardTitle>
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

const BalanceCardWrapper = styled.div(() => [
  tw`
  flex py-20 px-24 rounded-20 h-134 gap-24
  justify-between
`,
  css`
    box-shadow: 0px 12px 32px 0px #3358ff14;
  `,
]);

const BalanceCard = tw.div`
  gap-8
`;

const BalanceImg = tw.img`
  w-32 h-32 rounded-20
`;

const BalanceTextWrapper = tw.div`
  flex flex-col gap-2
`;

const BalanceAmount = tw.div`
  font-m-22 text-black
`;

const BalanceTitle = tw.div`
  font-r-16 text-black
`;

const Divider = tw.div`
  h-full w-1 bg-gray1
`;

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
