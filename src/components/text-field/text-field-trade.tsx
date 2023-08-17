import { InputHTMLAttributes, useCallback } from 'react';
import { NumberFormatValues, NumericFormat } from 'react-number-format';
import tw from 'twin.macro';

import * as base from '~/constants/tokens/base';
import { formatNumberWithComma } from '~/utils/number';

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
}: Props) => {
  const CustomInput = useCallback(({ ...rest }: Props) => <Input {...rest} />, []);

  return (
    <Wrapper>
      <InputWrapper>
        <NumericFormat
          allowLeadingZeros={false}
          allowNegative={false}
          placeholder={placeholder}
          thousandSeparator
          onValueChange={values => handleChange?.(values)}
          value={value}
          customInput={CustomInput}
        />
        <DropdownWrapper>
          <CurrencyImg src={base.TOKENS[currency!]} />
          <CurrencyName>{currency}</CurrencyName>
          {selectable && (
            <IconWrapper onClick={handleClick}>
              <IconDown
                style={{
                  cursor: 'pointer',
                }}
              />
            </IconWrapper>
          )}
        </DropdownWrapper>
      </InputWrapper>
      {amount && (
        <CaptionWrapper>
          <CaptionText>Balance</CaptionText>
          <CaptionBalance>{`${formatNumberWithComma(parseFloat(amount))}`}</CaptionBalance>
        </CaptionWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex flex-col py-16 px-20 gap-12 bg-gray0 rounded-8
`;

const InputWrapper = tw.div`
  w-full flex items-center gap-8
  `;

const Input = tw.input`
  w-full bg-transparent text-28 leading-34 font-medium
  px-0 border-none caret-blue
  placeholder-gray2
`;

const DropdownWrapper = tw.div`
  flex items-center gap-8 py-8 px-12 bg-gray1 rounded-24 
`;

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
  flex justify-end gap-4
`;

const CaptionText = tw.div`
  font-r-14 text-gray3`;

const CaptionBalance = tw.div`
  font-r-14 text-gray4
  `;
