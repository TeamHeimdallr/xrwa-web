import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import tw from 'twin.macro';
import { useOnClickOutside } from 'usehooks-ts';

import { COLOR } from '~/assets/colors';
import textLogo from '~/assets/images/logo-text.png';
import { useMediaQuery } from '~/hooks/pages/use-media-query';

import { ButtonPrimary } from '../buttons/button-primary';
import { IconLogOut } from '../icons';

export const Gnb = () => {
  const { md } = useMediaQuery();

  const [dropdownOpended, setDropdownOpened] = useState(false);
  const [_showMenu, setShowMenu] = useState(false);

  const [isConnected, setIsConnected] = useState(false);

  const connectedRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(connectedRef, () => setDropdownOpened(false));

  const truncatedAddress = '0x123...456';

  useEffect(() => {
    if (md) {
      setShowMenu(false);
    }
  }, [md]);

  return (
    <Wrapper>
      <LogoWrapper>
        <TextLogo src={textLogo} alt="text-logo" />
      </LogoWrapper>
      <HeaderWrapper>
        {isConnected ? (
          <>
            <Menu>My Page</Menu>
            <ConnectedWrapper
              onClick={() => setDropdownOpened(true)}
              ref={connectedRef}
              dropdownOpended={dropdownOpended}
            >
              <ConnectedAddress>{truncatedAddress}</ConnectedAddress>

              <DropDownWrapper dropdownOpended={dropdownOpended}>
                <BalanceWrapper>
                  <Balance>12312314</Balance>
                  <BalanceUnit>ETH</BalanceUnit>
                </BalanceWrapper>
                <DisconnectButton onClick={() => setIsConnected(!isConnected)}>
                  <IconLogOut width={16} height={16} color={COLOR.GRAY2} />
                  Disconnect
                </DisconnectButton>
              </DropDownWrapper>
            </ConnectedWrapper>
          </>
        ) : (
          <ButtonWrapper>
            <ButtonPrimary
              buttonType="medium"
              text="Connect Wallet"
              onClick={() => setIsConnected(!isConnected)}
            />
          </ButtonWrapper>
        )}
      </HeaderWrapper>
    </Wrapper>
  );
};

const Wrapper = tw.header`
  flex items-center justify-between w-full relative
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
 font-b-18
`;

const ButtonWrapper = tw.div`
  min-w-149
`;
interface ConnectedWrapperProps {
  dropdownOpended: boolean;
}
const ConnectedWrapper = styled.div<ConnectedWrapperProps>(({ dropdownOpended }) => [
  tw`
  relative w-148 clickable
  flex flex-col items-center
  py-10 px-24 gap-12
  rounded-8 border-solid border-1 border-blue
  text-blue
`,
  dropdownOpended &&
    tw`
  bg-gray4 text-white border-none rounded-b-0`,
]);

const ConnectedAddress = tw.div`
  
`;

interface DropDownWrapperProps {
  dropdownOpended: boolean;
}
const DropDownWrapper = styled.div<DropDownWrapperProps>(({ dropdownOpended }) => [
  tw`
   absolute top-36 w-148
   flex flex-col items-center
   py-8 px-12 gap-12
   rounded-8
   rounded-t-0
   bg-gray4
`,
  dropdownOpended ? tw`opacity-100` : tw`opacity-0 pointer-events-none `,
]);

const BalanceWrapper = tw.div`
  flex items-center justify-between
  w-full
  gap-4
  bg-none
 
`;

const Balance = tw.div`
  font-r-12 text-white
`;

const BalanceUnit = tw.div`
  font-r-12 text-gray2
`;

const DisconnectButton = styled.div(() => [
  tw`
   flex items-center gap-4 clickable
   h-20 text-gray2 hover:(text-gray5)
`,
  css`
    &:hover {
      svg {
        path {
          fill: ${COLOR.GRAY5};
        }
      }
    }
  `,
]);
