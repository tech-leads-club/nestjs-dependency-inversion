import { Inject, Injectable } from '@nestjs/common'
import { Observable, map } from 'rxjs'
import { ExchangeHostClient } from 'src/client/exchange-host.client'

@Injectable()
export class ExchangeRateService {
  constructor(@Inject(ExchangeHostClient) private client: ExchangeHostClient) {}

  getSpotPrice(fromCurrency: string, toCurrency: string): Observable<number> {
    return this.client
      .getLatestPrices(fromCurrency.toUpperCase())
      .pipe(map((response) => response.rates[toCurrency.toUpperCase()]))
  }
}
