import type { Meta, StoryObj } from '@storybook/react';

import { IconButton } from '~/components/buttons/button-icon';
import { IconCheck } from '~/components/icons';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const _IconButton: Story = {
  args: {
    onClick: () => alert('clicked'),
    icon: <IconCheck />,
  },
};
