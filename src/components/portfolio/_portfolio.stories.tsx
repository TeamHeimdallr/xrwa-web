import type { Meta, StoryObj } from '@storybook/react';

import { Portfolio } from '~/components/portfolio';

const meta = {
  title: 'Components/Portfolio',
  component: Portfolio,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Portfolio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const _Portfolio: Story = {
  args: {},
};
