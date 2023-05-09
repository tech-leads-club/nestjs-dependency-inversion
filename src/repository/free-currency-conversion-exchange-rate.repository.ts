import { Observable, map } from 'rxjs'
import { ExchangeRateRepository } from './exchange-rate.repository'
import { Inject } from '@nestjs/common'
import { FreeCurrencyConversionClient } from 'src/client/free-currency-conversion.client'

export class FreeCurrencyConversionExchangeRateRepository
  implements ExchangeRateRepository
{
  constructor(
    @Inject(FreeCurrencyConversionClient) private client: FreeCurrencyConversionClient
  ) {}

  getSpotPrice(fromCurrency: string, toCurrency: string): Observable<number> {
    return this.client
      .getLatestRates(fromCurrency.toUpperCase())
      .pipe(map((rates) => rates[toCurrency.toUpperCase()]))
  }
}
