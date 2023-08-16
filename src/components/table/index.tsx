import { css } from '@emotion/react';
import tw, { styled } from 'twin.macro';

import { COLOR } from '~/assets/colors';

interface Props {}

export const Table = ({ ...rest }: Props) => {
  return (
    <Wrapper>
      <PositionLabel>Orders</PositionLabel>
      <TableWrapper>
        <OrderHeader>
          <HeaderText>Type</HeaderText>
          <HeaderText>Amount</HeaderText>
          <HeaderText>Status</HeaderText>
          <HeaderText>Date</HeaderText>
          <HeaderText>Exchange Rate</HeaderText>
          <HeaderText>Transaction</HeaderText>
        </OrderHeader>
        <Divider />
      </TableWrapper>
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex flex-col gap-16
`;
const PositionLabel = tw.div`
  font-b-24 text-black
`;
const TableWrapper = styled.div(() => [
  tw`
  w-full py-20 px-24 rounded-20 bg-white
  flex flex-col gap-20
`,
  css`
    box-shadow: 0px 12px 32px 0px #3358ff14;
  `,
]);

const OrderHeader = tw.div`
  w-full flex gap-8
`;

const HeaderText = tw.div`
  font-r-14 w-145 text-gray4 text-center
`;

const Divider = tw.div`
  w-full h-1 flex-shrink-0 bg-gray1
`;
const Refresh = tw.button`
  clickable bg-gray5 text-white h-40 font-sb-14
`;
