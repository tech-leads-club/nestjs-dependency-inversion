import { Observable } from 'rxjs'

export interface ExchangeRateService {
  getSpotPrice(fromCurrency: string, toCurrency: string): Observable<number>
}

export const ExchangeRateServiceToken = Symbol('ExchangeRateService')
