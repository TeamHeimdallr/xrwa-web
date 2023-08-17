import tw from 'twin.macro';

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
      <button onClick={() => handleChangeCurrency('USTB')}>change to ustb</button>
      <button onClick={() => handleChangeCurrency('BSD')}>change to BSD</button>
      <button onClick={() => handleChangeCurrency('ENA')}>change to ENA</button>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex flex-col items-center w-440 gap-8
`;
