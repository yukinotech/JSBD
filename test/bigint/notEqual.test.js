import { JSBD } from '../../dist/bigint/jsbd.js'

test('"100" notEqual "100.000"', () => {
  let a = JSBD.BigDecimal('100')
  let b = JSBD.BigDecimal('100.000')
  expect(JSBD.notEqual(a, b)).toBeFalsy()
})

test('"1.44" notEqual "0.4400"', () => {
  let a = JSBD.BigDecimal('1.44')
  let b = JSBD.BigDecimal('0.4400')
  expect(JSBD.notEqual(a, b)).toBeTruthy()
})

test('"-0.44" notEqual "0.4400"', () => {
  let a = JSBD.BigDecimal('-0.44')
  let b = JSBD.BigDecimal('0.4400')
  expect(JSBD.notEqual(a, b)).toBeTruthy()
})

test('"200" notEqual "200"', () => {
  let a = JSBD.BigDecimal('200')
  let b = JSBD.BigDecimal('200')
  expect(JSBD.notEqual(a, b)).toBeFalsy()
})
