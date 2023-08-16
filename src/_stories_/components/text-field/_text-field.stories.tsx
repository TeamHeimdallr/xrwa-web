import type { Meta, StoryObj } from '@storybook/react';

import { TextField } from '~/components/text-field/text-field';

const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const _TextField: Story = {
  args: {
    placeholder: 'Placeholder',
  },
};
