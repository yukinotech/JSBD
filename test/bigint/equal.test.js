import { JSBD } from '../../dist/bigint/jsbd.js'

test('"100" isEqual "100.000"', () => {
  let a = JSBD.BigDecimal('100')
  let b = JSBD.BigDecimal('100.000')
  expect(JSBD.equal(a, b)).toBeTruthy()
})

test('"0.44" isEqual "0.4400"', () => {
  let a = JSBD.BigDecimal('0.44')
  let b = JSBD.BigDecimal('0.4400')
  expect(JSBD.equal(a, b)).toBeTruthy()
})

test('"-0.44" isEqual "-0.4400"', () => {
  let a = JSBD.BigDecimal('-0.44')
  let b = JSBD.BigDecimal('-0.4400')
  expect(JSBD.equal(a, b)).toBeTruthy()
})

test('"200" isEqual "200"', () => {
  let a = JSBD.BigDecimal('200')
  let b = JSBD.BigDecimal('200')
  expect(JSBD.equal(a, b)).toBeTruthy()
})

test('"20000000" isEqual "2"', () => {
  let a = JSBD.BigDecimal('20000000')
  let b = JSBD.BigDecimal('2')
  expect(JSBD.equal(a, b)).toBeFalsy()
})
