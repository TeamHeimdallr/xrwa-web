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
  },
} satisfies Meta<typeof TextFieldTrade>;

export default meta;
type Story = StoryObj<typeof meta>;

export const _TextField: Story = {
  render: args => <Template {...args} />,
  args: {
    placeholder: '0.0',
    amount: '100,000,000',
  },
};

const Template = (args: Story['args']) => {
  const [value, setValue] = useState('');

  //Todo : 연결된 지갑의 amount에따른 값 변경
  const [amount, _setAmount] = useState(args?.amount);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <TextFieldTrade
      value={value}
      onChange={handleChange}
      placeholder={args?.placeholder}
      amount={amount}
    />
  );
};
