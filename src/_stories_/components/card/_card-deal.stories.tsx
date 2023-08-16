import type { Meta, StoryObj } from '@storybook/react';

import { CardDeal } from '~/components/card/card-deal';
import { IconCheck } from '~/components/icons';

const meta = {
  title: 'Components/CardDeal',
  component: CardDeal,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    content: { control: 'text' },
    cardType: {
      control: { type: 'radio' },
      options: ['value', 'percent'],
    },
  },
} satisfies Meta<typeof CardDeal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const _CardDeal: Story = {
  args: {
    icon: <IconCheck />,
    title: 'Card Title',
    image: 'https://picsum.photos/200/300',
    content: 'Card Content',
    cardType: 'value',
  },
};
