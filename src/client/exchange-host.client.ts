import { HttpService } from '@nestjs/axios'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { Observable, map, tap } from 'rxjs'

type CurrencyCode = string

type Rates = Record<CurrencyCode, number>

export type LatestRatesResponse = {
  success: boolean
  base: CurrencyCode
  date: string
  rates: Rates
}

@Injectable()
export class ExchangeHostClient {
  private logger = new Logger(ExchangeHostClient.name)

  static BASE_URL = 'https://api.exchangerate.host'

  constructor(@Inject(HttpService) private http: HttpService) {}

  getLatestRates(baseCurrency: CurrencyCode): Observable<Rates> {
    this.logger.log({
      message: 'Fetching latest rates',
      baseCurrency
    })

    return this.http
      .request<LatestRatesResponse>({
        method: 'GET',
        url: `${ExchangeHostClient.BASE_URL}/latest`,
        params: {
          base: baseCurrency.toUpperCase()
        }
      })
      .pipe(
        map((response) => response.data.rates),
        tap((rates) =>
          this.logger.log({
            message: 'Received latest rates',
            baseCurrency,
            rates
          })
        )
      )
  }
}
