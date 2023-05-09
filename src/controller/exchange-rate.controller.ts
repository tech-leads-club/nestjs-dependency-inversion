import { Controller, Get, Inject, Query } from '@nestjs/common'
import { ExchangeRateService } from 'src/service/exchange-rate.service'

@Controller('exchange-rate')
export class ExchangeRateController {
  constructor(@Inject(ExchangeRateService) private service: ExchangeRateService) {}

  @Get('/spot-price')
  async getSpotPrice(
    @Query('fromCurrency') fromCurrency: string,
    @Query('toCurrency') toCurrency: string
  ): Promise<{ spotPrice: number }> {
    const spotPrice = await this.service.getSpotPrice(fromCurrency, toCurrency)

    return { spotPrice }
  }
}
