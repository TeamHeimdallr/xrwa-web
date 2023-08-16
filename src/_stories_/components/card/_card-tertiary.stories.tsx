import type { Meta, StoryObj } from '@storybook/react';

import { CardTertiary } from '~/components/card/card-tertiary';
import { IconCheck } from '~/components/icons';

const meta = {
  title: 'Components/CardTertiary',
  component: CardTertiary,
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
    cardType: {
      control: { type: 'radio' },
      options: ['value', 'percent'],
    },
  },
} satisfies Meta<typeof CardTertiary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const _CardTertiary: Story = {
  args: {
    icon: <IconCheck />,
    title: 'Card Title',
    contents: 1234566,
    cardType: 'value',
  },
};
