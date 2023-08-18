import { css } from '@emotion/react';
import { HTMLAttributes, ReactNode, useEffect, useRef } from 'react';
import tw, { styled } from 'twin.macro';
import lottie from 'lottie-web';

import { IconCheck } from '../icons';
import { COLOR } from '~/assets/colors';
import { ButtonPrimary } from '../buttons/button-primary';
import { usePopup } from '~/hooks/pages/use-popup';
import { useOnClickOutside } from 'usehooks-ts';

interface Props extends HTMLAttributes<HTMLDivElement> {
  id?: string;
}

export const PopupSuccess = ({ id }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const { close } = usePopup(id);
  useOnClickOutside(popupRef, close);

  useEffect(() => {
    if (containerRef.current) {
      lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: true,
      });
    }
    return () => lottie.destroy();
  }, []);

  return (
    <Wrapper>
      <PopupWrapper ref={popupRef} padding={false}>
        <ContentWrapper>
          <Content>
            <IconWrapper>
              <IconCheck color={COLOR.BLUE} width={40} height={40} />
            </IconWrapper>
            <Title>Transaction has been confirmed.</Title>
          </Content>
          <ButtonWrapper>
            <ButtonPrimary buttonType={'medium'} onClick={close} text={'Done'} />
          </ButtonWrapper>
        </ContentWrapper>
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

const ContentWrapper = tw.div`
  flex flex-col items-center gap-40 w-384
`;

const Content = tw.div`
  flex flex-col items-center gap-24
`;

const IconWrapper = styled.div(() => [
  tw`flex-center w-72 h-72 rounded-40 gap-8 clickable`,
  css`
    box-shadow: 0px 12px 32px 0px #3358ff14;
  `,
]);

const Title = tw.div`
  text-center font-sb-20
`;

const ButtonWrapper = tw.div`
  flex-center
`;
