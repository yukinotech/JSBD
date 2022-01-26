import { JSBD } from '../../src/jsbd'

// BigDecimal = 0
test('"0.000" round half down "-1"', () => {
  let a = JSBD.BigDecimal('0.000')
  expect(
    JSBD.round(a, {
      roundingMode: 'half down',
      maximumFractionDigits: -1,
    }).toString()
  ).toBe('0')
})

// BigDecimal > 0 && maximumFractionDigits <= 0
test('"1155.4" round half down "-1"', () => {
  let a = JSBD.BigDecimal('1155.4')
  expect(
    JSBD.round(a, {
      roundingMode: 'half down',
      maximumFractionDigits: -1,
    }).toString()
  ).toBe('1160')
})

test('"114.67" round half down "0"', () => {
  let a = JSBD.BigDecimal('114.67')
  expect(
    JSBD.round(a, {
      roundingMode: 'half down',
      maximumFractionDigits: 0,
    }).toString()
  ).toBe('115')
})

test('"101" round half down "-3"', () => {
  let a = JSBD.BigDecimal('101')
  expect(
    JSBD.round(a, {
      roundingMode: 'half down',
      maximumFractionDigits: -3,
    }).toString()
  ).toBe('0')
})

// BigDecimal > 0 && maximumFractionDigits > 0

test('"101.6987" round half down "1"', () => {
  let a = JSBD.BigDecimal('101.6987')
  expect(
    JSBD.round(a, {
      roundingMode: 'half down',
      maximumFractionDigits: 1,
    }).toString()
  ).toBe('101.7')
})

test('"110.006" round half down "2"', () => {
  let a = JSBD.BigDecimal('110.006')
  expect(
    JSBD.round(a, {
      roundingMode: 'half down',
      maximumFractionDigits: 2,
    }).toString()
  ).toBe('110.01')
})

test('"101.005" round half down "2"', () => {
  let a = JSBD.BigDecimal('101.005')
  expect(
    JSBD.round(a, {
      roundingMode: 'half down',
      maximumFractionDigits: 2,
    }).toString()
  ).toBe('101')
})

test('"101.34" round half down "4"', () => {
  let a = JSBD.BigDecimal('101.34')
  expect(
    JSBD.round(a, {
      roundingMode: 'half down',
      maximumFractionDigits: 4,
    }).toString()
  ).toBe('101.34')
})

// BigDecimal < 0 && maximumFractionDigits >= 0

test('"-101.6987" round half down "1"', () => {
  let a = JSBD.BigDecimal('-101.6987')
  expect(
    JSBD.round(a, {
      roundingMode: 'half down',
      maximumFractionDigits: 1,
    }).toString()
  ).toBe('-101.7')
})

test('"-110.05" round half down "1"', () => {
  let a = JSBD.BigDecimal('-110.05')
  expect(
    JSBD.round(a, {
      roundingMode: 'half down',
      maximumFractionDigits: 1,
    }).toString()
  ).toBe('-110')
})

test('"-101.56" round half down "1"', () => {
  let a = JSBD.BigDecimal('-101.56')
  expect(
    JSBD.round(a, {
      roundingMode: 'half down',
      maximumFractionDigits: 1,
    }).toString()
  ).toBe('-101.6')
})

test('"-101.34" round half down "4"', () => {
  let a = JSBD.BigDecimal('-101.34')
  expect(
    JSBD.round(a, {
      roundingMode: 'half down',
      maximumFractionDigits: 4,
    }).toString()
  ).toBe('-101.34')
})

// BigDecimal < 0 && maximumFractionDigits < 0

test('"-101.6987" round half down "-1"', () => {
  let a = JSBD.BigDecimal('-101.6987')
  expect(
    JSBD.round(a, {
      roundingMode: 'half down',
      maximumFractionDigits: -1,
    }).toString()
  ).toBe('-100')
})

test('"-106.001" round half down "-1"', () => {
  let a = JSBD.BigDecimal('-106.001')
  expect(
    JSBD.round(a, {
      roundingMode: 'half down',
      maximumFractionDigits: -1,
    }).toString()
  ).toBe('-110')
})

test('"-101.005" round half down "-3"', () => {
  let a = JSBD.BigDecimal('-101.005')
  expect(
    JSBD.round(a, {
      roundingMode: 'half down',
      maximumFractionDigits: -3,
    }).toString()
  ).toBe('0')
})

// without maximumFractionDigits or without option
test('"-901.34" round half down with no option', () => {
  let a = JSBD.BigDecimal('-901.34')
  expect(JSBD.round(a).toString()).toBe('-901.34')
})

test('"1.34" round half down with no option', () => {
  let a = JSBD.BigDecimal('1.34')
  expect(
    JSBD.round(a, {
      roundingMode: 'half down',
    }).toString()
  ).toBe('1.34')
})
