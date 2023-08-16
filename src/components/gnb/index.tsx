import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [showMenu, setShowMenu] = useState(false);

  const connectedRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(connectedRef, () => setDropdownOpened(false));

  const isConnected = true;
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
            <ConnectedWrapper
              onClick={() => setDropdownOpened(prev => !prev)}
              ref={connectedRef}
              dropdownOpended={dropdownOpended}
            >
              <ConnectedAddress>{truncatedAddress}</ConnectedAddress>

              <DropDownWrapper dropdownOpended={dropdownOpended}>
                <Divider />
                <DisconnectButton onClick={() => console.log('disconnect')}>
                  <IconLogOut width={16} height={16} color={COLOR.GRAY4} />
                  Disconnect
                </DisconnectButton>
              </DropDownWrapper>
            </ConnectedWrapper>
          </>
        ) : (
          <ButtonWrapper>
            <ButtonPrimary buttonType="medium" text="Connect Wallet" />
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

const MenuWrapper = tw.div`
 flex items-center h-44
 flex gap-8
`;
const MenuText = tw.div`
  flex h-40 py-10 px-20 clickable rounded-20
  hover:(bg-blue)
`;
const HeaderWrapper = tw.div`
  flex items-start gap-24
`;

const ButtonWrapper = tw.div`
  min-w-124
  md:(min-w-147)
`;
interface ConnectedWrapperProps {
  dropdownOpended: boolean;
}
const ConnectedWrapper = styled.div<ConnectedWrapperProps>(({ dropdownOpended }) => [
  tw`
  relative w-131 clickable
  flex flex-col items-center
  py-12 px-20 gap-12
  rounded-8 border-solid border-1 border-gray2
`,
  dropdownOpended && tw`bg-white border-b-white rounded-b-0`,
]);

const ConnectedAddress = tw.div`
  
`;

interface DropDownWrapperProps {
  dropdownOpended: boolean;
}
const DropDownWrapper = styled.div<DropDownWrapperProps>(({ dropdownOpended }) => [
  tw`
   absolute top-42 w-131 
   flex flex-col items-center
   rounded-8 border-solid border-1 border-gray2
   border-t-white rounded-t-0

`,
  //  transition-dropdown
  dropdownOpended ? tw`opacity-100` : tw`opacity-0 pointer-events-none `,
]);

const Divider = tw.div`
   w-119 h-1 bg-gray1
`;
const DisconnectButton = styled.div(() => [
  tw`
   flex items-center justify-center gap-4 clickable
   h-40  text-gray4 hover:(text-gray5)
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
