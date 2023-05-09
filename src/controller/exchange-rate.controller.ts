import { Controller, Get, Inject, Query } from '@nestjs/common'
import { Observable, map } from 'rxjs'
import { ExchangeRateService } from 'src/service/exchange-rate.service'

@Controller('exchange-rate')
export class ExchangeRateController {
  constructor(@Inject(ExchangeRateService) private service: ExchangeRateService) {}

  @Get('/spot-price')
  getSpotPrice(
    @Query('fromCurrency') fromCurrency: string,
    @Query('toCurrency') toCurrency: string
  ): Observable<{ spotPrice: number }> {
    return this.service.getSpotPrice(fromCurrency, toCurrency).pipe(
      map((spotPrice) => ({
        spotPrice
      }))
    )
  }
}
