import type { Meta, StoryObj } from '@storybook/react';

import { CardSecondary } from '~/components/card/card-secondary';
import { IconCheck } from '~/components/icons';

const meta = {
  title: 'Components/CardSecondary',
  component: CardSecondary,
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
    cardType: {
      control: { type: 'radio' },
      options: ['value', 'percent'],
    },
  },
} satisfies Meta<typeof CardSecondary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const _CardSecondary: Story = {
  args: {
    icon: <IconCheck />,
    title: 'Card Title',
    contents: 12344567,
    cardType: 'value',
  },
};
