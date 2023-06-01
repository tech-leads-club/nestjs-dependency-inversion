import { HttpService } from '@nestjs/axios'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { lastValueFrom, map, tap } from 'rxjs'
import { z } from 'zod'

const CurrencyCode = z.string().min(3).max(3).toUpperCase()

const RateAmount = z.number().min(0)

const Rates = z.record(CurrencyCode, RateAmount)

const LatestResponse = z.object({
  success: z.boolean(),
  base: CurrencyCode,
  date: z.string(),
  rates: Rates
})

type Rates = z.infer<typeof Rates>

export type LatestResponse = z.infer<typeof LatestResponse>

@Injectable()
export class ExchangeHostClient {
  private logger = new Logger(ExchangeHostClient.name)

  static BASE_URL = 'https://api.exchangerate.host'

  constructor(@Inject(HttpService) private http: HttpService) {}

  getLatestRates(baseCurrency: string): Promise<Rates> {
    this.logger.log({
      message: 'Fetching latest rates',
      baseCurrency
    })

    return lastValueFrom(
      this.http
        .request<unknown>({
          method: 'GET',
          url: `${ExchangeHostClient.BASE_URL}/latest`,
          params: {
            base: baseCurrency.toUpperCase()
          }
        })
        .pipe(
          map((response) => LatestResponse.parse(response.data)),
          map((data) => data.rates),
          tap((rates) =>
            this.logger.log({
              message: 'Received latest rates',
              baseCurrency,
              rates
            })
          )
        )
    )
  }
}
