import { JSBD } from '../../src/jsbd'

test('"100" greaterThanOrEqual "100.000"', () => {
  let a = JSBD.BigDecimal('100')
  let b = JSBD.BigDecimal('100.000')
  expect(JSBD.greaterThanOrEqual(a, b)).toBeTruthy()
})

test('"1.44" greaterThanOrEqual "0.44"', () => {
  let a = JSBD.BigDecimal('1.44')
  let b = JSBD.BigDecimal('0.44')
  expect(JSBD.greaterThanOrEqual(a, b)).toBeTruthy()
})

test('"1.001" greaterThanOrEqual "0.440"', () => {
  let a = JSBD.BigDecimal('1.001')
  let b = JSBD.BigDecimal('0.440')
  expect(JSBD.greaterThanOrEqual(a, b)).toBeTruthy()
})

test('"56.78" greaterThanOrEqual "8885"', () => {
  let a = JSBD.BigDecimal('56.78')
  let b = JSBD.BigDecimal('8885')
  expect(JSBD.greaterThanOrEqual(a, b)).toBeFalsy()
})

test('"506.78" greaterThanOrEqual "18585"', () => {
  let a = JSBD.BigDecimal('506.78')
  let b = JSBD.BigDecimal('18585')
  expect(JSBD.greaterThanOrEqual(a, b)).toBeFalsy()
})

test('"20000000000" greaterThanOrEqual "200"', () => {
  let a = JSBD.BigDecimal('20000000000')
  let b = JSBD.BigDecimal('200')
  expect(JSBD.greaterThanOrEqual(a, b)).toBeTruthy()
})
