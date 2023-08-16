import { InputHTMLAttributes } from 'react';
import tw from 'twin.macro';

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export const TextField = ({ ...rest }: Props) => {
  return (
    <Wrapper>
      <Input {...rest} />
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex flex-col py-16 px-20 gap-12 bg-gray0 rounded-8
`;

const Input = tw.input`
  w-full bg-transparent font-r-16
  px-0 border-none caret-blue
  placeholder-gray2
`;
