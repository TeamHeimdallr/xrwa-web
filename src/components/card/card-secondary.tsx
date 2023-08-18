import { HtmlHTMLAttributes } from 'react';
import tw from 'twin.macro';

import { formatNumber } from '~/utils/number';

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  contents: number;
  cardType?: 'value' | 'percent';
}

export const CardSecondary = ({ icon, title, contents, cardType, ...rest }: Props) => {
  return (
    <Wrapper {...rest}>
      <TitleWrapper>
        <IconWrapper>{icon}</IconWrapper>
        <Title>{title}</Title>
      </TitleWrapper>
      <ContentText>
        {cardType === 'value' ? '$' + formatNumber(contents, 2) : `${contents}%`}
      </ContentText>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex flex-col gap-16 w-full
  py-12 px-16 rounded-8
  bg-gray0
  `;

const TitleWrapper = tw.div`
  flex items-center gap-8
`;

const IconWrapper = tw.div`
  flex-center w-20 h-20 rounded-4 p-2 gap-10
  bg-blue
`;

const Title = tw.div`
  font-b-14 text-gray4
`;

const ContentText = tw.div`
  font-m-24 text-black
`;
