import { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import tw from 'twin.macro';

import { useAccounts } from '~/api/xrpl/accounts';
import { useBalance } from '~/api/xrpl/balance';
import { useCreateUSTB } from '~/api/xrpl/ustb-create';
import { Gnb } from '~/components/gnb';

const AdminPage = () => {
  const { ustbWallet } = useAccounts();
  const { getBalance } = useBalance();
  const [value, setValue] = useState<number>(1000);
  const [info, setInfo] = useState<string>('');
  const { createUSTB } = useCreateUSTB();

  const handleGetInfo = async () => {
    if (ustbWallet) {
      const info = await getBalance(ustbWallet.address);
      setInfo(JSON.stringify(info, null, 2));
    }
  };

  return (
    <>
      <Gnb />
      <Wrapper>
        <InnerWrapper>
          <Info>{info}</Info>
          <InfoButton onClick={handleGetInfo}>Get Info</InfoButton>
        </InnerWrapper>
        <InnerWrapper>
          <NumericFormat
            allowLeadingZeros={false}
            allowNegative={false}
            placeholder={'1000'}
            thousandSeparator
            onValueChange={values => setValue(values.floatValue || 1000)}
            value={value}
          />
          <Mint onClick={() => createUSTB(value.toString())}>Mint UST</Mint>
        </InnerWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = tw.div`
  flex flex-col items-center gap-80 pt-60`;

const InnerWrapper = tw.div`
  flex flex-col items-center gap-10
`;

const Info = tw.div`
  flex w-500 whitespace-pre-line
`;

const InfoButton = tw.div`
  clickable font-sb-18
`;

const Mint = tw.div`
  clickable font-sb-18
`;

export default AdminPage;
