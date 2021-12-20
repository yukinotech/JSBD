import { JSBD } from '../../src/jsbd'

test('100 remainder 2', () => {
  let a = JSBD.BigDecimal('100')
  let b = JSBD.BigDecimal('2')
  expect(JSBD.remainder(a, b).toString()).toBe('0')
})

test('-101 remainder -1.3', () => {
  let a = JSBD.BigDecimal('-101')
  let b = JSBD.BigDecimal('-1.3')
  expect(JSBD.remainder(a, b).toString()).toBe('-0.9')
})

test('-101 remainder 1.3', () => {
  let a = JSBD.BigDecimal('-101')
  let b = JSBD.BigDecimal('1.3')
  expect(JSBD.remainder(a, b).toString()).toBe('-0.9')
})

test('101 remainder -1.3', () => {
  let a = JSBD.BigDecimal('101')
  let b = JSBD.BigDecimal('-1.3')
  expect(JSBD.remainder(a, b).toString()).toBe('0.9')
})

test('101 remainder 1.3', () => {
  let a = JSBD.BigDecimal('101')
  let b = JSBD.BigDecimal('1.3')
  expect(JSBD.remainder(a, b).toString()).toBe('0.9')
})

test('11.5 remainder 0.6', () => {
  let a = JSBD.BigDecimal('11.5')
  let b = JSBD.BigDecimal('0.4')
  expect(
    JSBD.remainder(a, b, {
      maximumFractionDigits: 0,
    }).toString()
  ).toBe('0')
})
