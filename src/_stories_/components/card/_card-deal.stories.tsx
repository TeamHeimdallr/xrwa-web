import type { Meta, StoryObj } from '@storybook/react';

import { CardDeal } from '~/components/card/card-deal';
import { IconCheck } from '~/components/icons';

const meta = {
  title: 'Components/CardDeal',
  component: CardDeal,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    value: { control: 'text' },
    apy: { control: 'text' },
  },
} satisfies Meta<typeof CardDeal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const _CardDeal: Story = {
  args: {
    icon: <IconCheck />,
    title: 'Card Title',
    image: 'https://picsum.photos/200/300',
    value: '1,234,567',
    apy: '5.3',
  },
};
