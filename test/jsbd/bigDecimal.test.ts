import { JSBD } from '../../src/jsbd'

test('copy Decimal a', () => {
  let a = JSBD.BigDecimal('100')
  let b = JSBD.BigDecimal(a)
  expect(JSBD.equal(a, b)).toBe(true)
})
