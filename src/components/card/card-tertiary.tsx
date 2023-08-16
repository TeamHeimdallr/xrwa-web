import tw from 'twin.macro';

import { formatNumberWithCommas } from '~/utils/string';

interface Props {
  icon?: React.ReactNode;
  title: string;
  content: string;
  cardType?: 'value' | 'percent';
}

export const CardTertiary = ({ icon, title, content, cardType, ...rest }: Props) => {
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
