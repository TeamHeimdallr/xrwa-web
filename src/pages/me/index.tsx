import { useEffect } from 'react';
import tw, { css, styled } from 'twin.macro';

import { useGetWithdrawBalancesQuery } from '~/api/server/cbdc/users-get';
import { useBalance } from '~/api/xrpl/balance';
import { useConnectWallet } from '~/api/xrpl/connect-wallet';
import LogoBsd from '~/assets/images/logo-bahama.png';
import LogoKrw from '~/assets/images/logo-krw.png';
import LogoEna from '~/assets/images/logo-nigeria.png';
import { CardPrimary } from '~/components/card/card-primary';
import { CardPrimaryWide } from '~/components/card/card-primary-wide';
import { Gnb } from '~/components/gnb';
import { IconTotal, IconUstb, IconWithdraw } from '~/components/icons';
import Table from '~/components/table';
import { useXrplStore } from '~/states/data/xrpl';
import { getCurrencyPriceUSD } from '~/utils/currency';
import { formatNumberWithComma } from '~/utils/number';

const MyPage = () => {
  const { isConnected } = useXrplStore();
  const { wallet } = useConnectWallet();
  const { getCBDCBalance, getUstBalance, cbdcBalance, usdBalance, ustBalance } = useBalance();

  const { data } = useGetWithdrawBalancesQuery(
    { account: wallet?.address ?? '' },
    { enabled: !!wallet?.address }
  );

  const withdrawingsUsd =
    data?.data.withdrawings?.reduce(
      (acc, cur) => acc + getCurrencyPriceUSD(cur.currency) * cur.amount,
      0
    ) ?? 0;

  useEffect(() => {
    if (!isConnected || !wallet) return;

    getCBDCBalance();
    getUstBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, wallet]);

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
                <BalanceAmount>{formatNumberWithComma(cbdcBalance['BSD'])}</BalanceAmount>
                <BalanceTitle>BSD</BalanceTitle>
              </BalanceTextWrapper>
            </BalanceCard>
            <Divider />
            <BalanceCard>
              <BalanceImg src={LogoEna} />
              <BalanceTextWrapper>
                <BalanceAmount>{formatNumberWithComma(cbdcBalance['ENA'])}</BalanceAmount>
                <BalanceTitle>ENA</BalanceTitle>
              </BalanceTextWrapper>
            </BalanceCard>
            <Divider />
            <BalanceCard>
              <BalanceImg src={LogoKrw} />
              <BalanceTextWrapper>
                <BalanceAmount>{formatNumberWithComma(cbdcBalance['KRW'])}</BalanceAmount>
                <BalanceTitle>KRW</BalanceTitle>
              </BalanceTextWrapper>
            </BalanceCard>
          </BalanceCardWrapper>
        </DashBoardWrapper>

        <DashBoardWrapper>
          <DashBoardTitle>Portfolio</DashBoardTitle>
          <DashBoardCardWrapper>
            <CardPrimary
              style={{ width: '304px' }}
              icon={<IconTotal />}
              title="Total Balance in USD"
              contents={usdBalance}
              cardType="value"
            />
            <CardPrimaryWide
              data={[
                {
                  icon: <IconUstb width={20} height={20} />,
                  title: 'Total Balance in UST',
                  contents: ustBalance,
                },
                {
                  icon: <IconWithdraw />,
                  title: 'Withdrawing Balance in USD',
                  contents: withdrawingsUsd,
                },
              ]}
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
  tw`flex justify-between gap-24 px-24 py-20 bg-white rounded-20 h-134`,
  css`
    box-shadow: 0px 12px 32px 0px #3358ff14;
  `,
]);

const BalanceCard = tw.div`
  flex flex-col flex-1 gap-8
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
