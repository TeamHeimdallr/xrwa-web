import { ButtonHTMLAttributes } from 'react';
import tw from 'twin.macro';

import { TOKEN_IMAGE } from '~/constants/tokens/base';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  symbol?: string;
}

export const TokenButton = ({ symbol = 'ENA', ...rest }: Props) => {
  return (
    <Wrapper {...rest}>
      <TokenImg src={TOKEN_IMAGE[symbol].image} />
      <TextWrapper>
        <Symbol>{symbol}</Symbol>
        <FullName>{TOKEN_IMAGE[symbol].fullname}</FullName>
      </TextWrapper>
    </Wrapper>
  );
};

const Wrapper = tw.button`
  flex items-center w-440 h-56 gap-10 py-8 px-12 clickable rounded-32 
  bg-gray0 
  hover:bg-gray1
  `;

const TokenImg = tw.img`
  w-40 h-40 rounded-full
`;
const TextWrapper = tw.div`
  flex flex-col items-start
`;
const Symbol = tw.div`
  font-b-14 text-black
`;
const FullName = tw.div`
  font-r-12 text-gray3
`;
