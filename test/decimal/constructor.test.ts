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

// Infinity, -Infinity, NaN case
test('Infinity', () => {
  expect(() => {
    // @ts-ignore
    let a = new Decimal(Infinity)
  }).toThrowError()
})
test('-Infinity', () => {
  expect(() => {
    // @ts-ignore
    let a = new Decimal(-Infinity)
  }).toThrowError()
})
test('NaN', () => {
  expect(() => {
    // @ts-ignore
    let a = new Decimal(NaN)
  }).toThrowError()
})
