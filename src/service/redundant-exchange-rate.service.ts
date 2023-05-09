import { Inject, Injectable, Logger } from '@nestjs/common'
import { Observable, catchError } from 'rxjs'
import { FreeCurrencyConversionExchangeRateRepository } from 'src/repository/free-currency-conversion-exchange-rate.repository'
import { HostExchangeRateRepository } from 'src/repository/host-exchange-rate.repository'
import { ExchangeRateService } from './exchange-rate.service'

@Injectable()
export class RedundantExchangeRateService implements ExchangeRateService {
  private logger = new Logger(RedundantExchangeRateService.name)

  constructor(
    @Inject(HostExchangeRateRepository)
    private hostExchangeRateRepository: HostExchangeRateRepository,
    @Inject(FreeCurrencyConversionExchangeRateRepository)
    private freeCurrencyConversionExchangeRateRepository: FreeCurrencyConversionExchangeRateRepository
  ) {}

  getSpotPrice(fromCurrency: string, toCurrency: string): Observable<number> {
    this.logger.log({
      message: 'Get spot price',
      fromCurrency,
      toCurrency
    })

    return this.freeCurrencyConversionExchangeRateRepository
      .getSpotPrice(fromCurrency, toCurrency)
      .pipe(
        catchError(() => {
          this.logger.log({
            message: 'Failed to get spot price. Falling back to another exchange rate',
            fromCurrency,
            toCurrency
          })

          return this.hostExchangeRateRepository.getSpotPrice(fromCurrency, toCurrency)
        })
      )
  }
}
