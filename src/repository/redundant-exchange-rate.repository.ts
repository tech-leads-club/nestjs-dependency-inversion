import { Inject, Injectable, Logger } from '@nestjs/common'
import { ExchangeRateRepository } from './exchange-rate.repository'
import { FreeCurrencyConversionExchangeRateRepository } from './free-currency-conversion-exchange-rate.repository'
import { HostExchangeRateRepository } from './host-exchange-rate.repository'

@Injectable()
export class RedundantExchangeRateRepository implements ExchangeRateRepository {
  private logger = new Logger(RedundantExchangeRateRepository.name)

  constructor(
    @Inject(FreeCurrencyConversionExchangeRateRepository)
    private freeCurrencyConversionExchangeRateRepository: FreeCurrencyConversionExchangeRateRepository,
    @Inject(HostExchangeRateRepository)
    private hostExchangeRateRepository: HostExchangeRateRepository
  ) {}

  async getSpotPrice(fromCurrency: string, toCurrency: string): Promise<number> {
    this.logger.log({
      message: 'Get spot price',
      fromCurrency,
      toCurrency
    })

    try {
      const spotPrice =
        await this.freeCurrencyConversionExchangeRateRepository.getSpotPrice(
          fromCurrency,
          toCurrency
        )

      this.logger.log({
        message: 'Successfully got spot price',
        fromCurrency,
        toCurrency,
        spotPrice
      })

      return spotPrice
    } catch (error) {
      this.logger.log({
        message: 'Failed to get spot price. Falling back to another exchange rate',
        fromCurrency,
        toCurrency
      })

      return this.hostExchangeRateRepository.getSpotPrice(fromCurrency, toCurrency)
    }
  }
}
