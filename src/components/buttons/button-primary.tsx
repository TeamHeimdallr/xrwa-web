import { ButtonHTMLAttributes } from 'react';
import tw, { styled } from 'twin.macro';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  buttonType?: 'small' | 'large';
}
export const ButtonPrimary = ({ text, buttonType, ...rest }: Props) => {
  return (
    <Wrapper buttonType={buttonType} {...rest}>
      {text}
    </Wrapper>
  );
};

interface ButtonWrapperProps {
  connected?: boolean;
  buttonType?: 'small' | 'large';
}

const Wrapper = styled.button<ButtonWrapperProps>(({ buttonType }) => [
  tw`
    flex gap-8 w-full
    flex-center relative
    rounded-8 bg-blue clickable
    text-white
    transition-color
  `,

  buttonType === 'small' && tw`font-b-14 h-42 px-24 py-10 `,
  buttonType === 'large' && tw`font-b-18 h-58 px-32 py-16`,
]);
