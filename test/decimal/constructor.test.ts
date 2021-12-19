import { Decimal } from '../../src/decimal'

// error type
test('with a object', () => {
  expect(() => {
    // @ts-ignore
    new Decimal({})
  }).toThrowError()
})

// useless string
test('useless string', () => {
  expect(() => {
    new Decimal('054.54')
  }).toThrowError()
})
