import { css } from '@emotion/react';
import tw, { styled } from 'twin.macro';

import LogoUstb from '~/assets/images/logo-ustb.png';
import { ButtonPrimary } from '~/components/buttons/button-primary';
import { CardDeal } from '~/components/card/card-deal';
import { CardPrimary } from '~/components/card/card-primary';
import { CardTertiary } from '~/components/card/card-tertiary';
import { Gnb } from '~/components/gnb';
import {
  IconActive,
  IconArrowDown,
  IconLocked,
  IconPercentage,
  IconPrice,
  IconTotal,
} from '~/components/icons';
import { TextFieldTrade } from '~/components/text-field/text-field-trade';
import { Toggle } from '~/components/toggle';

const TransferPage = () => {
  return (
    <>
      <Gnb />
      <Wrapper>
        <LeftContainer>
          <TransferContents>
            <TransferImage src={LogoUstb} />
            <TransferText>
              <TransferTitle>U.S. Short-term Treasury Bill</TransferTitle>
              <TransferDesc>
                The U.S. Short-term Treasury Bill ($USTB) is a token underpinned by a prospectus and
                backed by U.S. Treasury Bills. These are government bonds that don't carry regular
                interest payments and are issued at a discounted rate, only to be redeemed at their
                full value upon maturity. Given the backing of the U.S. government, they're viewed
                as the "risk-free" standard and rank among the most secure investments globally.
              </TransferDesc>
            </TransferText>
          </TransferContents>
          <TransferCardWrapper>
            <CardTertiary
              title="Total Value Locked"
              icon={<IconLocked />}
              contents={100000}
              cardType="value"
            />
            <CardTertiary
              title="Price Per USTB"
              icon={<IconPrice />}
              contents={100000}
              cardType="value"
            />
            <CardTertiary title="APY" icon={<IconPercentage />} contents={5.3} cardType="percent" />
          </TransferCardWrapper>
        </LeftContainer>
        <RightContainer>
          <Toggle
            left={{
              id: 'deposit',
              text: <ToggleText>Deposit</ToggleText>,
              handler: id => select(id),
            }}
            right={{
              id: 'withdraw',
              text: <ToggleText>Withdraw</ToggleText>,
              handler: id => select(id),
            }}
          />
          <InputWrapper>
            <TextFieldTrade
              amount="100000"
              value={100000}
              placeholder="0.0"
              handleChange={e => console.log(e)}
            />
            <TextFieldTrade
              amount="100000"
              value={100000}
              placeholder="0.0"
              handleChange={e => console.log(e)}
            />
            <IconWrapper>
              <IconArrowDown />
            </IconWrapper>
            <RateWrapper>
              <RateText>Rate</RateText>
              <RateValue>1USTB = 1USTB</RateValue>
            </RateWrapper>
          </InputWrapper>
          <ButtonPrimary text="Deposit" isLoading={false} buttonType="large" />
        </RightContainer>
      </Wrapper>
    </>
  );
};

const Wrapper = tw.div`
  flex justify-center items-center
`;

const LeftContainer = tw.div`
    flex flex-col w-444 gap-40 m-24
`;

const TransferContents = tw.div`
    flex flex-col gap-16
`;

const TransferImage = styled.img(() => [
  tw`w-80 h-80 rounded-50`,
  css`
    box-shadow: 0px 8px 24px 0px #3358ff33;
  `,
]);

const TransferText = tw.div`
    flex flex-col gap-8
`;

const TransferTitle = tw.div`
    font-b-28 text-black
`;

const TransferDesc = tw.div`
    font-r-16 text-gray3
`;

const TransferCardWrapper = tw.div`
    grid grid-cols-2 gap-16
`;

const RightContainer = styled.div(() => [
  tw`
      flex flex-col bg-white rounded-20
      py-20 px-24 gap-24 m-24
      `,
  css`
    box-shadow: 0px 12px 32px 0px #3358ff14;
  `,
]);

const ToggleText = tw.div`
    font-b-18 rounded-40
`;

const InputWrapper = tw.div`
    flex flex-col gap-16 relative
`;

const IconWrapper = tw.div`
   absolute absolute-center flex-center w-32 h-32 rounded-16 border-solid border-gray1 bg-white
`;

const RateWrapper = tw.div`
    flex gap-8 justify-end
`;

const RateText = tw.div`
    font-r-14 text-gray3
`;

const RateValue = tw.div`
    font-r-14 text-gray4
`;

export default TransferPage;
