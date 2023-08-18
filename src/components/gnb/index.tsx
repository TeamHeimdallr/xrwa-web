import { css } from '@emotion/react';
import styled from '@emotion/styled';
import lottie from 'lottie-web/build/player/lottie_light';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw from 'twin.macro';
import { useOnClickOutside } from 'usehooks-ts';

import { useFaucetCBDC } from '~/api/xrpl/cbdc-faucet';
import { useConnectWallet } from '~/api/xrpl/connect-wallet';
import { COLOR } from '~/assets/colors';
import textLogo from '~/assets/images/logo-text.png';
import imgLogo from '~/assets/images/logo-img.png';
import loading from '~/assets/lottie/loading-dot-black.json';
import { POPUP_ID } from '~/constants';
import { usePopup } from '~/hooks/pages/use-popup';
import { useAccountStore } from '~/states/data/user-account';
import { useXrplStore } from '~/states/data/xrpl';
import { truncateAddress } from '~/utils/string';

import { ButtonPrimary } from '../buttons/button-primary';
import { IconLogOut, IconPlus } from '../icons';
import { Popup } from '../popups';
import { ConnectWallet } from './connect-wallet';

export const Gnb = () => {
  const connectedRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { isConnected } = useXrplStore();
  const { faucetCBDC } = useFaucetCBDC();
  const { wallet, disconnect } = useConnectWallet();
  const { account } = useAccountStore();
  const { open, opened } = usePopup(POPUP_ID.CONNECT);

  const [dropdownOpended, setDropdownOpened] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useOnClickOutside(connectedRef, () => setDropdownOpened(false));

  const faucet = async () => {
    if (!isConnected || !wallet) return;

    setLoading(true);

    const promises = [faucetCBDC('BSD'), faucetCBDC('ENA'), faucetCBDC('KRW')];
    await Promise.all(promises);

    setLoading(false);
  };

  const openDropdown = () => {
    if (isLoading) return;

    setDropdownOpened(true);
  };

  useEffect(() => {
    if (account.wallet || isLoading) setDropdownOpened(false);
  }, [account.wallet, isLoading]);

  useEffect(() => {
    if (!lottieRef.current || !isLoading) return;

    lottie.loadAnimation({
      container: lottieRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: loading,
    });

    return () => {
      lottie.destroy();
    };
  }, [lottieRef, isLoading, account.wallet]);

  return (
    <>
      <Wrapper>
        <LogoWrapper onClick={() => navigate('/')}>
          <ImgLogo src={imgLogo} alt="img-logo" />
          <TextLogo src={textLogo} alt="text-logo" />
        </LogoWrapper>
        <HeaderWrapper>
          {account.wallet ? (
            <>
              <Menu onClick={() => navigate('/me')}>My Page</Menu>
              <ConnectedWrapper
                onClick={openDropdown}
                ref={connectedRef}
                dropdownOpended={dropdownOpended}
              >
                <ConnectedAddress>
                  {!isLoading && truncateAddress(account.wallet.address)}
                  <LottieWrapper ref={lottieRef} />
                </ConnectedAddress>

                <DropDownWrapper dropdownOpended={dropdownOpended}>
                  <FaucetButton onClick={faucet}>
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
  flex clickable items-center gap-12
`;
const TextLogo = tw.img`
  w-96 h-22
`;
const ImgLogo = tw.img`
  w-40 h-40
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
  tw`relative flex flex-col gap-12 px-24 py-10 border-solid flex-center h-42 w-148 clickable rounded-8 border-1 border-blue text-blue bg-blue/5`,
  dropdownOpended && tw`text-white bg-gray4 border-gray4 rounded-b-0`,
]);

const ConnectedAddress = tw.div``;
const LottieWrapper = tw.div`
  w-full h-full flex-center absolute absolute-center
`;

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
