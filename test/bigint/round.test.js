import { JSBD } from '../../dist/bigint/jsbd.js'

test('"101" round up "-1"', () => {
  let a = JSBD.BigDecimal('101')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
      maximumFractionDigits: -2,
    }).toString()
  ).toBe('101')
})

test('"101" round up "-2"', () => {
  let a = JSBD.BigDecimal('101')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
      maximumFractionDigits: -2,
    }).toString()
  ).toBe('110')
})

test('"101" round up "-3"', () => {
  let a = JSBD.BigDecimal('101')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
      maximumFractionDigits: -3,
    }).toString()
  ).toBe('200')
})

test('"101" round up "-4"', () => {
  let a = JSBD.BigDecimal('101')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
      maximumFractionDigits: -4,
    }).toString()
  ).toBe('1000')
})
