import tw from 'twin.macro';

import { TokenButton } from '~/components/buttons/button-token';
import { POPUP_ID } from '~/constants';
import { usePopup } from '~/hooks/pages/use-popup';
import { useSelectedTokenState } from '~/states/data/trade';

export const ChangeCurrency = () => {
  const { select: currencySelect } = useSelectedTokenState();
  const { close: currencyClose } = usePopup(POPUP_ID.CURRENCY);

  const handleChangeCurrency = (currency: string) => {
    currencyClose();
    currencySelect(currency);
  };

  return (
    <Wrapper>
      <TokenButton onClick={() => handleChangeCurrency('BSD')} symbol="BSD" />
      <TokenButton onClick={() => handleChangeCurrency('ENA')} symbol="ENA" />
      <TokenButton onClick={() => handleChangeCurrency('KRW')} symbol="KRW" />
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex flex-col items-center w-440 gap-8
`;
