import tw from 'twin.macro';

import { CardPrimary } from '~/components/card/card-primary';
import { Gnb } from '~/components/gnb';
import { IconLocked, IconTotal, IconWithdraw } from '~/components/icons';
import Table from '~/components/table';

const MyPage = () => {
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
              contents={1234567}
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
  flex flex-col items-center gap-80`;

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
