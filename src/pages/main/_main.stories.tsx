import type { Meta, StoryObj } from '@storybook/react';

import AppProvider from '~/hocs/hoc-app-provider';

import MainPage from '.';

const meta = {
  title: 'Pages/Main',
  component: MainPage,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof MainPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const _MainPage: Story = {
  render: () => (
    <AppProvider>
      <MainPage />
    </AppProvider>
  ),
  args: {},
};
