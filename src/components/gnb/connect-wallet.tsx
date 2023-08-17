import { useState } from 'react';
import tw from 'twin.macro';

import { useConnectWallet } from '~/api/xrpl/connect-wallet';
import { ButtonPrimary } from '~/components/buttons/button-primary';
import { IconWallet } from '~/components/icons';
import { TextField } from '~/components/textfield/textfield';
import { POPUP_ID } from '~/constants';
import { usePopup } from '~/hooks/pages/use-popup';

export const ConnectWallet = () => {
  const { connect } = useConnectWallet();
  const { close } = usePopup(POPUP_ID.CONNECT);
  const [seed, setSeed] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);

    await connect(seed);

    setLoading(false);
    close();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeed(e.target.value);
  };

  return (
    <Wrapper>
      <TextField onChange={handleChange} placeholder="Enter your private key" />
      <ButtonWrapper>
        <ButtonPrimary
          style={{ width: '105px' }}
          text="Connect"
          isLoading={loading}
          buttonType="medium"
          onClick={handleConnect}
        />
        <CreateButtonWrapper>
          <IconWallet />
          <CreateText onClick={handleConnect}> Create a new Wallet</CreateText>
        </CreateButtonWrapper>
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex flex-col  gap-32 w-440
`;

const ButtonWrapper = tw.div`
  flex flex-col items-center gap-16 
`;

const CreateButtonWrapper = tw.div`
  flex items-center h-20 gap-4 clickable
`;

const CreateText = tw.div`
  font-r-12  text-gray3
`;
