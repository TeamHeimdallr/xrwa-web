import lottie from 'lottie-web/build/player/lottie_light';
import { ButtonHTMLAttributes, useEffect, useRef } from 'react';
import tw, { styled } from 'twin.macro';

import loading from '~/assets/lottie/loading-dot.json';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isLoading?: boolean;
  buttonType?: 'medium' | 'large';
}
export const ButtonPrimary = ({ text, isLoading, buttonType, ...rest }: Props) => {
  const warpperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!warpperRef.current || !isLoading) return;
    lottie.loadAnimation({
      container: warpperRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: loading,
    });

    return () => {
      lottie.destroy();
    };
  }, [warpperRef, isLoading]);

  return (
    <Wrapper isLoading={isLoading} buttonType={buttonType} {...rest}>
      {text}
      <LottieWrapper ref={warpperRef} />
    </Wrapper>
  );
};

interface ButtonWrapperProps {
  isLoading?: boolean;
  connected?: boolean;
  buttonType?: 'medium' | 'large';
}

const Wrapper = styled.button<ButtonWrapperProps>(({ buttonType, isLoading }) => [
  tw`
    flex gap-8 w-full
    flex-center relative
    rounded-8 bg-blue clickable
    text-white
    transition-color
    hover:bg-darkblue
  `,
  isLoading && tw` text-transparent non-clickable hover:bg-blue`,
  buttonType === 'medium' && tw`font-b-14 h-42 px-24 py-10 `,
  buttonType === 'large' && tw`font-b-18 h-58 px-32 py-16`,
]);

const LottieWrapper = tw.div`
  w-full h-full flex-center absolute absolute-center
`;
