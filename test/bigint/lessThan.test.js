import { JSBD } from '../../dist/bigint/jsbd.js'

test('"100" lessThan "76"', () => {
  let a = JSBD.BigDecimal('100')
  let b = JSBD.BigDecimal('76')
  expect(JSBD.lessThan(a, b)).toBeFalsy()
})

test('"1.44" lessThan "0.12"', () => {
  let a = JSBD.BigDecimal('1.44')
  let b = JSBD.BigDecimal('0.12')
  expect(JSBD.lessThan(a, b)).toBeFalsy()
})

test('"0.23" lessThan "0.98"', () => {
  let a = JSBD.BigDecimal('0.23')
  let b = JSBD.BigDecimal('0.98')
  expect(JSBD.lessThan(a, b)).toBeTruthy()
})

test('"100" lessThan "200"', () => {
  let a = JSBD.BigDecimal('100')
  let b = JSBD.BigDecimal('200')
  expect(JSBD.lessThan(a, b)).toBeTruthy()
})

test('"100" lessThan "100"', () => {
  let a = JSBD.BigDecimal('100')
  let b = JSBD.BigDecimal('100')
  expect(JSBD.lessThan(a, b)).toBeFalsy()
})
