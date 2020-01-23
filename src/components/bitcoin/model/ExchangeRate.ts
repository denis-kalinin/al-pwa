import { IExchangeRate } from './interfaces/IExchangeRate';

export class ExchangeRateDTO implements IExchangeRate {
  code: string = '';

  symbol: string = '';

  rate: string = '';

  description: string = '';

  rateFloat: number = -1;
}

export class ExchangeRate extends ExchangeRateDTO {
  constructor(dto: ExchangeRateDTO) {
    super();
    Object.assign(this, dto);
  }

  get price(): string {
    return `${this.rate} ${this.symbol}`;
  }
}
