import tw from 'twin.macro';

import { POPUP_ID } from '~/constants';
import { usePopup } from '~/hooks/pages/use-popup';
import { useXrplStore } from '~/states/data/xrpl';

import { ButtonPrimary } from '../buttons/button-primary';
import { IconWallet } from '../icons';
import { TextField } from '../text-field/text-field';

export const ConnectWallet = () => {
  const { isConnected, setConnection } = useXrplStore();
  const { close } = usePopup(POPUP_ID.CONNECT);

  const handleConnect = () => {
    setConnection(true);
    close();
  };

  return (
    <Wrapper>
      <TextField placeholder="Enter your private key" />
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
