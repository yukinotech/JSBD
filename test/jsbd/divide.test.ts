import { JSBD } from '../../src/jsbd'

test('100 divide 2', () => {
  let a = JSBD.BigDecimal('100')
  let b = JSBD.BigDecimal('2')
  expect(
    JSBD.divide(a, b, {
      maximumFractionDigits: 2,
    }).toString()
  ).toBe('50')
})

test('0.2 divide 3', () => {
  let a = JSBD.BigDecimal('0.2')
  let b = JSBD.BigDecimal('3')
  expect(
    JSBD.divide(a, b, {
      maximumFractionDigits: 4,
      roundingMode: 'half even',
    }).toString()
  ).toBe('0.0667')
})

test('1.2 divide 3', () => {
  let a = JSBD.BigDecimal('1.2')
  let b = JSBD.BigDecimal('3')
  expect(
    JSBD.divide(a, b, {
      maximumFractionDigits: 1,
      roundingMode: 'half up',
    }).toString()
  ).toBe('0.4')
})

test('-0.2 divide 3', () => {
  let a = JSBD.BigDecimal('-0.2')
  let b = JSBD.BigDecimal('3')

  expect(
    JSBD.divide(a, b, {
      maximumFractionDigits: 4,
      roundingMode: 'half up',
    }).toString()
  ).toBe('-0.0667')
})

test('-3 divide -1', () => {
  let a = JSBD.BigDecimal('-3')
  let b = JSBD.BigDecimal('-1')

  expect(
    JSBD.divide(a, b, {
      maximumFractionDigits: 0,
      roundingMode: 'half up',
    }).toString()
  ).toBe('3')
})

test('0 divide -1', () => {
  let a = JSBD.BigDecimal('0')
  let b = JSBD.BigDecimal('-1')

  expect(
    JSBD.divide(a, b, {
      maximumFractionDigits: 0,
      roundingMode: 'half up',
    }).toString()
  ).toBe('0')
})

// *********************
// if there is no maximumFractionDigits , divide can't know when to stop, which cause performance problem.
// if you make sure the result is limited , to get exact value, just make maximumFractionDigits to be 100 or 1000 or even bigger
// when get exact result ,divide will stop and push result to JSBD.round()

// bad case
test('12 divide 3', () => {
  let a = JSBD.BigDecimal('12')
  let b = JSBD.BigDecimal('3')

  expect(() => {
    // @ts-ignore
    JSBD.divide(a, b).toString()
  }).toThrowError()
})

// good case
test('12 divide 3', () => {
  let a = JSBD.BigDecimal('12')
  let b = JSBD.BigDecimal('3')

  expect(
    JSBD.divide(a, b, {
      maximumFractionDigits: 100,
    }).toString()
  ).toBe('4')
})

// *********************

test('12 divide 3', () => {
  let a = JSBD.BigDecimal('12')
  let b = JSBD.BigDecimal('3')

  expect(
    JSBD.divide(a, b, {
      maximumFractionDigits: -10,
    }).toString()
  ).toBe('0')
})

test('12.789 divide 3000', () => {
  let a = JSBD.BigDecimal('12.789')
  let b = JSBD.BigDecimal('3000')

  expect(
    JSBD.divide(a, b, {
      maximumFractionDigits: 100,
    }).toString()
  ).toBe('0.004263')
})

test('-12.789 divide 3000', () => {
  let a = JSBD.BigDecimal('-12.789')
  let b = JSBD.BigDecimal('3000')

  expect(
    JSBD.divide(a, b, {
      maximumFractionDigits: 100,
    }).toString()
  ).toBe('-0.004263')
})

test('12 divide 0', () => {
  let a = JSBD.BigDecimal('12')
  let b = JSBD.BigDecimal('0')

  expect(() => {
    // @ts-ignore
    JSBD.divide(a, b, {
      maximumFractionDigits: 100,
    }).toString()
  }).toThrowError()
})

test('123.899 divide 7', () => {
  let a = JSBD.BigDecimal('123.899')
  let b = JSBD.BigDecimal('7')

  expect(
    JSBD.divide(a, b, {
      maximumFractionDigits: 100,
    }).toString()
  ).toBe(
    '17.6998571428571428571428571428571428571428571428571428571428571428571428571428571428571428571428571429'
  )
})
