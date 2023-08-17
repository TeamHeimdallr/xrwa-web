import type { Meta, StoryObj } from '@storybook/react';

import { Table } from '~/components/table';

const meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const _Table: Story = {
  args: {},
};
