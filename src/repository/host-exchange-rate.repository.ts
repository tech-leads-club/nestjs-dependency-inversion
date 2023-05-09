import { Inject, Injectable } from '@nestjs/common'
import { ExchangeHostClient } from 'src/client/exchange-host.client'
import { ExchangeRateRepository } from './exchange-rate.repository'
import { Observable, map } from 'rxjs'

@Injectable()
export class HostExchangeRateRepository implements ExchangeRateRepository {
  constructor(@Inject(ExchangeHostClient) private client: ExchangeHostClient) {}

  getSpotPrice(fromCurrency: string, toCurrency: string): Observable<number> {
    return this.client
      .getLatestPrices(fromCurrency.toUpperCase())
      .pipe(map((response) => response.rates[toCurrency.toUpperCase()]))
  }
}
