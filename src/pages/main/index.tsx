import { useState } from 'react';
import tw from 'twin.macro';

import { CardDeal } from '~/components/card/card-deal';
import { CardPrimary } from '~/components/card/card-primary';
import { IconActive, IconLocked, IconTotal } from '~/components/icons';

const MainPage = () => {
  return (
    <Wrapper>
      <DashBoardWrapper>
        <DashBoardTitle>Dashboard</DashBoardTitle>
        <DashBoardCardWrapper>
          <CardPrimary
            icon={<IconLocked />}
            title="Total Value Locked"
            content="1234567"
            cardType="value"
          />
          <CardPrimary
            icon={<IconTotal />}
            title="Total Principal Issued"
            content="1234567"
            cardType="value"
          />
          <CardPrimary icon={<IconActive />} title="Number of Active Deals" content="1" />
        </DashBoardCardWrapper>
      </DashBoardWrapper>
      <DealsWrapper>
        <DealsTitle>Deals</DealsTitle>
        <DealsCardWrapper>
          <CardDeal
            image="https://via.placeholder.com/150"
            title="Deal Title"
            contents="Deal Contents"
            value="1234567"
            apy="5.3"
          />
          <CardDeal
            image="https://via.placeholder.com/150"
            title="Deal Title"
            contents="Deal Contents"
            value="1234567"
            apy="5.3"
          />
        </DealsCardWrapper>
      </DealsWrapper>
    </Wrapper>
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
