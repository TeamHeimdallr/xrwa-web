import { css } from '@emotion/react';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import tw, { styled } from 'twin.macro';

import { COLOR } from '~/assets/colors';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
}

export const IconButton = ({ icon, ...rest }: Props) => {
  return <Wrapper {...rest}>{icon}</Wrapper>;
};

const Wrapper = styled.button(() => [
  tw`w-40 h-40 gap-10 p-8 bg-white clickable flex-center rounded-32 
  hover:bg-gray1
  `,
  css`
    svg path {
      fill: ${COLOR.GRAY3};
    }
    &:hover {
      svg path {
        fill: ${COLOR.GRAY4};
      }
    }
  `,
]);
