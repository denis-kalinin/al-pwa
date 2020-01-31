import { IExchangeRate } from './interfaces/IExchangeRate';

export default class ExchangeRateDTO implements IExchangeRate {
  code: string = '';

  symbol: string = '';

  rate: string = '';

  description: string = '';

  rateFloat: number = -1;
}
