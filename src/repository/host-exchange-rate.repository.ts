import { Inject, Injectable } from '@nestjs/common'
import { ExchangeHostClient } from 'src/client/exchange-host.client'
import { ExchangeRateRepository } from './exchange-rate.repository'
import { Observable, map } from 'rxjs'

@Injectable()
export class HostExchangeRateRepository implements ExchangeRateRepository {
  constructor(@Inject(ExchangeHostClient) private client: ExchangeHostClient) {}

  getSpotPrice(fromCurrency: string, toCurrency: string): Observable<number> {
    return this.client
      .getLatestRates(fromCurrency.toUpperCase())
      .pipe(map((rates) => rates[toCurrency.toUpperCase()]))
  }
}
