export interface ExchangeRateRepository {
  getSpotPrice(fromCurrency: string, toCurrency: string): Promise<number>
}

export const ExchangeRateRepositoryToken = Symbol('ExchangeRateRepository')
