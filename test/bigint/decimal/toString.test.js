import { JSBD } from '../../../dist/bigint/jsbd.js'

test('"0" toString', () => {
  let a = JSBD.BigDecimal('0.')
  expect(a.toString()).toBe('0')
})

test('"0.01" toString', () => {
  let a = JSBD.BigDecimal('.01')
  expect(a.toString()).toBe('0.01')
})

test('"0.03" toString', () => {
  let a = JSBD.BigDecimal('0.03000')
  expect(a.toString()).toBe('0.03')
})

test('"100" toString', () => {
  let a = JSBD.BigDecimal('100')
  expect(a.toString()).toBe('100')
})

test('"100.00" toString', () => {
  let a = JSBD.BigDecimal('100.00')
  expect(a.toString()).toBe('100')
})

test('"123800" toString', () => {
  let a = JSBD.BigDecimal('123800')
  expect(a.toString()).toBe('123800')
})

test('"123.456" toString', () => {
  let a = JSBD.BigDecimal(123.456)
  expect(a.toString()).toBe('123.456')
})

test('"123.096" toString', () => {
  let a = JSBD.BigDecimal('123.096')
  expect(a.toString()).toBe('123.096')
})

test('"101.005" toString', () => {
  let a = JSBD.BigDecimal('101.005')
  expect(a.toString()).toBe('101.005')
})
