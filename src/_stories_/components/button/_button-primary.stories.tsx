import type { Meta, StoryObj } from '@storybook/react';

import { ButtonPrimary } from '~/components/buttons/button-primary';

const meta = {
  title: 'Components/ButtonPrimary',
  component: ButtonPrimary,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    buttonType: {
      control: { type: 'radio' },
      options: ['small', 'large'],
    },
  },
} satisfies Meta<typeof ButtonPrimary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const _ButtonPrimary: Story = {
  args: {
    text: 'Text here',
    buttonType: 'small',
    onClick: () => console.log('clicked'),
  },
};
