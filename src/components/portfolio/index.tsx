import { css } from '@emotion/react';
import tw, { styled } from 'twin.macro';

import { ButtonPrimary } from '../buttons/button-primary';

const rows = [
  {
    id: 1,
    issuer: 'US Treasury 0% 00. 00. 2023',
    cusip: 'US912797GR22',
    maturityDate: '2023-00-00',
    ytm: '5.28%',
    principalAmount: '243,200.00',
    marketValue: '242,533.96',
  },
  {
    id: 2,
    issuer: 'US Treasury 0% 00. 00. 2023',
    cusip: 'US912797GR22',
    maturityDate: '2023-00-00',
    ytm: '5.28%',
    principalAmount: '243,200.00',
    marketValue: '242,533.96',
  },
  {
    id: 3,
    issuer: 'US Treasury 0% 00. 00. 2023',
    cusip: 'US912797GR22',
    maturityDate: '2023-00-00',
    ytm: '5.28%',
    principalAmount: '243,200.00',
    marketValue: '242,533.96',
  },
  {
    id: 4,
    issuer: 'US Treasury 0% 00. 00. 2023',
    cusip: 'US912797GR22',
    maturityDate: '2023-00-00',
    ytm: '5.28%',
    principalAmount: '243,200.00',
    marketValue: '242,533.96',
  },
];
export const Portfolio = () => {
  return (
    <Wrapper>
      <PositionLabel>Portfolio</PositionLabel>
      <TableWrapper>
        <OrderHeader>
          <HeaderIssuer>Issuer</HeaderIssuer>
          <HeaderCusip>CUSIP</HeaderCusip>
          <HeaderMaturity>Maturity Date</HeaderMaturity>
          <HeaderYtm>YTM</HeaderYtm>
          <HeaderPrincipalAmount>Principal Amount</HeaderPrincipalAmount>
          <HeaderMarketValue>Market Value</HeaderMarketValue>
        </OrderHeader>
        <Divider />
        {rows.length == 0 && (
          <EmptyWrapper>
            <EmptyText>No transactions found!</EmptyText>
            <ButtonPrimary
              text="Go to Deals"
              buttonType="medium"
              onClick={() => console.log('Deposit')}
              style={{ width: '126px' }}
            />
          </EmptyWrapper>
        )}
        {rows.map(row => (
          <OrderRow key={row.id}>
            <RowIssuer>{row.issuer}</RowIssuer>
            <RowCusip>{row.cusip}</RowCusip>
            <RowMaturity>{row.maturityDate}</RowMaturity>
            <RowYtm>{row.ytm}</RowYtm>
            <RowPrincipalAmount>{row.principalAmount}</RowPrincipalAmount>
            <RowMarketValue>{row.marketValue}</RowMarketValue>
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

const HeaderIssuer = tw.div`
    font-r-14 w-230 text-gray4 text-center
`;
const HeaderCusip = tw.div`
    font-r-14 w-140 text-gray4 text-center
`;
const HeaderMaturity = tw.div`
    font-r-14 w-100 text-gray4 text-center
`;
const HeaderYtm = tw.div`
    font-r-14 w-80 text-gray4 text-center
`;
const HeaderPrincipalAmount = tw.div`
    font-r-14 w-161 text-gray4 text-center
`;
const HeaderMarketValue = tw.div`
    font-r-14 w-161 text-gray4 text-center
`;

const Divider = tw.div`
  w-full h-1 flex-shrink-0 bg-gray1
`;

const OrderRow = tw.div`
  w-full flex gap-8
`;

const RowIssuer = tw.div`
  font-b-14 w-230 text-black text-center
`;
const RowCusip = tw.div`
  font-r-14 w-140 text-black text-center
`;
const RowMaturity = tw.div`
  font-r-14 w-100 text-black text-center
`;
const RowYtm = tw.div`
  font-r-14 w-80 text-black text-center
`;
const RowPrincipalAmount = tw.div`
  font-r-14 w-161 text-black text-center
`;
const RowMarketValue = tw.div`
  font-r-14 w-161 text-black text-center 
`;

const EmptyWrapper = tw.div`
  w-full flex flex-col items-center py-24 gap-24
`;

const EmptyText = tw.div`
  font-b-18 text-gray3
`;

export default Portfolio;
