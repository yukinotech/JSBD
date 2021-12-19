import { JSBD } from '../../src/jsbd'

test('"100" subtract "100.000"', () => {
  let a = JSBD.BigDecimal('100')
  let b = JSBD.BigDecimal('100.000')
  expect(JSBD.subtract(a, b).toString()).toBe('0')
})

test('"0.44" subtract "-0.4400"', () => {
  let a = JSBD.BigDecimal('0.44')
  let b = JSBD.BigDecimal('-0.4400')
  expect(JSBD.subtract(a, b).toString()).toBe('0.88')
})

test('"1.25" subtract "6.44"', () => {
  let a = JSBD.BigDecimal('1.25')
  let b = JSBD.BigDecimal('644e-2')
  expect(JSBD.subtract(a, b).toString()).toBe('-5.19')
})

test('"3.45" subtract "100.55"', () => {
  let a = JSBD.BigDecimal('3.45')
  let b = JSBD.BigDecimal('100.55')
  expect(JSBD.subtract(a, b).toString()).toBe('-97.1')
})

test('"-456" subtract "-98"', () => {
  let a = JSBD.BigDecimal('-456')
  let b = JSBD.BigDecimal('-98')
  expect(JSBD.subtract(a, b).toString()).toBe('-358')
})

test('"2e4" subtract "2e6"', () => {
  let a = JSBD.BigDecimal('2e4')
  let b = JSBD.BigDecimal('2e6')
  expect(JSBD.subtract(a, b).toString()).toBe('-1980000')
})

test('"78" subtract "56.55"', () => {
  let a = JSBD.BigDecimal('78')
  let b = JSBD.BigDecimal('56.55')
  expect(
    JSBD.subtract(a, b, {
      maximumFractionDigits: 1,
      roundingMode: 'half up',
    }).toString()
  ).toBe('21.5')
})

test('"67.89" subtract "10055"', () => {
  let a = JSBD.BigDecimal('67.89')
  let b = JSBD.BigDecimal('10055')
  expect(
    JSBD.subtract(a, b, {
      maximumFractionDigits: 1,
      roundingMode: 'half up',
    }).toString()
  ).toBe('-9987.1')
})
