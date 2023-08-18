import { getTreasuryDiscountRate } from '~/utils/currency';
import { formatNumber } from '~/utils/number';

export const portfolioData = [
  {
    id: 1,
    issuer: 'US Treasury 0% 05. 12. 2023',
    cusip: 'US912797HN09',
    maturityDate: '2023-12-05',
    ytm: '5.27%',
    principalAmount: '10,000.00',
    marketValue: formatNumber(10000 * getTreasuryDiscountRate(new Date('2023-12-05'), 0.0527), 2),
    link: 'https://cbonds.com/bonds/1501671/',
  },
  {
    id: 2,
    issuer: 'US Treasury 0% 12. 12. 2023',
    cusip: 'US912797HU42',
    maturityDate: '2023-12-12',
    ytm: '5.29%',
    principalAmount: '48,700.00',
    marketValue: formatNumber(48700 * getTreasuryDiscountRate(new Date('2023-12-12'), 0.0529), 2),
    link: 'https://cbonds.com/bonds/1505149/',
  },
  {
    id: 3,
    issuer: 'US Treasury 0% 19. 12. 2023',
    cusip: 'US912797HV25',
    maturityDate: '2023-12-19',
    ytm: '5.29%',
    principalAmount: '49,800.00',
    marketValue: formatNumber(49800 * getTreasuryDiscountRate(new Date('2023-12-19'), 0.0529), 2),
    link: 'https://cbonds.com/bonds/1508199/',
  },
];
