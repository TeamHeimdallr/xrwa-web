import type { Meta, StoryObj } from '@storybook/react';
import lottie from 'lottie-web';
import { useEffect, useRef } from 'react';
import tw, { css, styled } from 'twin.macro';

import { COLOR } from '~/assets/colors';
import { ButtonPrimary } from '~/components/buttons/button-primary';
import { IconCheck } from '~/components/icons';
import { Popup } from '~/components/popups';

const meta = {
  title: 'Components/Popup',
  component: Popup,
  tags: ['autodocs'],
  argTypes: {
    id: { control: 'text' },
    type: {
      control: { type: 'radio' },
      options: ['notification', 'normal'],
    },
  },
} satisfies Meta<typeof Popup>;

const PopupSuccess = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: true,
      });
    }
    return () => lottie.destroy();
  }, []);

  return (
    <ContentWrapper>
      <Content>
        <IconWrapper>
          <IconCheck color={COLOR.BLUE} width={40} height={40} />
        </IconWrapper>
        <Title>Transaction has been confirmed.</Title>
      </Content>
      <ButtonWrapper>
        <ButtonPrimary buttonType={'medium'} onClick={() => console.log('clicked')} text={'Done'} />
      </ButtonWrapper>
    </ContentWrapper>
  );
};

const ContentWrapper = tw.div`
  flex flex-col items-center gap-40 w-384
`;

const Content = tw.div`
  flex flex-col items-center gap-24
`;

const IconWrapper = styled.div(() => [
  tw`flex-center w-72 h-72 rounded-40 gap-8 clickable`,
  css`
    box-shadow: 0px 12px 32px 0px #3358ff14;
  `,
]);

const Title = tw.div`
  text-center font-sb-20
`;
const ButtonWrapper = tw.div`
  flex-center
`;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const PopUp: Story = {
  args: {
    id: 'popup',
    type: 'notification',
    contents: <PopupSuccess />,
  },
};
