import type { Meta, StoryObj } from '@storybook/react';
import { ChangeEvent, useState } from 'react';

import { TextFieldTrade } from '~/components/text-field/text-field-trade';

const meta = {
  title: 'Components/TextFieldTrade',
  component: TextFieldTrade,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    amount: { control: 'text' },
    error: { control: 'boolean' },
    errorMessage: { control: 'text' },
  },
} satisfies Meta<typeof TextFieldTrade>;

export default meta;
type Story = StoryObj<typeof meta>;

export const _TextField: Story = {
  render: args => <Template {...args} />,
  args: {
    placeholder: 'Enter your email',
    amount: '100,000,000',
    error: false,
  },
};

const Template = (args: Story['args']) => {
  const [value, setValue] = useState('');

  //Todo : 연결된 지갑의 amount에따른 값 변경
  const [amount, _setAmount] = useState(args?.amount);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  //Todo : Error 내용에따른 에러메세지 추가
  const errorMessage = 'Please enter a valid amount';

  return (
    <TextFieldTrade
      value={value}
      onChange={handleChange}
      placeholder={args?.placeholder}
      amount={amount}
      error={args?.error}
      errorMessage={errorMessage}
    />
  );
};
