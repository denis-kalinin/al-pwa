import axios from 'axios';
import ExchangeRate from './model/ExchangeRate';
import ExchangeRateDTO from './model/ExchangeRateDTO';

export function getRates() : Promise<any> {
  return axios
    .get('https://api.coindesk.com/v1/bpi/currentprice.json')
    .then((result) => result.data)
    .then((result) => Object.values(result.bpi).map((val) => {
      const rateDTO : ExchangeRateDTO = val as ExchangeRateDTO;
      return new ExchangeRate(rateDTO);
    }));
}

export function sayHey() : void {

}
