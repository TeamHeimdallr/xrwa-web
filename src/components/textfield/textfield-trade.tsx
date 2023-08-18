import { InputHTMLAttributes, useCallback } from 'react';
import { NumberFormatValues, NumericFormat } from 'react-number-format';
import tw, { styled } from 'twin.macro';

import { TOKEN_IMAGE } from '~/constants';
import { formatNumber } from '~/utils/number';

import { IconDown } from '../icons';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  amount?: string;
  selectable?: boolean;
  value?: number | string;
  placeholder?: string;
  currency?: string;
  handleChange?: (value: NumberFormatValues) => void;
  handleClick?: () => void;
}

export const TextFieldTrade = ({
  amount,
  selectable,
  placeholder = '0.0',
  currency,
  value,
  handleChange,
  handleClick,
  disabled,
}: Props) => {
  const CustomInput = useCallback(({ ...rest }: Props) => <Input {...rest} />, []);

  return (
    <Wrapper>
      <InputWrapper>
        <NumericFormat
          disabled={disabled}
          allowLeadingZeros={false}
          allowNegative={false}
          placeholder={placeholder}
          thousandSeparator
          onValueChange={values => handleChange?.(values)}
          value={value}
          customInput={CustomInput}
        />
        <DropdownWrapper onClick={handleClick} clickable={!!handleClick}>
          <CurrencyImg src={TOKEN_IMAGE[currency!]?.image} />
          <CurrencyName>{currency}</CurrencyName>
          {selectable && (
            <IconWrapper>
              <IconDown
                style={{
                  cursor: 'pointer',
                }}
              />
            </IconWrapper>
          )}
        </DropdownWrapper>
      </InputWrapper>
      <CaptionWrapper>
        {amount && (
          <>
            <CaptionText>Balance</CaptionText>
            <CaptionBalance>{`${formatNumber(amount, 2)}`}</CaptionBalance>
          </>
        )}
      </CaptionWrapper>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex flex-col py-12 px-20 gap-12 bg-gray0 rounded-8
`;

const InputWrapper = tw.div`
  flex items-center gap-8
`;

const Input = tw.input`
  w-full flex flex-1 bg-transparent text-28 leading-34 font-medium
  px-0 border-none caret-blue
  placeholder-gray2
`;

interface DropdownWrapperProps {
  clickable?: boolean;
}
const DropdownWrapper = styled.div<DropdownWrapperProps>(({ clickable }) => [
  tw`flex items-center gap-8 py-8 pl-8 pr-12 bg-gray1 rounded-24`,
  clickable && tw`clickable`,
]);

const CurrencyImg = tw.img`
  w-28 h-28
`;

const CurrencyName = tw.div`
  font-m-22 text-gray4
`;

const IconWrapper = tw.div`
  w-24 h-24 flex-center
`;

const CaptionWrapper = tw.div`
  flex justify-end gap-4 h-22
`;

const CaptionText = tw.div`
  font-r-14 text-gray3`;

const CaptionBalance = tw.div`
  font-r-14 text-gray4
  `;
