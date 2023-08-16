import tw from 'twin.macro';

import { CardSecondary } from './card-secondary';

interface Props {
  icon?: React.ReactNode;
  image?: string;
  title: string;
  content: string;
  cardType?: 'value' | 'percent';
}

export const CardDeal = ({ icon, image, title, content, cardType, ...rest }: Props) => {
  return (
    <Wrapper {...rest}>
      <ContentWrapper>
        <DealImg src={image} />
        <DealTextWrapper>
          <DealTitle>Deal</DealTitle>
          <DealContent>
            Get 10% off on your first order Get 10% off on your first order Get 10% off on your
            first order{' '}
          </DealContent>
        </DealTextWrapper>
      </ContentWrapper>
      <CardWrapper>
        <CardSecondary icon={icon} content={'1234567'} cardType="value" {...rest} />
        <CardSecondary icon={icon} content={'5.3'} cardType="percent" {...rest} />
      </CardWrapper>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex flex-col gap-20 w-full
  py-20 px-24 rounded-20
  bg-white
  `;

const ContentWrapper = tw.div`
 flex flex-col gap-12
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
