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
// if there is no maximumFractionDigits , divide have to judge if result is limit, which cause performance problem.
// if you make sure the result is limited , to get exact value, just make maximumFractionDigits to be 100 or 1000 or even bigger
// when get exact result ,divide will stop and push result to JSBD.round()

// bad case
test('12 divide 3', () => {
  let a = JSBD.BigDecimal('12')
  let b = JSBD.BigDecimal('3')

  expect(JSBD.divide(a, b).toString()).toBe('4')
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
  ).toBe('17.6998571428571428571428571428571428571428571428571428571428571428571428571428571428571428571428571429')
})

test('NaN', () => {
  let a = JSBD.BigDecimal('12')
  let b = JSBD.BigDecimal('2')

  expect(() => {
    // @ts-ignore
    JSBD.divide(a, b, {
      maximumFractionDigits: NaN,
    }).toString()
  }).toThrowError()
})

let t = (a: any, b: any, expected: any, roundOption?: any) => {
  test(a.toString() + ' / ' + b.toString(), () => {
    let a1 = JSBD.BigDecimal(a)
    let b1 = JSBD.BigDecimal(b)
    let res = JSBD.divide(a1, b1, roundOption)
    let expectedV = JSBD.BigDecimal(expected)
    expect(res.toString()).toBe(expectedV.toString())
  })
}

t('100', '1', '100')
t('100', '10', '10')
t('100', '10.0', '10')
t('1001', '2', '500.5')
t('121', '11', '11')
t('1', '1', '1')
t('100', '100', '1')
t('-999.99', '0.01', '-99999')
t('10', '4', '2.5')
t('3.333', '-4', '-0.83325')
t('-1', '-0.1', '10')
t('99999', '1', '99999')
t('2', '10', '0.2')
t('20', '100', '0.2')
t('20', '-100', '-0.2')
t('-20', '-100', '0.2')
t('-20', '100', '-0.2')
t(1, '1', '1')
t(1, 0o144, '0.01')
t(1, '-0.0001', '-10000')
t(1, '8e5', '0.00000125')
t(1, '1e-14', '100000000000000')
t(1, '125', '0.008')
t(0, 1, '0')
t(0, 255453, '0')
t(-0, '-5e4', '0')
t(-0, '-353', '0')
t('5', '100', '0.1', {
  maximumFractionDigits: 1,
})
t('1', '3', '0.33333', {
  maximumFractionDigits: 5,
})
t('-1', '-3', '0.33333', {
  maximumFractionDigits: 5,
})
t('1', '-3', '-0.33333', {
  maximumFractionDigits: 5,
})
t('-1', '3', '-0.33333', {
  maximumFractionDigits: 5,
})
t('-1', '3', '-0.33333', {
  maximumFractionDigits: 5,
  roundingMode: 'half up',
})
t('1', '3', '0.3333333333333333333333333333333333')
t('1', '2037035976334486086268445688409378161051468393665936250636140449354381299763336706183397376', '0.000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000490909346529772655309577195498627564297521551249944956511154911718710525472171585646009788403733195227718357156513187851316791861042471890280751482410896345225310546445986192853894181098439730703830718994140625')
t('1', '2037035976334486086268445688409378161051468393665936250636140449354381299763336706183397376', '0.000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000490909346529772655309577195498627564297521551249944956511154911718710525472171585646009788403733195227718357156513187851316791861042471890280751482410896345225310546445986192853894181098439730703830718994140625', {
  roundingMode: 'half up',
})
t('1', '2037035976334486086268445688409378161051468393665936250636140449354381299763336706183397376', '0', {
  maximumFractionDigits: 5,
})
t('1', '2037035976334486086268445688409378161051468393665936250636140449354381299763336706183397376', '0.00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000049090934653', {
  maximumFractionDigits: 101,
})
