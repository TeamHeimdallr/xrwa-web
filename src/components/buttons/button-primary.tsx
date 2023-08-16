import { css } from '@emotion/react';
import { ButtonHTMLAttributes } from 'react';
import tw, { styled } from 'twin.macro';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  buttonType?: 'small' | 'large';
  connected?: boolean;
}
export const ButtonPrimary = ({
  text,

  buttonType,

  connected,
  ...rest
}: Props) => {
  return (
    <Wrapper buttonType={buttonType} connected={connected} {...rest}>
      {text}
    </Wrapper>
  );
};

interface ButtonWrapperProps {
  isLoading?: boolean;
  connected?: boolean;
  buttonType?: 'small' | 'large';
}

const Wrapper = styled.button<ButtonWrapperProps>(({ isLoading, buttonType, connected }) => [
  tw`
    flex gap-8 w-full
    flex-center relative
    rounded-8 bg-blue clickable
    text-white
    transition-color
  `,

  buttonType === 'small' && tw`font-b-14 h-42 px-24 py-10 `,
  buttonType === 'large' && tw`font-b-18 h-58 px-32 py-16`,
  connected && tw`border-solid border-1 border-blue font-r-14 color-blue`,

  css`
    &:hover {
      box-shadow: ${isLoading || disabled ? 'none' : '0px 4px 24px 0px #FFD50D40'};
    }
  `,
]);
