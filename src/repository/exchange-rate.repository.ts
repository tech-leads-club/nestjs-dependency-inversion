import { Observable } from 'rxjs'

export interface ExchangeRateRepository {
  getSpotPrice(fromCurrency: string, toCurrency: string): Observable<number>
}

export const ExchangeRateRepositoryToken = Symbol('ExchangeRateRepository')
