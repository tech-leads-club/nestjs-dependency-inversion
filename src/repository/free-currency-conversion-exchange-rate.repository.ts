import { ExchangeRateRepository } from './exchange-rate.repository'
import { Inject } from '@nestjs/common'
import { FreeCurrencyConversionClient } from 'src/client/free-currency-conversion.client'

export class FreeCurrencyConversionExchangeRateRepository
  implements ExchangeRateRepository
{
  constructor(
    @Inject(FreeCurrencyConversionClient) private client: FreeCurrencyConversionClient
  ) {}

  async getSpotPrice(fromCurrency: string, toCurrency: string): Promise<number> {
    const rates = await this.client.getLatestRates(fromCurrency.toUpperCase())

    return rates[toCurrency.toUpperCase()]
  }
}
