import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';
import { useOnClickOutside } from 'usehooks-ts';

import { useConnectWallet } from '~/api/xrpl/connect-wallet';
import { COLOR } from '~/assets/colors';
import textLogo from '~/assets/images/logo-text.png';
import { POPUP_ID } from '~/constants';
import { usePopup } from '~/hooks/pages/use-popup';
import { useUserState } from '~/states/data/user';
import { truncateAddress } from '~/utils/string';

import { ButtonPrimary } from '../buttons/button-primary';
import { IconLogOut, IconPlus } from '../icons';
import { Popup } from '../popups';
import { ConnectWallet } from './connect-wallet';

export const Gnb = () => {
  const connectedRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { disconnect } = useConnectWallet();
  const { selected } = useUserState();
  const { open, opened } = usePopup(POPUP_ID.CONNECT);

  const [dropdownOpended, setDropdownOpened] = useState(false);

  useOnClickOutside(connectedRef, () => setDropdownOpened(false));

  return (
    <>
      <Wrapper>
        <LogoWrapper onClick={() => navigate('/')}>
          <TextLogo src={textLogo} alt="text-logo" />
        </LogoWrapper>
        <HeaderWrapper>
          {selected.wallet ? (
            <>
              <Menu onClick={() => navigate('/mypage')}>My Page</Menu>
              <ConnectedWrapper
                onClick={() => setDropdownOpened(true)}
                ref={connectedRef}
                dropdownOpended={dropdownOpended}
              >
                <ConnectedAddress>{truncateAddress(selected.wallet.address)}</ConnectedAddress>

                <DropDownWrapper dropdownOpended={dropdownOpended}>
                  <FaucetButton>
                    <IconPlus width={20} height={20} color={COLOR.GRAY2} />
                    Faucet
                  </FaucetButton>
                  <DisconnectButton onClick={disconnect}>
                    <IconLogOut width={20} height={20} color={COLOR.GRAY2} />
                    Disconnect
                  </DisconnectButton>
                </DropDownWrapper>
              </ConnectedWrapper>
            </>
          ) : (
            <ButtonWrapper>
              <ButtonPrimary buttonType="medium" text="Connect Wallet" onClick={open} />
            </ButtonWrapper>
          )}
        </HeaderWrapper>
      </Wrapper>
      {opened && (
        <Popup
          type={'normal'}
          title="Connect XRP wallet"
          id={POPUP_ID.CONNECT}
          contents={<ConnectWallet />}
        />
      )}
    </>
  );
};

const Wrapper = tw.header`
  h-90 flex items-center justify-between w-full relative
  py-24 px-20
`;
const LogoWrapper = tw.div`
  flex clickable
`;
const TextLogo = tw.img`
  w-96 h-22
`;

const HeaderWrapper = tw.div`
  flex gap-40 items-center
`;

const Menu = tw.div`
  font-b-18 clickable
`;

const ButtonWrapper = tw.div`
  min-w-149
`;
interface ConnectedWrapperProps {
  dropdownOpended: boolean;
}
const ConnectedWrapper = styled.div<ConnectedWrapperProps>(({ dropdownOpended }) => [
  tw`relative flex flex-col items-center gap-12 px-24 py-10 border-solid w-148 clickable rounded-8 border-1 border-blue text-blue bg-blue/5`,
  dropdownOpended && tw`text-white bg-gray4 border-gray4 rounded-b-0`,
]);

const ConnectedAddress = tw.div``;

interface DropDownWrapperProps {
  dropdownOpended: boolean;
}
const DropDownWrapper = styled.div<DropDownWrapperProps>(({ dropdownOpended }) => [
  tw`absolute flex flex-col items-center gap-12 px-12 pt-8 pb-12 top-36 w-148 rounded-8 rounded-t-0 bg-gray4`,
  dropdownOpended ? tw`opacity-100` : tw`opacity-0 pointer-events-none `,
  dropdownOpended &&
    css`
      box-shadow: 0px 12px 32px 0px #3358ff14;
    `,
]);

const FaucetButton = tw.div`
  flex items-center h-20 gap-4 clickable text-gray2
`;

const DisconnectButton = tw.div`
  flex items-center h-20 gap-4 clickable text-gray2
`;
