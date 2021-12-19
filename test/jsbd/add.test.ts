import { JSBD } from '../../src/jsbd'

test('"100" add "100.000"', () => {
  let a = JSBD.BigDecimal('100')
  let b = JSBD.BigDecimal('100.000')
  expect(JSBD.add(a, b).toString()).toBe('200')
})

test('"0.44" add "-0.4400"', () => {
  let a = JSBD.BigDecimal('0.44')
  let b = JSBD.BigDecimal('-0.4400')
  expect(JSBD.add(a, b).toString()).toBe('0')
})

test('"1.25" add "6.44"', () => {
  let a = JSBD.BigDecimal('1.25')
  let b = JSBD.BigDecimal('644e-2')
  expect(JSBD.add(a, b).toString()).toBe('7.69')
})

test('"3.45" add "100.55"', () => {
  let a = JSBD.BigDecimal('3.45')
  let b = JSBD.BigDecimal('100.55')
  expect(JSBD.add(a, b).toString()).toBe('104')
})

test('"-456" add "-98"', () => {
  let a = JSBD.BigDecimal('-456')
  let b = JSBD.BigDecimal('-98')
  expect(JSBD.add(a, b).toString()).toBe('-554')
})

test('"2e4" add "2e6"', () => {
  let a = JSBD.BigDecimal('2e4')
  let b = JSBD.BigDecimal('2e6')
  expect(JSBD.add(a, b).toString()).toBe('2020000')
})

test('"78" add "56.55"', () => {
  let a = JSBD.BigDecimal('78')
  let b = JSBD.BigDecimal('56.55')
  expect(
    JSBD.add(a, b, {
      maximumFractionDigits: 1,
      roundingMode: 'half up',
    }).toString()
  ).toBe('134.6')
})

test('"67.89" add "10055"', () => {
  let a = JSBD.BigDecimal('67.89')
  let b = JSBD.BigDecimal('10055')
  expect(
    JSBD.add(a, b, {
      maximumFractionDigits: 1,
      roundingMode: 'half up',
    }).toString()
  ).toBe('10122.9')
})
