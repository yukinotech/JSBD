import { JSBD } from '../../src/jsbd'

test('"100" pow 2', () => {
  let a = JSBD.BigDecimal('100')
  let b = 2
  expect(JSBD.pow(a, b).toString()).toBe('10000')
})

test('"0.2" pow 3', () => {
  let a = JSBD.BigDecimal('0.2')
  let b = 3
  expect(JSBD.pow(a, b).toString()).toBe('0.008')
})

test('"1.2" pow 3', () => {
  let a = JSBD.BigDecimal('1.2')
  let b = 3
  expect(
    JSBD.pow(a, b, {
      maximumFractionDigits: 1,
      roundingMode: 'half up',
    }).toString()
  ).toBe('1.7')
})

test('"0.2" pow 3', () => {
  let a = JSBD.BigDecimal('0.2')
  let b = '54'

  expect(() => {
    // @ts-ignore
    JSBD.pow(a, b)
  }).toThrowError()
})
