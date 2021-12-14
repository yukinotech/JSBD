import { JSBD } from '../../dist/bigint/jsbd.js'

test('"100" lessThanOrEqual "76"', () => {
  let a = JSBD.BigDecimal('100')
  let b = JSBD.BigDecimal('76')
  expect(JSBD.lessThanOrEqual(a, b)).toBeFalsy()
})

test('"1.44" lessThanOrEqual "0.12"', () => {
  let a = JSBD.BigDecimal('1.44')
  let b = JSBD.BigDecimal('0.12')
  expect(JSBD.lessThanOrEqual(a, b)).toBeFalsy()
})

test('"0.23" lessThanOrEqual "0.23000"', () => {
  let a = JSBD.BigDecimal('0.23')
  let b = JSBD.BigDecimal('0.23000')
  expect(JSBD.lessThanOrEqual(a, b)).toBeTruthy()
})

test('"100" lessThanOrEqual "2000000"', () => {
  let a = JSBD.BigDecimal('100')
  let b = JSBD.BigDecimal('2000000')
  expect(JSBD.lessThanOrEqual(a, b)).toBeTruthy()
})

test('"100" lessThanOrEqual "100"', () => {
  let a = JSBD.BigDecimal('100')
  let b = JSBD.BigDecimal('100')
  expect(JSBD.lessThanOrEqual(a, b)).toBeTruthy()
})
