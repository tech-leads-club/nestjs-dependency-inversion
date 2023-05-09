import { Module } from '@nestjs/common'
import { ExchangeRateController } from './controller/exchange-rate.controller'
import { ExchangeRateServiceToken } from './service/exchange-rate.service'
import { ExchangeHostClient } from './client/exchange-host.client'
import { HttpModule } from '@nestjs/axios'
import { HostExchangeRateRepository } from './repository/host-exchange-rate.repository'
import { ExchangeRateRepositoryToken } from './repository/exchange-rate.repository'
import { FreeCurrencyConversionExchangeRateRepository } from './repository/free-currency-conversion-exchange-rate.repository'
import { FreeCurrencyConversionClient } from './client/free-currency-conversion.client'
import { ConfigModule } from '@nestjs/config'
import { RedundantExchangeRateService } from './service/redundant-exchange-rate.service'

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [ExchangeRateController],
  providers: [
    ExchangeHostClient,
    FreeCurrencyConversionClient,
    HostExchangeRateRepository,
    FreeCurrencyConversionExchangeRateRepository,
    {
      provide: ExchangeRateServiceToken,
      useClass: RedundantExchangeRateService
    },
    {
      // Used by SimpleExchangeRateService in the first example.
      provide: ExchangeRateRepositoryToken,
      useClass: HostExchangeRateRepository
    }
  ]
})
export class AppModule {}
