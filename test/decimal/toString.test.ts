import { Decimal } from '../../src/decimal'

// normal number input
test('"0" toString', () => {
  let a = new Decimal('0.')
  expect(a.toString()).toBe('0')
})

test('"0.01" toString', () => {
  let a = new Decimal('.01')
  expect(a.toString()).toBe('0.01')
})

test('"0.03" toString', () => {
  let a = new Decimal('0.03000')
  expect(a.toString()).toBe('0.03')
})

test('"100" toString', () => {
  let a = new Decimal('100')
  expect(a.toString()).toBe('100')
})

test('"100.00" toString', () => {
  let a = new Decimal('100.00')
  expect(a.toString()).toBe('100')
})

test('"123800" toString', () => {
  let a = new Decimal('123800')
  expect(a.toString()).toBe('123800')
})

test('"123.456" toString', () => {
  let a = new Decimal(123.456)
  expect(a.toString()).toBe('123.456')
})

test('"123n" toString', () => {
  let a = new Decimal(123n)
  expect(a.toString()).toBe('123')
})

test('"123.096" toString', () => {
  let a = new Decimal('123.096')
  expect(a.toString()).toBe('123.096')
})

test('"101.005" toString', () => {
  let a = new Decimal('101.005')
  expect(a.toString()).toBe('101.005')
})

// scientific notation input
test('+0e-32', () => {
  expect(new Decimal('+0e-32').toString()).toBe('0')
})
test('-0e+32', () => {
  expect(new Decimal('-0e+32').toString()).toBe('0')
})
test('0.000e43', () => {
  expect(new Decimal('0.000e43').toString()).toBe('0')
})
test('1.1e2', () => {
  expect(new Decimal('1.1e2').toString()).toBe('110')
})
test('1234E-3', () => {
  expect(new Decimal('1234E-3').toString()).toBe('1.234')
})
test('1234E-4', () => {
  expect(new Decimal('1234E-4').toString()).toBe('0.1234')
})
test('1234E-5', () => {
  expect(new Decimal('1234E-5').toString()).toBe('0.01234')
})

test('200.e2', () => {
  expect(new Decimal('200.e2').toString()).toBe('20000')
})
test('1180e0', () => {
  expect(new Decimal('1180e0').toString()).toBe('1180')
})
test('-3.65E2', () => {
  expect(new Decimal('-3.65E2').toString()).toBe('-365')
})
test('-115E-5', () => {
  expect(new Decimal('-115E-5').toString()).toBe('-0.00115')
})

test('-115E3', () => {
  expect(new Decimal('-115E3').toString()).toBe('-115000')
})

test('134E2', () => {
  expect(new Decimal('134E2').toString()).toBe('13400')
})

// bigint input
test('1540n', () => {
  expect(new Decimal(1540n).toString()).toBe('1540')
})

// number input
test('4.56', () => {
  expect(new Decimal('4.56').toString()).toBe('4.56')
})

// readme eg
test('0.55', () => {
  expect(new Decimal('0.55').toString()).toBe('0.55')
})
