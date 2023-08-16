import type { Meta, StoryObj } from '@storybook/react';

import { CardPrimary } from '~/components/card/card-primary';
import { IconCheck } from '~/components/icons';

const meta = {
  title: 'Components/CardPrimary',
  component: CardPrimary,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    content: { control: 'text' },
    cardType: {
      control: { type: 'radio' },
      options: ['value', 'none'],
    },
  },
} satisfies Meta<typeof CardPrimary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const _CardPrimary: Story = {
  args: {
    icon: <IconCheck />,
    title: 'Card Title',
    content: '123345667',
    cardType: 'value',
  },
};
