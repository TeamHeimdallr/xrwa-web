import { useRef } from 'react';
import tw from 'twin.macro';

import { useSelectedTokenState } from '~/states/data/trade';

export const ChangeCurrency = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { selected: currencySelected, select: currencySelect } = useSelectedTokenState();

  return (
    <Wrapper>
      <LottieWrapper ref={containerRef} />
      <Title>Your NFT has been minted!</Title>
      <button onClick={() => currencySelect('USTB')}>change to ustb</button>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex flex-col items-center gap-16
`;

const LottieWrapper = tw.div`
  w-100 h-100
`;

const Title = tw.div`
  text-center 
`;
