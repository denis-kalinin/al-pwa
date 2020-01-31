import ExchangeRateDTO from './ExchangeRateDTO';

export default class ExchangeRate extends ExchangeRateDTO {
  constructor(dto: ExchangeRateDTO) {
    super();
    Object.assign(this, dto);
  }

  get price(): string {
    return `${this.rate} ${this.symbol}`;
  }
}
