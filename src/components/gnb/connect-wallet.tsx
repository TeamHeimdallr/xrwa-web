import { useState } from 'react';
import tw from 'twin.macro';

import { useConnectWallet } from '~/api/xrpl/connect-wallet';
import { POPUP_ID } from '~/constants';
import { usePopup } from '~/hooks/pages/use-popup';

import { ButtonPrimary } from '../buttons/button-primary';
import { IconWallet } from '../icons';
import { TextField } from '../text-field/text-field';

export const ConnectWallet = () => {
  const { connect } = useConnectWallet();
  const { close } = usePopup(POPUP_ID.CONNECT);
  const [privateKey, setPrivateKey] = useState('');

  const handleConnect = async () => {
    try {
      await connect(privateKey);
      close();
    } catch (e) {
      alert(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrivateKey(e.target.value);
  };

  return (
    <Wrapper>
      <TextField onChange={handleChange} placeholder="Enter your private key" />
      <ButtonWrapper>
        <ButtonPrimary
          style={{
            width: '105px',
          }}
          text="Connect"
          isLoading={false}
          buttonType="medium"
          onClick={handleConnect}
        />
        <CreateButtonWrapper>
          <IconWallet />
          <CreateText> Create a new Wallet</CreateText>
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
