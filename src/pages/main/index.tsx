import { useEffect, useState } from 'react';
import tw from 'twin.macro';

import { useBalance } from '~/api/xrpl/balance';
import LogoBitcoin from '~/assets/images/logo-bitcoin.png';
import LogoUstb from '~/assets/images/logo-ustb.png';
import { CardDeal } from '~/components/card/card-deal';
import { CardPrimary } from '~/components/card/card-primary';
import { Gnb } from '~/components/gnb';
import { IconActive, IconLocked, IconTotal } from '~/components/icons';
import { portfolioData } from '~/components/portfolio/data/portfolio-data';
import { weightedAverage } from '~/utils/number';

const MainPage = () => {
  const [cbdcBalance, setCbdcBalance] = useState(0);
  const { getCBDCBalanceForUstbWallet } = useBalance();

  useEffect(() => {
    getCBDCBalanceForUstbWallet().then(res => setCbdcBalance(res ?? 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Gnb />
      <Wrapper>
        <DashBoardWrapper>
          <DashBoardTitle>Dashboard</DashBoardTitle>
          <DashBoardCardWrapper>
            <CardPrimary
              icon={<IconLocked />}
              title="Total Value Locked"
              contents={
                cbdcBalance +
                portfolioData.reduce(
                  (acc, cur) => acc + Number(cur.marketValue.replace(',', '')),
                  0
                )
              }
              cardType="value"
            />
            <CardPrimary
              icon={<IconTotal />}
              title="Total Principal Issued"
              contents={portfolioData.reduce(
                (acc, cur) => acc + Number(cur.principalAmount.replace(',', '')),
                0
              )}
              cardType="value"
            />
            <CardPrimary icon={<IconActive />} title="Number of Active Deals" contents={1} />
          </DashBoardCardWrapper>
        </DashBoardWrapper>
        <DealsWrapper>
          <DealsTitle>Deals</DealsTitle>
          <DealsCardWrapper>
            <CardDeal
              image={LogoUstb}
              title="U.S. Short-term Treasury Bill"
              contents="The U.S. Short-term Treasury Bill ($UST) is a token underpinned by a prospectus and backed by U.S. Treasury Bills."
              value={
                cbdcBalance +
                portfolioData.reduce(
                  (acc, cur) => acc + Number(cur.marketValue.replace(',', '')),
                  0
                )
              }
              estimatedYield={Number(
                weightedAverage(
                  portfolioData.map(p => {
                    return {
                      weight: Number(p.principalAmount.replace(',', '')),
                      value: Number(p.ytm.replace('%', '')),
                    };
                  })
                ).toFixed(3)
              )}
            />
            <CardDeal
              image={LogoBitcoin}
              title="BTC ETF"
              contents="A Bitcoin ETF is and exchange-traded fund that invests primarily in assets related to the original cryptocurrency, Bitcoin."
              value={10584.61}
              estimatedYield={21.3}
              disabled={true}
            />
          </DealsCardWrapper>
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

const DealsTitle = tw.div`
  font-b-24 text-black
`;

const DealsCardWrapper = tw.div`
  flex gap-24
`;

export default MainPage;
