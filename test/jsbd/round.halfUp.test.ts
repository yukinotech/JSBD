import { JSBD } from '../../src/jsbd'

// BigDecimal = 0
test('"0.000" round half up "-1"', () => {
  let a = JSBD.BigDecimal('0.000')
  expect(
    JSBD.round(a, {
      roundingMode: 'half up',
      maximumFractionDigits: -1,
    }).toString()
  ).toBe('0')
})

// BigDecimal > 0 && maximumFractionDigits < 0
test('"111" round half up "-1"', () => {
  let a = JSBD.BigDecimal('111')
  expect(
    JSBD.round(a, {
      roundingMode: 'half up',
      maximumFractionDigits: -1,
    }).toString()
  ).toBe('110')
})

test('"111" round half up "-2"', () => {
  let a = JSBD.BigDecimal('111')
  expect(
    JSBD.round(a, {
      roundingMode: 'half up',
      maximumFractionDigits: -2,
    }).toString()
  ).toBe('100')
})

test('"101" round half up "-3"', () => {
  let a = JSBD.BigDecimal('101')
  expect(
    JSBD.round(a, {
      roundingMode: 'half up',
      maximumFractionDigits: -3,
    }).toString()
  ).toBe('0')
})

// BigDecimal > 0 && maximumFractionDigits >= 0

test('"101.6987" round half up "1"', () => {
  let a = JSBD.BigDecimal('101.6987')
  expect(
    JSBD.round(a, {
      roundingMode: 'half up',
      maximumFractionDigits: 1,
    }).toString()
  ).toBe('101.7')
})

test('"110.001" round half up "2"', () => {
  let a = JSBD.BigDecimal('110.001')
  expect(
    JSBD.round(a, {
      roundingMode: 'half up',
      maximumFractionDigits: 2,
    }).toString()
  ).toBe('110')
})

test('"101.005" round half up "2"', () => {
  let a = JSBD.BigDecimal('101.005')
  expect(
    JSBD.round(a, {
      roundingMode: 'half up',
      maximumFractionDigits: 2,
    }).toString()
  ).toBe('101.01')
})

test('"101.34" round half up "4"', () => {
  let a = JSBD.BigDecimal('101.34')
  expect(
    JSBD.round(a, {
      roundingMode: 'half up',
      maximumFractionDigits: 4,
    }).toString()
  ).toBe('101.34')
})

// BigDecimal < 0 && maximumFractionDigits >= 0

test('"-101.6987" round half up "1"', () => {
  let a = JSBD.BigDecimal('-101.6987')
  expect(
    JSBD.round(a, {
      roundingMode: 'half up',
      maximumFractionDigits: 1,
    }).toString()
  ).toBe('-101.7')
})

test('"-110.05" round half up "1"', () => {
  let a = JSBD.BigDecimal('-110.05')
  expect(
    JSBD.round(a, {
      roundingMode: 'half up',
      maximumFractionDigits: 1,
    }).toString()
  ).toBe('-110.1')
})

test('"-101.55" round half up "1"', () => {
  let a = JSBD.BigDecimal('-101.55')
  expect(
    JSBD.round(a, {
      roundingMode: 'half up',
      maximumFractionDigits: 1,
    }).toString()
  ).toBe('-101.6')
})

test('"-101.34" round half up "4"', () => {
  let a = JSBD.BigDecimal('-101.34')
  expect(
    JSBD.round(a, {
      roundingMode: 'half up',
      maximumFractionDigits: 4,
    }).toString()
  ).toBe('-101.34')
})

// BigDecimal < 0 && maximumFractionDigits < 0

test('"-101.6987" round half up "-1"', () => {
  let a = JSBD.BigDecimal('-101.6987')
  expect(
    JSBD.round(a, {
      roundingMode: 'half up',
      maximumFractionDigits: -1,
    }).toString()
  ).toBe('-100')
})

test('"-105.001" round half up "-1"', () => {
  let a = JSBD.BigDecimal('-110.001')
  expect(
    JSBD.round(a, {
      roundingMode: 'half up',
      maximumFractionDigits: -1,
    }).toString()
  ).toBe('-110')
})

test('"-101.005" round half up "-3"', () => {
  let a = JSBD.BigDecimal('-101.005')
  expect(
    JSBD.round(a, {
      roundingMode: 'half up',
      maximumFractionDigits: -3,
    }).toString()
  ).toBe('0')
})

test('"-901.34" round half up "-4"', () => {
  let a = JSBD.BigDecimal('-901.34')
  expect(
    JSBD.round(a, {
      roundingMode: 'half up',
      maximumFractionDigits: -4,
    }).toString()
  ).toBe('0')
})

// without maximumFractionDigits or without option
test('"-901.34" round half up with no option', () => {
  let a = JSBD.BigDecimal('-901.34')
  expect(JSBD.round(a).toString()).toBe('-901.34')
})

test('"1.34" round half up with no option', () => {
  let a = JSBD.BigDecimal('1.34')
  expect(
    JSBD.round(a, {
      roundingMode: 'half up',
    }).toString()
  ).toBe('1.34')
})

// with wrong params
// test('"-901.34" round half up with no option', () => {
//   let a = JSBD.BigDecimal('-901.34')
//   expect(JSBD.round(a, {}).toString()).toBe('-901.34')
// })

// test('"1.34" round half up with no option', () => {
//   let a = JSBD.BigDecimal('1.34')
//   expect(
//     JSBD.round(a, {
//       roundingMode: 'half up',
//     }).toString()
//   ).toBe('1.34')
// })
