import { AxiosRequestConfig } from 'axios';

export interface IAxiousRequestData {
  url: string;

  data?: {};

  config?: AxiosRequestConfig;
}
