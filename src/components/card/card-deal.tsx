import { HtmlHTMLAttributes, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import tw, { css, styled } from 'twin.macro';
import { useHover } from 'usehooks-ts';

import { COLOR } from '~/assets/colors';

import { IconLocked, IconNext, IconPercentage } from '../icons';
import { CardSecondary } from './card-secondary';
interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
  image?: string;
  title: string;
  contents?: string;
  value: number;
  estimatedYield: number;
  disabled?: boolean;
}

export const CardDeal = ({
  image,
  title,
  contents,
  value,
  estimatedYield,
  disabled,
  ...rest
}: Props) => {
  const hoverRef = useRef<HTMLDivElement>(null);
  const isHover = useHover(hoverRef);
  const navigate = useNavigate();

  return (
    <Wrapper ref={hoverRef} disabled={disabled} onClick={() => navigate('/trade')} {...rest}>
      <ContentWrapper>
        <ImgWrapper>
          <DealImg src={image} />
          <IconNext color={isHover ? COLOR.BLUE : 'white'} />
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
          contents={value}
          cardType="value"
          {...rest}
        />
        <CardSecondary
          icon={<IconPercentage />}
          title="Estimated Yield"
          contents={estimatedYield}
          cardType="percent"
          {...rest}
        />
      </CardWrapper>
    </Wrapper>
  );
};

interface WrapperProps {
  disabled?: boolean | undefined;
}

const Wrapper = styled.div<WrapperProps>(({ disabled }) => [
  tw`flex flex-col gap-20 px-24 py-20 bg-white w-468 rounded-20 clickable`,
  css`
    box-shadow: 0px 12px 32px 0px rgba(51, 88, 255, 0.08);
    :hover {
      box-shadow: 0px 20px 40px 0px #3358ff4d;
    }
  `,
  disabled && tw`opacity-40`,
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
