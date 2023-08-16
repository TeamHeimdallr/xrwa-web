import styled from '@emotion/styled';
import { InputHTMLAttributes } from 'react';
import tw, { css } from 'twin.macro';

import { formatNumberWithCommas } from '~/utils/string';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  amount?: string;
  label?: string;
  error?: boolean;
  errorMessage?: string;
}

export const TextField = ({ value, amount, label, error, errorMessage, ...rest }: Props) => {
  return (
    <Wrapper>
      <InputWrapper>
        <Input {...rest} />
        <Tag>{label ?? 'MATIC'}</Tag>
      </InputWrapper>
      {amount && (
        <CaptionWrapper>
          <CaptionText>Balance</CaptionText>
          <CaptionBalance error={error}>
            {error ? errorMessage : ` ${formatNumberWithCommas(amount)} `}
          </CaptionBalance>
        </CaptionWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex flex-col py-16 px-20 gap-12 bg-gray0
`;

const InputWrapper = tw.div`
    w-full flex items-center gap-8
  `;

const Input = tw.input`
  w-full bg-transparent font-m-28
  px-0 border-none caret-blue
  placeholder-gray2
`;

const Tag = tw.div`
  font-r-16
`;

const CaptionWrapper = tw.div`
  flex justify-end gap-4
`;

interface CaptionTextProps {
  error: boolean | undefined;
}

const CaptionText = tw.div`
  font-r-14 text-gray3`;

const CaptionBalance = styled.div<CaptionTextProps>(({ error }) => [
  tw` font-r-14 text-gray4`,
  error && tw`text-blue`,
]);
