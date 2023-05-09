import { Module } from '@nestjs/common'
import { ExchangeRateController } from './controller/exchange-rate.controller'
import { ExchangeRateService } from './service/exchange-rate.service'
import { ExchangeHostClient } from './client/exchange-host.client'
import { HttpModule } from '@nestjs/axios'
import { HostExchangeRateRepository } from './repository/host-exchange-rate.repository'
import { ExchangeRateRepositoryToken } from './repository/exchange-rate.repository'

@Module({
  imports: [HttpModule],
  controllers: [ExchangeRateController],
  providers: [
    ExchangeRateService,
    ExchangeHostClient,
    HostExchangeRateRepository,
    {
      provide: ExchangeRateRepositoryToken,
      useExisting: HostExchangeRateRepository
    }
  ]
})
export class AppModule {}
