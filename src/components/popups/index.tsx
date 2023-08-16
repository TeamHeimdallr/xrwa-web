import { css } from '@emotion/react';
import { HTMLAttributes, ReactNode, useRef } from 'react';
import tw, { styled } from 'twin.macro';
import { useOnClickOutside } from 'usehooks-ts';

import { usePopup } from '~/hooks/pages/use-popup';

import { IconButton } from '../buttons/button-icon';
import { IconCancel } from '../icons';

interface Props extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  type?: 'notification' | 'normal';
  title?: string;
  contents?: ReactNode;
  padding?: boolean;
}

export const Popup = ({
  id,
  contents,
  type,
  title = 'Connect Xrp Wallet',
  padding = false,
}: Props) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const { close } = usePopup(id);
  useOnClickOutside(popupRef, close);

  return (
    <Wrapper>
      <PopupWrapper ref={popupRef} padding={padding}>
        {type === 'normal' && (
          <IconWrapper>
            <PopupTitle>{title}</PopupTitle>
            <IconButton icon={<IconCancel />} onClick={close} />
          </IconWrapper>
        )}
        {contents}
      </PopupWrapper>
      <Dim />
    </Wrapper>
  );
};

const Wrapper = tw.div``;

const Dim = tw.div`
  fixed w-screen h-screen bg-[#080117]/10 z-10 top-0 left-0
`;

interface PopupWrapperProps {
  padding?: boolean;
}
const PopupWrapper = styled.div<PopupWrapperProps>(({ padding }) => [
  tw`fixed flex flex-col bg-white z-11 absolute-center rounded-20
  p-20 gap-20`,
  padding && tw`px-48 py-40 gap-40`,
  css`
    box-shadow: 0px 12px 32px 0px #3358ff14;
  `,
]);

const IconWrapper = tw.div`flex justify-between items-center h-40 gap-10`;

const PopupTitle = tw.div`
  font-b-18
`;
