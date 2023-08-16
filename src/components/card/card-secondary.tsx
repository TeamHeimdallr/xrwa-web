import { css } from '@emotion/react';
import tw, { styled } from 'twin.macro';

import { formatNumberWithCommas } from '~/utils/string';

interface Props {
  icon?: React.ReactNode;
  title: string;
  content: string;
  cardType?: 'value' | 'percent';
}

export const CardSecondary = ({ icon, title, content, cardType, ...rest }: Props) => {
  return (
    <Wrapper {...rest}>
      <TitleWrapper>
        <IconWrapper>{icon}</IconWrapper>
        <Title>{title}</Title>
      </TitleWrapper>
      <ContentText>
        {cardType == 'value' ? '$' + formatNumberWithCommas(content) : `${content}%`}
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
