import { HttpService } from '@nestjs/axios'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Observable, map, tap } from 'rxjs'

type CurrencyCode = string

type Rates = Record<CurrencyCode, number>

type LatestRatesResponse = {
  data: Rates
}

@Injectable()
export class FreeCurrencyConversionClient {
  private logger = new Logger(FreeCurrencyConversionClient.name)

  static BASE_URL = 'https://api.freecurrencyapi.com/v1'

  constructor(
    @Inject(HttpService) private http: HttpService,
    @Inject(ConfigService) private config: ConfigService
  ) {}

  getLatestRates(baseCurrency: CurrencyCode): Observable<Rates> {
    this.logger.log({
      message: 'Fetching latest rates',
      baseCurrency
    })

    return this.http
      .request<LatestRatesResponse>({
        method: 'GET',
        url: `${FreeCurrencyConversionClient.BASE_URL}/latest`,
        params: {
          base_currency: baseCurrency.toUpperCase(),
          apikey: this.config.get<string>('FREE_CURRENCY_CONVERSION_API_KEY')
        }
      })
      .pipe(
        map((response) => response.data.data),
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
