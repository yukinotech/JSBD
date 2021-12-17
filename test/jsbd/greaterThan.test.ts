import { JSBD } from '../../src/jsbd'

test('"100" greaterThan "100.000"', () => {
  let a = JSBD.BigDecimal('100')
  let b = JSBD.BigDecimal('100.000')
  expect(JSBD.greaterThan(a, b)).toBeFalsy()
})

test('"1.44" greaterThan "0.44"', () => {
  let a = JSBD.BigDecimal('1.44')
  let b = JSBD.BigDecimal('0.44')
  expect(JSBD.greaterThan(a, b)).toBeTruthy()
})

test('"1.001" greaterThan "0.440"', () => {
  let a = JSBD.BigDecimal('1.001')
  let b = JSBD.BigDecimal('0.440')
  expect(JSBD.greaterThan(a, b)).toBeTruthy()
})

test('"56.78" greaterThan "8885"', () => {
  let a = JSBD.BigDecimal('56.78')
  let b = JSBD.BigDecimal('8885')
  expect(JSBD.greaterThan(a, b)).toBeFalsy()
})

test('"506.78" greaterThan "18585"', () => {
  let a = JSBD.BigDecimal('506.78')
  let b = JSBD.BigDecimal('18585')
  expect(JSBD.greaterThan(a, b)).toBeFalsy()
})

test('"20000000000" greaterThan "200"', () => {
  let a = JSBD.BigDecimal('20000000000')
  let b = JSBD.BigDecimal('200')
  expect(JSBD.greaterThan(a, b)).toBeTruthy()
})
