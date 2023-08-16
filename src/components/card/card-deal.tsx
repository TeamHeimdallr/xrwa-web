import { useRef } from 'react';
import tw, { css, styled } from 'twin.macro';
import { useHover } from 'usehooks-ts';

import { COLOR } from '~/assets/colors';

import { IconLocked, IconNext, IconPercentage } from '../icons';
import { CardSecondary } from './card-secondary';
interface Props {
  image?: string;
  title: string;
  contents?: string;
  value: string;
  apy: string;
  cardType?: 'value' | 'percent';
}

export const CardDeal = ({ image, title, contents, value, apy, ...rest }: Props) => {
  const hoverRef = useRef<HTMLDivElement>(null);
  const isHover = useHover(hoverRef);
  return (
    <Wrapper {...rest} ref={hoverRef}>
      <ContentWrapper>
        <ImgWrapper>
          <DealImg src={image} />
          <IconNext
            color={isHover ? COLOR.BLUE : 'white'}
            style={{
              cursor: isHover ? 'pointer' : 'auto',
            }}
            onClick={() => isHover && console.log('hi')}
          />
        </ImgWrapper>
        <DealTextWrapper>
          <DealTitle>{title}</DealTitle>
          <DealContent>{contents}</DealContent>
        </DealTextWrapper>
      </ContentWrapper>
      <CardWrapper>
        <CardSecondary
          icon={<IconLocked />}
          title="Total Value Locked"
          content={value}
          cardType="value"
          {...rest}
        />
        <CardSecondary
          icon={<IconPercentage />}
          title="APY"
          content={apy}
          cardType="percent"
          {...rest}
        />
      </CardWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div(() => [
  tw`
  flex flex-col gap-20 w-468
  py-20 px-24 rounded-20
  bg-white
  `,
  css`
    :hover {
      box-shadow: 0px 20px 40px 0px #3358ff4d;
    }
  `,
]);

const ContentWrapper = tw.div`
 flex flex-col gap-12 
`;

const ImgWrapper = tw.div`  
  flex justify-between items-center
`;
const DealImg = tw.img`
  w-48 h-48 rounded-50
`;

const DealTextWrapper = tw.div`
  flex flex-col gap-4
`;

const DealTitle = tw.div`
  font-b-18 text-black
`;

const DealContent = tw.div`
  font-r-14 text-gray3
`;

const CardWrapper = tw.div`
  flex gap-12
`;
