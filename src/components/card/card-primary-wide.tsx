import { css } from '@emotion/react';
import { HtmlHTMLAttributes } from 'react';
import tw, { styled } from 'twin.macro';

import { formatNumber } from '~/utils/number';

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
  data: {
    icon?: React.ReactNode;
    title: string;
    contents: number;
  }[];
}

export const CardPrimaryWide = ({ data, ...rest }: Props) => {
  const { icon, title, contents } = data[0];
  const { icon: icon2, title: title2, contents: contents2 } = data[1];

  return (
    <Wrapper {...rest}>
      <InnerWrapper>
        <ContentWrapper>
          <TitleWrapper>
            <IconWrapperFull>{icon}</IconWrapperFull>
            <Title>{title}</Title>
          </TitleWrapper>
          <ContentText>{'$' + formatNumber(contents, 2)}</ContentText>
        </ContentWrapper>
        <Divider />
        <ContentWrapper>
          <TitleWrapper>
            <IconWrapper>{icon2}</IconWrapper>
            <Title>{title2}</Title>
          </TitleWrapper>
          <ContentText>{'$' + formatNumber(contents2, 2)}</ContentText>
        </ContentWrapper>
      </InnerWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div(() => [
  tw`flex flex-col w-full gap-20 px-24 py-20 bg-white rounded-20`,

  css`
    box-shadow: 0px 12px 32px 0px #3358ff14;
  `,
]);

const InnerWrapper = tw.div`
  flex gap-24 h-full
`;

const ContentWrapper = tw.div`
  flex flex-col justify-between flex-1
`;

const Divider = tw.div`
  w-1 h-full bg-gray1
`;

const TitleWrapper = tw.div`
  flex items-center gap-8
`;

const IconWrapperFull = tw.div`
  flex-center
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
