import { getTreasuryDiscountRate } from '~/utils/currency';
import { formatNumber } from '~/utils/number';

export const portfolioData = [
  {
    id: 1,
    issuer: 'US Treasury 0% 05. 09. 2023',
    cusip: 'US912797GR22',
    maturityDate: '2023-09-05',
    ytm: '5.27%',
    principalAmount: '10,000.00',
    marketValue: formatNumber(10000 * getTreasuryDiscountRate(new Date('2023-09-05'), 0.0527), 2),
  },
  {
    id: 2,
    issuer: 'US Treasury 0% 19. 09. 2023',
    cusip: 'US912797GT87',
    maturityDate: '2023-09-19',
    ytm: '5.29%',
    principalAmount: '48,700.00',
    marketValue: formatNumber(48700 * getTreasuryDiscountRate(new Date('2023-09-19'), 0.0529), 2),
  },
  {
    id: 3,
    issuer: 'US Treasury 0% 26. 09. 2023',
    cusip: 'US912797GU50',
    maturityDate: '2023-09-26',
    ytm: '5.29%',
    principalAmount: '49,800.00',
    marketValue: formatNumber(49800 * getTreasuryDiscountRate(new Date('2023-09-26'), 0.0529), 2),
  },
  {
    id: 4,
    issuer: 'US Treasury 0% 05. 10. 2023',
    cusip: 'US912796YJ21',
    maturityDate: '2023-10-05',
    ytm: '5.32%',
    principalAmount: '50,000.00',
    marketValue: formatNumber(50000 * getTreasuryDiscountRate(new Date('2023-10-05'), 0.0532), 2),
  },
];
