import { JSBD } from '../../dist/bigint/jsbd.js'

// BigDecimal = 0
test('"0.000" round down "-1"', () => {
  let a = JSBD.BigDecimal('0.000')
  expect(
    JSBD.round(a, {
      roundingMode: 'down',
      maximumFractionDigits: -1,
    }).toString()
  ).toBe('0')
})

// BigDecimal > 0 && maximumFractionDigits < 0
test('"101" round down "-1"', () => {
  let a = JSBD.BigDecimal('101')
  expect(
    JSBD.round(a, {
      roundingMode: 'down',
      maximumFractionDigits: -1,
    }).toString()
  ).toBe('100')
})

test('"110" round down "-2"', () => {
  let a = JSBD.BigDecimal('101')
  expect(
    JSBD.round(a, {
      roundingMode: 'down',
      maximumFractionDigits: -2,
    }).toString()
  ).toBe('100')
})

test('"101" round down "-3"', () => {
  let a = JSBD.BigDecimal('101')
  expect(
    JSBD.round(a, {
      roundingMode: 'down',
      maximumFractionDigits: -3,
    }).toString()
  ).toBe('0')
})

test('"101" round down "-4"', () => {
  let a = JSBD.BigDecimal('101')
  expect(
    JSBD.round(a, {
      roundingMode: 'down',
      maximumFractionDigits: -4,
    }).toString()
  ).toBe('0')
})
