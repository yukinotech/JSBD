import { JSBD } from '../../src/jsbd'

test('"100" multiply "100.000"', () => {
  let a = JSBD.BigDecimal('100')
  let b = JSBD.BigDecimal('100.000')
  expect(JSBD.multiply(a, b).toString()).toBe('10000')
})

test('"0.44" multiply "-0.4400"', () => {
  let a = JSBD.BigDecimal('0.44')
  let b = JSBD.BigDecimal('-0.4400')
  expect(JSBD.multiply(a, b).toString()).toBe('-0.1936')
})

test('"1.25" multiply "644e-2"', () => {
  let a = JSBD.BigDecimal('1.25')
  let b = JSBD.BigDecimal('644e-2')
  expect(JSBD.multiply(a, b).toString()).toBe('8.05')
})

test('"3.45" multiply "100.55"', () => {
  let a = JSBD.BigDecimal('3.45')
  let b = JSBD.BigDecimal('100.55')
  expect(JSBD.multiply(a, b).toString()).toBe('346.8975')
})

test('"-456" multiply "-98"', () => {
  let a = JSBD.BigDecimal('-456')
  let b = JSBD.BigDecimal('-98')
  expect(JSBD.multiply(a, b).toString()).toBe('44688')
})

test('"2e4" multiply "2e6"', () => {
  let a = JSBD.BigDecimal('2e4')
  let b = JSBD.BigDecimal('2e6')
  expect(JSBD.multiply(a, b).toString()).toBe('40000000000')
})

test('"78" multiply "56.55"', () => {
  let a = JSBD.BigDecimal('78')
  let b = JSBD.BigDecimal('56.55')
  expect(
    JSBD.multiply(a, b, {
      maximumFractionDigits: 0,
      roundingMode: 'half up',
    }).toString()
    // 4410.9
  ).toBe('4411')
})

test('"7.89" multiply "5.67"', () => {
  let a = JSBD.BigDecimal('7.89')
  let b = JSBD.BigDecimal('5.67')
  expect(
    JSBD.multiply(a, b, {
      maximumFractionDigits: 1,
      roundingMode: 'half up',
    }).toString()
    // 44.7363
  ).toBe('44.7')
})
