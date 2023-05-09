import { HttpService } from '@nestjs/axios'
import { Inject, Injectable } from '@nestjs/common'
import { Observable, map } from 'rxjs'

type CurrencyCode = string

type Rates = Record<CurrencyCode, number>

export type LatestResponse = {
  success: boolean
  base: CurrencyCode
  date: string
  rates: Rates
}

@Injectable()
export class ExchangeHostClient {
  static BASE_URL = 'https://api.exchangerate.host'

  constructor(@Inject(HttpService) private http: HttpService) {}

  getLatestPrices(baseCurrency: string): Observable<LatestResponse> {
    return this.http
      .request<LatestResponse>({
        method: 'GET',
        url: `${ExchangeHostClient.BASE_URL}/latest`,
        params: {
          base: baseCurrency
        }
      })
      .pipe(map((response) => response.data))
  }
}
