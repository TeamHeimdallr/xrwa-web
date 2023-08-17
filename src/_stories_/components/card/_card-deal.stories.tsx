import type { Meta, StoryObj } from '@storybook/react';

import { CardDeal } from '~/components/card/card-deal';

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
    title: 'U.S. Short-term Treasury Bill',
    contents:
      'The U.S. Short-term Treasury Bill ($USTB) is a token underpinned by a prospectus and backed by U.S. Treasury Bills.',
    image: 'https://picsum.photos/200/300',
    value: 1234567,
    apy: 5.3,
  },
};
