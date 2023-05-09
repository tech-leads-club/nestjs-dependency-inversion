import { Inject, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import {
  ExchangeRateRepository,
  ExchangeRateRepositoryToken
} from 'src/repository/exchange-rate.repository'

@Injectable()
export class ExchangeRateService {
  constructor(
    @Inject(ExchangeRateRepositoryToken) private repository: ExchangeRateRepository
  ) {}

  getSpotPrice(fromCurrency: string, toCurrency: string): Observable<number> {
    return this.repository.getSpotPrice(fromCurrency, toCurrency)
  }
}
