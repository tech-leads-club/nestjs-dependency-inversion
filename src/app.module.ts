import { Module } from '@nestjs/common'
import { ExchangeRateController } from './controller/exchange-rate.controller'
import { ExchangeRateService } from './service/exchange-rate.service'
import { ExchangeHostClient } from './client/exchange-host.client'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [HttpModule],
  controllers: [ExchangeRateController],
  providers: [ExchangeRateService, ExchangeHostClient]
})
export class AppModule {}
