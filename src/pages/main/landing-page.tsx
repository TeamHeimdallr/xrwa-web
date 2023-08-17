import tw from 'twin.macro';

import LogoUstb from '~/assets/images/logo-ustb.png';
import { CardDeal } from '~/components/card/card-deal';
import { CardPrimary } from '~/components/card/card-primary';
import { Gnb } from '~/components/gnb';
import { IconActive, IconLocked, IconTotal } from '~/components/icons';

const MainPage = () => {
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
              contents={1234567}
              cardType="value"
            />
            <CardPrimary
              icon={<IconTotal />}
              title="Total Principal Issued"
              contents={1234567}
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
              title="Deal Title"
              contents="Deal Contents"
              value={1234567}
              apy={5.3}
            />
            <CardDeal
              image={LogoUstb}
              title="Deal Title"
              contents="Deal Contents"
              value={1234567}
              apy={5.3}
            />
          </DealsCardWrapper>
        </DealsWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = tw.div`
  flex flex-col items-center`;

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
