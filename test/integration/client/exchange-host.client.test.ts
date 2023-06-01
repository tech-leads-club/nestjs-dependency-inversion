import { HttpStatus } from '@nestjs/common'
import * as nock from 'nock'
import { ExchangeHostClient } from '../../../src/client/exchange-host.client'
import { LATEST_RATES_RESPONSE } from '../fixture/exchange-host'
import { Test, TestingModule } from '@nestjs/testing'
import { HttpModule } from '@nestjs/axios'
import { ZodError } from 'zod'

describe('ExchangeHostClient', () => {
  let client: ExchangeHostClient

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [ExchangeHostClient]
    }).compile()

    client = module.get<ExchangeHostClient>(ExchangeHostClient)
  })

  describe('getLatestRates', () => {
    test('resolves with the latest rates', async () => {
      nock(ExchangeHostClient.BASE_URL)
        .get('/latest')
        .query({
          base: 'EUR'
        })
        .reply(HttpStatus.OK, LATEST_RATES_RESPONSE)

      const rates = await client.getLatestRates('EUR')

      expect(rates).toEqual(LATEST_RATES_RESPONSE.rates)
    })

    test('coerces currency code from lower to upper case', async () => {
      nock(ExchangeHostClient.BASE_URL)
        .get('/latest')
        .query({
          base: 'EUR'
        })
        .reply(HttpStatus.OK, {
          ...LATEST_RATES_RESPONSE,
          base: 'EUR',
          rates: {
            ...LATEST_RATES_RESPONSE.rates,
            foo: 1.2
          }
        })

      const rates = await client.getLatestRates('EUR')

      expect(rates.FOO).toEqual(1.2)
    })

    test('throws an exception when rates is invalid', () => {
      nock(ExchangeHostClient.BASE_URL)
        .get('/latest')
        .query({
          base: 'EUR'
        })
        .reply(HttpStatus.OK, {
          ...LATEST_RATES_RESPONSE,
          rates: undefined
        })

      return expect(() => client.getLatestRates('EUR')).rejects.toThrow(ZodError)
    })

    test('throws an exception when currency code is bigger than 3 characters', () => {
      nock(ExchangeHostClient.BASE_URL)
        .get('/latest')
        .query({
          base: 'EUR'
        })
        .reply(HttpStatus.OK, {
          ...LATEST_RATES_RESPONSE,
          base: 'FOOBAR',
          rates: {
            ...LATEST_RATES_RESPONSE.rates,
            FOOBAR: 1.2
          }
        })

      return expect(() => client.getLatestRates('EUR')).rejects.toThrow(ZodError)
    })

    test('throws an exception when currency code is smaller than 3 characters', () => {
      nock(ExchangeHostClient.BASE_URL)
        .get('/latest')
        .query({
          base: 'EUR'
        })
        .reply(HttpStatus.OK, {
          ...LATEST_RATES_RESPONSE,
          base: 'EUR',
          rates: {
            ...LATEST_RATES_RESPONSE.rates,
            FO: 1.2
          }
        })

      return expect(() => client.getLatestRates('EUR')).rejects.toThrow(ZodError)
    })

    test('throws an exception when rate amount is less than zero', () => {
      nock(ExchangeHostClient.BASE_URL)
        .get('/latest')
        .query({
          base: 'EUR'
        })
        .reply(HttpStatus.OK, {
          ...LATEST_RATES_RESPONSE,
          base: 'EUR',
          rates: {
            ...LATEST_RATES_RESPONSE.rates,
            FOO: -99
          }
        })

      return expect(() => client.getLatestRates('EUR')).rejects.toThrow(ZodError)
    })
  })
})
