import { css } from '@emotion/react';
import { format, formatDistance } from 'date-fns';
import { upperFirst } from 'lodash-es';
import tw, { styled } from 'twin.macro';

import { useGetActivitiesQuery } from '~/api/server/cbdc/users-get';
import { useConnectWallet } from '~/api/xrpl/connect-wallet';
import { formatNumber } from '~/utils/number';
import { truncateAddress } from '~/utils/string';
import { DATE_FORMATTER } from '~/utils/time';

import { ButtonPrimary } from '../buttons/button-primary';

const headers = ['Type', 'Amount', 'Status', 'Date', 'Exchange Rate', 'Transaction'];

export const Table = () => {
  const { wallet } = useConnectWallet();

  const { data } = useGetActivitiesQuery(
    { account: wallet?.address ?? '' },
    { enabled: !!wallet?.address }
  );

  const isEmpty = !data || !data?.data || data.data?.length === 0;

  return (
    <Wrapper>
      <PositionLabel>Activity</PositionLabel>
      <TableWrapper>
        <OrderHeader>
          {headers.map(header => (
            <HeaderText key={header}>{header}</HeaderText>
          ))}
        </OrderHeader>
        <Divider />
        {isEmpty ? (
          <EmptyWrapper>
            <EmptyText>No transactions found!</EmptyText>
            <ButtonPrimary
              text="Go to Deals"
              buttonType="medium"
              onClick={() => console.log('Deposit')}
              style={{ width: '126px' }}
            />
          </EmptyWrapper>
        ) : (
          data.data.reverse().map(row => {
            const status =
              row.type === 'withdraw' && row.status === 'locked'
                ? `${formatDistance(new Date(), new Date(row.unlockDate))} left`
                : row.type === 'withdraw' && row.status === 'withdrawn'
                ? 'Withdrawn'
                : 'Locked';

            return (
              <OrderRow key={row.id}>
                <RowType>{upperFirst(row.type)}</RowType>
                <RowText>{`${formatNumber(row.amount)} ${row.currency}`}</RowText>
                <RowText>{status}</RowText>
                <RowText>{format(new Date(row.date), DATE_FORMATTER.yyyy_MM_dd_HHmmss)}</RowText>
                <RowText>{formatNumber(row.exchangeRate)}</RowText>
                <RowTransaction
                  onClick={() => window.open(`https://testnet.xrpl.org/transactions/${row.tx}`)}
                >
                  {truncateAddress(row.tx, 8)}
                </RowTransaction>
              </OrderRow>
            );
          })
        )}
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
  tw`flex flex-col w-full gap-20 px-24 py-20 bg-white rounded-20`,
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
