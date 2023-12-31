import { HtmlHTMLAttributes } from 'react';
import tw from 'twin.macro';

import { formatNumber } from '~/utils/number';

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  contents: number;
  cardType?: 'value' | 'percent';
  decimal?: number;
}

export const CardTertiary = ({ icon, title, contents, cardType, decimal, ...rest }: Props) => {
  return (
    <Wrapper {...rest}>
      <TitleWrapper>
        <IconWrapper>{icon}</IconWrapper>
        <Title>{title}</Title>
      </TitleWrapper>
      <ContentText>
        {cardType === 'value' ? '$' + formatNumber(contents, decimal ?? 2) : `${contents}%`}
      </ContentText>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex flex-col gap-20 w-full
  py-20 px-24 rounded-20
  bg-gray1
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
