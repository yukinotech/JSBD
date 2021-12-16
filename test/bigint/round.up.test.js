import { JSBD } from '../../dist/bigint/jsbd.js'

// BigDecimal = 0
test('"0.000" round up "-1"', () => {
  let a = JSBD.BigDecimal('0.000')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
      maximumFractionDigits: -1,
    }).toString()
  ).toBe('0')
})

// BigDecimal > 0 && maximumFractionDigits < 0
test('"101" round up "-1"', () => {
  let a = JSBD.BigDecimal('101')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
      maximumFractionDigits: -1,
    }).toString()
  ).toBe('110')
})

test('"110" round up "-2"', () => {
  let a = JSBD.BigDecimal('101')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
      maximumFractionDigits: -2,
    }).toString()
  ).toBe('200')
})

test('"101" round up "-3"', () => {
  let a = JSBD.BigDecimal('101')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
      maximumFractionDigits: -3,
    }).toString()
  ).toBe('1000')
})

test('"101" round up "-4"', () => {
  let a = JSBD.BigDecimal('101')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
      maximumFractionDigits: -4,
    }).toString()
  ).toBe('10000')
})

// BigDecimal > 0 && maximumFractionDigits >= 0

test('"101.6987" round up "1"', () => {
  let a = JSBD.BigDecimal('101.6987')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
      maximumFractionDigits: 1,
    }).toString()
  ).toBe('101.7')
})

test('"110.001" round up "2"', () => {
  let a = JSBD.BigDecimal('110.001')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
      maximumFractionDigits: 2,
    }).toString()
  ).toBe('110.01')
})

test('"101.005" round up "0"', () => {
  let a = JSBD.BigDecimal('101.005')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
      maximumFractionDigits: 0,
    }).toString()
  ).toBe('102')
})

test('"101.34" round up "4"', () => {
  let a = JSBD.BigDecimal('101.34')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
      maximumFractionDigits: 4,
    }).toString()
  ).toBe('101.34')
})

// BigDecimal < 0 && maximumFractionDigits >= 0

test('"-101.6987" round up "1"', () => {
  let a = JSBD.BigDecimal('-101.6987')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
      maximumFractionDigits: 1,
    }).toString()
  ).toBe('-101.7')
})

test('"-110.001" round up "2"', () => {
  let a = JSBD.BigDecimal('-110.001')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
      maximumFractionDigits: 2,
    }).toString()
  ).toBe('-110.01')
})

test('"-101.005" round up "0"', () => {
  let a = JSBD.BigDecimal('-101.005')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
      maximumFractionDigits: 0,
    }).toString()
  ).toBe('-102')
})

test('"-101.34" round up "4"', () => {
  let a = JSBD.BigDecimal('-101.34')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
      maximumFractionDigits: 4,
    }).toString()
  ).toBe('-101.34')
})

// BigDecimal < 0 && maximumFractionDigits < 0

test('"-101.6987" round up "-1"', () => {
  let a = JSBD.BigDecimal('-101.6987')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
      maximumFractionDigits: -1,
    }).toString()
  ).toBe('-110')
})

test('"-110.001" round up "-2"', () => {
  let a = JSBD.BigDecimal('-110.001')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
      maximumFractionDigits: -2,
    }).toString()
  ).toBe('-200')
})

test('"-101.005" round up "-3"', () => {
  let a = JSBD.BigDecimal('-101.005')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
      maximumFractionDigits: -3,
    }).toString()
  ).toBe('-1000')
})

test('"-901.34" round up "-4"', () => {
  let a = JSBD.BigDecimal('-901.34')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
      maximumFractionDigits: -4,
    }).toString()
  ).toBe('-10000')
})

// without maximumFractionDigits or without option
test('"-901.34" round up with no option', () => {
  let a = JSBD.BigDecimal('-901.34')
  expect(JSBD.round(a).toString()).toBe('-901.34')
})

test('"1.34" round up with no option', () => {
  let a = JSBD.BigDecimal('1.34')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
    }).toString()
  ).toBe('1.34')
})
