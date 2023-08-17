import { css } from '@emotion/react';
import tw, { styled } from 'twin.macro';

import { ButtonPrimary } from '../buttons/button-primary';

const headers = ['Type', 'Amount', 'Status', 'Date', 'Exchange Rate', 'Transaction'];

const rows = [
  {
    type: 'Withdraw',
    amount: '50 USTB',
    status: '8 days left',
    date: '2021-08-20 12:00:00',
    exchangeRate: '1.0201',
    transaction: '72561528...',
  },
  {
    type: 'Deposit',
    amount: '50 USTB',
    status: 'Locked',
    date: '2021-08-20 12:00:00',
    exchangeRate: '1.0201',
    transaction: '72561528...',
  },
];
export const Table = () => {
  return (
    <Wrapper>
      <PositionLabel>Orders</PositionLabel>
      <TableWrapper>
        <OrderHeader>
          {headers.map(header => (
            <HeaderText key={header}>{header}</HeaderText>
          ))}
        </OrderHeader>
        <Divider />
        {rows.length == 0 && (
          <EmptyWrapper>
            <EmptyText>No transactions found!</EmptyText>
            <ButtonPrimary
              text="Go to Deals"
              buttonType="medium"
              onClick={() => {
                console.log('Deposit');
              }}
              style={{
                width: '126px',
              }}
            />
          </EmptyWrapper>
        )}
        {rows.map(row => (
          <OrderRow key={row.transaction}>
            <RowType>{row.type}</RowType>
            <RowText>{row.amount}</RowText>
            <RowText>{row.status}</RowText>
            <RowText>{row.date}</RowText>
            <RowText>{row.exchangeRate}</RowText>
            <RowTransaction>{row.transaction}</RowTransaction>
          </OrderRow>
        ))}
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

const OrderRow = tw.div`
  w-full flex gap-8
`;

const RowType = tw.div`
  font-b-14 w-145 text-black text-center
`;
const RowText = tw.div`
  font-r-14 w-145 text-black text-center
`;
const RowTransaction = tw.div`
  font-r-14 w-145 text-blue text-center clickable
`;

const EmptyWrapper = tw.div`
  w-full flex flex-col items-center py-24 gap-24
`;

const EmptyText = tw.div`
  font-b-18 text-gray3
`;

export default Table;
