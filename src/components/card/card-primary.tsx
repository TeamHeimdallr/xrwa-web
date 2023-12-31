import { css } from '@emotion/react';
import { HTMLAttributes } from 'react';
import tw, { styled } from 'twin.macro';

import { formatNumber } from '~/utils/number';

interface Props extends HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  contents: number;
  cardType?: 'value' | undefined;
}

export const CardPrimary = ({ icon, title, contents, cardType, ...rest }: Props) => {
  return (
    <Wrapper {...rest}>
      <TitleWrapper>
        <IconWrapper>{icon}</IconWrapper>
        <Title>{title}</Title>
      </TitleWrapper>
      <ContentText>
        {cardType === 'value' ? '$' + formatNumber(contents, 2) : `${contents}`}
      </ContentText>
    </Wrapper>
  );
};

const Wrapper = styled.div(() => [
  tw`flex flex-col flex-grow flex-shrink-0 gap-20 px-24 py-20 bg-white rounded-20`,

  css`
    box-shadow: 0px 12px 32px 0px #3358ff14;
  `,
]);

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
  font-m-32 text-black
`;
