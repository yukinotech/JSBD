import { JSBD } from '../../src/jsbd'

// BigDecimal = 0
test('"0.000" round half even "-1"', () => {
  let a = JSBD.BigDecimal('0.000')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: -1,
    }).toString()
  ).toBe('0')
})

// BigDecimal > 0 && maximumFractionDigits <= 0
test('"1155.4" round half even "-1"', () => {
  let a = JSBD.BigDecimal('1155.4')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: -1,
    }).toString()
  ).toBe('1160')
})

test('"114.67" round half even "0"', () => {
  let a = JSBD.BigDecimal('114.67')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: 0,
    }).toString()
  ).toBe('115')
})

test('"101" round half even "-3"', () => {
  let a = JSBD.BigDecimal('101')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: -3,
    }).toString()
  ).toBe('0')
})

// BigDecimal > 0 && maximumFractionDigits > 0

test('"101.6987" round half even "1"', () => {
  let a = JSBD.BigDecimal('101.6987')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: 1,
    }).toString()
  ).toBe('101.7')
})

test('"110.006" round half even "2"', () => {
  let a = JSBD.BigDecimal('110.006')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: 2,
    }).toString()
  ).toBe('110.01')
})

test('"101.005" round half even "2"', () => {
  let a = JSBD.BigDecimal('101.005')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: 2,
    }).toString()
  ).toBe('101')
})

test('"101.34" round half even "4"', () => {
  let a = JSBD.BigDecimal('101.34')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: 4,
    }).toString()
  ).toBe('101.34')
})

test('"1.5" round half even "0"', () => {
  let a = JSBD.BigDecimal('1.5')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: 0,
    }).toString()
  ).toBe('2')
})

test('"2.5" round half even "0"', () => {
  let a = JSBD.BigDecimal('2.5')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: 0,
    }).toString()
  ).toBe('2')
})

test('"3.5" round half even "0"', () => {
  let a = JSBD.BigDecimal('3.5')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: 0,
    }).toString()
  ).toBe('4')
})

// BigDecimal < 0 && maximumFractionDigits >= 0

test('"-101.6987" round half even "1"', () => {
  let a = JSBD.BigDecimal('-101.6987')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: 1,
    }).toString()
  ).toBe('-101.7')
})

test('"-1.5" round half even "0"', () => {
  let a = JSBD.BigDecimal('-1.5')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: 0,
    }).toString()
  ).toBe('-2')
})

test('"-2.5" round half even "0"', () => {
  let a = JSBD.BigDecimal('-2.5')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: 0,
    }).toString()
  ).toBe('-2')
})

test('"-3.5" round half even "0"', () => {
  let a = JSBD.BigDecimal('-3.5')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: 0,
    }).toString()
  ).toBe('-4')
})

test('"-110.05" round half even "1"', () => {
  let a = JSBD.BigDecimal('-110.05')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: 1,
    }).toString()
  ).toBe('-110')
})

test('"-101.55" round half even "1"', () => {
  let a = JSBD.BigDecimal('-101.55')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: 1,
    }).toString()
  ).toBe('-101.6')
})

test('"-101.34" round half even "4"', () => {
  let a = JSBD.BigDecimal('-101.34')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: 4,
    }).toString()
  ).toBe('-101.34')
})

// BigDecimal < 0 && maximumFractionDigits < 0

test('"-115.6987" round half even "-1"', () => {
  let a = JSBD.BigDecimal('-115.6987')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: -1,
    }).toString()
  ).toBe('-120')
})

test('"-105.001" round half even "-1"', () => {
  let a = JSBD.BigDecimal('-105.001')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: -1,
    }).toString()
  ).toBe('-100')
})

test('"-101.005" round half even "-3"', () => {
  let a = JSBD.BigDecimal('-101.005')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: -3,
    }).toString()
  ).toBe('0')
})
