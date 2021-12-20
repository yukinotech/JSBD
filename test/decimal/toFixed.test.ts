import { Decimal } from '../../src/decimal'

// normal number input
test('"0" toFixed', () => {
  let a = new Decimal('0.')
  expect(a.toFixed()).toBe('0')
})

test('"0.01" toFixed', () => {
  let a = new Decimal('0.01')
  expect(a.toFixed(1)).toBe('0.0')
})

test('"1.15" toFixed', () => {
  let a = new Decimal('1.15')
  expect(a.toFixed(1)).toBe('1.2')
})

test('"1.05" toFixed', () => {
  let a = new Decimal('1.05')
  expect(a.toFixed(4)).toBe('1.0500')
})

test('"-1.05" toFixed', () => {
  let a = new Decimal('-1.05')
  expect(a.toFixed(4)).toBe('-1.0500')
})

test('"112" toFixed', () => {
  let a = new Decimal('112')
  expect(a.toFixed(3)).toBe('112.000')
})

test('"112" toFixed', () => {
  let a = new Decimal('112')
  expect(a.toFixed()).toBe('112')
})

test('"112.5" toFixed', () => {
  let a = new Decimal('112.5')
  expect(a.toFixed()).toBe('113')
})

test('toFixed error params', () => {
  let a = new Decimal('112.5')
  expect(() => {
    a.toFixed(-1)
  }).toThrowError()
})
