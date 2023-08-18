import { exchangeRate } from '~/data/exchange-rate';
import { TOKEN } from '~/types';

// 1 currency = ? USD
export const getCurrencyPriceUSD = (currency: string) => {
  const currencyPrice = exchangeRate.conversion_rates[currency];
  if (!currencyPrice) return 0;

  return 1 / currencyPrice;
};

interface CurrencyPrice {
  currency: string;
  amount: number;
}
export const getExchangeRate = (currencyPrice1: CurrencyPrice, currencyPrice2: CurrencyPrice) => {
  const { currency: currency1, amount: amount1 } = currencyPrice1;
  const { currency: currency2, amount: amount2 } = currencyPrice2;

  const totalUSD1 = getCurrencyPriceUSD(currency1) * amount1;
  const totalUSD2 = getCurrencyPriceUSD(currency2) * amount2;

  if (totalUSD1 === 0 || totalUSD2 === 0) return 0;

  return totalUSD1 / totalUSD2;
};

export const convertCBDCToCurrency = (cbdc: TOKEN) => {
  if (cbdc === 'BSD') return 'BSD';
  if (cbdc === 'ENA') return 'NGN';
  if (cbdc === 'KRW') return 'KRW';

  return 'USD';
};
