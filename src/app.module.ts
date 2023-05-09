import { Module } from '@nestjs/common'
import { ExchangeRateController } from './controller/exchange-rate.controller'
import { ExchangeRateService } from './service/exchange-rate.service'
import { ExchangeHostClient } from './client/exchange-host.client'
import { HttpModule } from '@nestjs/axios'
import { HostExchangeRateRepository } from './repository/host-exchange-rate.repository'
import { ExchangeRateRepositoryToken } from './repository/exchange-rate.repository'
import { FreeCurrencyConversionExchangeRateRepository } from './repository/free-currency-conversion-exchange-rate.repository'
import { FreeCurrencyConversionClient } from './client/free-currency-conversion.client'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [ExchangeRateController],
  providers: [
    ExchangeRateService,
    ExchangeHostClient,
    FreeCurrencyConversionClient,
    HostExchangeRateRepository,
    FreeCurrencyConversionExchangeRateRepository,
    {
      provide: ExchangeRateRepositoryToken,
      useClass: FreeCurrencyConversionExchangeRateRepository
      // useExisting: HostExchangeRateRepository
    }
  ]
})
export class AppModule {}
