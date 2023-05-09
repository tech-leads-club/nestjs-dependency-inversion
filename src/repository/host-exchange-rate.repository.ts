import { Inject, Injectable } from '@nestjs/common'
import { ExchangeHostClient } from 'src/client/exchange-host.client'
import { ExchangeRateRepository } from './exchange-rate.repository'

@Injectable()
export class HostExchangeRateRepository implements ExchangeRateRepository {
  constructor(@Inject(ExchangeHostClient) private client: ExchangeHostClient) {}

  async getSpotPrice(fromCurrency: string, toCurrency: string): Promise<number> {
    const rates = await this.client.getLatestRates(fromCurrency.toUpperCase())

    return rates[toCurrency.toUpperCase()]
  }
}
