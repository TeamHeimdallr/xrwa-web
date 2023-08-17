import type { Meta, StoryObj } from '@storybook/react';

import { TokenButton } from '~/components/buttons/button-token';

const meta = {
  title: 'Components/TokenButton',
  component: TokenButton,
  tags: ['autodocs'],
  argTypes: {
    symbol: {
      control: { type: 'radio' },
      options: ['ENA', 'BSD'],
    },
  },
} satisfies Meta<typeof TokenButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const _TokenButton: Story = {
  args: {
    onClick: () => alert('clicked'),
    symbol: 'ENA',
  },
};
