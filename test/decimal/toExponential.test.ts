import { Decimal } from '../../src/decimal'

let t = (a: any, expected: any, fractionDigits?: any) => {
  test(a + ' toExponential', () => {
    // @ts-ignore
    a = new Decimal(a)
    expect(a.toExponential(fractionDigits)).toBe(expected)
  })
}

// normal number input
test('"0" toExponential', () => {
  let a = new Decimal('0')
  let v = a.toExponential()
  expect(v).toBe('0e+0')
  expect(v).toBe((0).toExponential())
})

test('"0" toExponential 0', () => {
  let a = new Decimal('0')
  let v = a.toExponential(2)
  expect(v).toBe('0.00e+0')
  expect(v).toBe((0).toExponential(2))
})

test('-0.001" toExponential 2', () => {
  let a = new Decimal('-0.001')
  let v = a.toExponential(2)
  expect(v).toBe('-1.00e-3')
  expect(v).toBe((-0.001).toExponential(2))
})

test('"6" toExponential 0', () => {
  let a = new Decimal('6')
  let v = a.toExponential(0)
  expect(v).toBe('6e+0')
  expect(v).toBe((6).toExponential(0))
})

test('"6" toExponential 2', () => {
  let a = new Decimal('6')
  let v = a.toExponential(2)
  expect(v).toBe('6.00e+0')
  expect(v).toBe((6).toExponential(2))
})

test('"3e-12" toExponential 2', () => {
  let a = new Decimal('3e-12')
  let v = a.toExponential(2)
  expect(v).toBe('3.00e-12')
})

test('"33e-12" toExponential 2', () => {
  let a = new Decimal('33e-12')
  let v = a.toExponential(2)
  expect(v).toBe('3.30e-11')
})

test('"3e0" toExponential 2', () => {
  let a = new Decimal('3e0')
  let v = a.toExponential(2)
  expect(v).toBe('3.00e+0')
})

test('"3e+12" toExponential 2', () => {
  let a = new Decimal('3e+12')
  let v = a.toExponential(2)
  expect(v).toBe('3.00e+12')
})

test('"3e0" toExponential 2', () => {
  let a = new Decimal('3e0')
  let v = a.toExponential(2)
  expect(v).toBe('3.00e+0')
})

test('"0.01" toExponential 2', () => {
  let a = new Decimal('0.01')
  let v = a.toExponential(2)
  expect(v).toBe('1.00e-2')
  expect(v).toBe((0.01).toExponential(2))
})

test('"0.009" toExponential ', () => {
  let a = new Decimal('0.9999')
  let v = a.toExponential(2)
  expect(v).toBe('1.00e+0')
  expect(v).toBe((0.9999).toExponential(2))
})

test('"12300" toExponential ', () => {
  let a = new Decimal('12300')
  let v = a.toExponential(8)
  expect(v).toBe('1.23000000e+4')
})

test('"-1.15" toExponential', () => {
  let a = new Decimal('-1.15')
  let v = a.toExponential(1)
  expect(v).toBe('-1.2e+0')
  // wrong in js
  // expect(v).toBe((-1.15).toExponential(1))
})

// In node or chrome（v8） , when the result of toFixed is rounded, the result is not accurate . because number is float

// console.log((1.05).toFixed(1)) // 1.1
// console.log((1.15).toFixed(1)) // 1.1
// console.log((1.25).toFixed(1)) // 1.3
// console.log((1.35).toFixed(1)) // 1.4
// console.log((1.45).toFixed(1)) // 1.4
// console.log((1.55).toFixed(1)) // 1.4
// console.log((1.65).toFixed(1)) // 1.6
// console.log((1.75).toFixed(1)) // 1.8
// console.log((1.85).toFixed(1)) // 1.9
// console.log((1.95).toFixed(1)) // 1.9
// however , in BigDecimal ,we can claculate an exact value by roundMode

// // default use `half up` roundMode
// console.log((1.05m).toFixed(1)) // 1.1
// console.log((1.15m).toFixed(1)) // 1.2
// console.log((1.25m).toFixed(1)) // 1.3
// console.log((1.35m).toFixed(1)) // 1.4
// console.log((1.45m).toFixed(1)) // 1.5
// console.log((1.55m).toFixed(1)) // 1.6
// console.log((1.65m).toFixed(1)) // 1.7
// console.log((1.75m).toFixed(1)) // 1.8
// console.log((1.85m).toFixed(1)) // 1.9
// console.log((1.95m).toFixed(1)) // 2.0
// The same problem appeared in BigDecimal.prototype.toExponential

test('toExponential error params', () => {
  let a = new Decimal('112.5')
  expect(() => {
    a.toExponential(-1)
  }).toThrowError()
})

// readme eg
test('1010 toExponential ', () => {
  let a = new Decimal('1010')
  let v = a.toExponential(2)
  expect(v).toBe('1.01e+3')
})

t('0.03', '3e-2')
t('0.03', '3e-2', 0)
t('0.03', '3.0e-2', 1)
t('0.03', '3.00e-2', 2)
t('0.03', '3.000e-2', 3)
t('0.03', '3.0000e-2', 4)
t('100', '1e+2')
t('100', '1e+2', 0)
t('100', '1.0e+2', 1)
t('100', '1.00e+2', 2)
t('100', '1.000e+2', 3)
t('150', '1.5e+2')
t('150', '2e+2', 0)
t('150', '1.5e+2', 1)
t('150', '1.50e+2', 2)
t('150', '1.500e+2', 3)
t('-0.03', '-3e-2')
t('-0.03', '-3e-2', 0)
t('-0.03', '-3.0e-2', 1)
t('-0.03', '-3.00e-2', 2)
t('-0.03', '-3.000e-2', 3)
t('-0.03', '-3.0000e-2', 4)
t('-100', '-1e+2')
t('-100', '-1e+2', 0)
t('-100', '-1.0e+2', 1)
t('-100', '-1.00e+2', 2)
t('-100', '-1.000e+2', 3)
t('-150', '-1.5e+2')
t('-150', '-2e+2', 0)
t('-150', '-1.5e+2', 1)
t('-150', '-1.50e+2', 2)
t('-150', '-1.500e+2', 3)
t('12555.09', '1.255509e+4')
t('12555.09', '1e+4', 0)
t('12555.09', '1.3e+4', 1)
t('12555.09', '1.26e+4', 2)
t('12555.09', '1.256e+4', 3)
t('12555.09', '1.2555e+4', 4)
t('12555.09', '1.25551e+4', 5)
t('12555.09', '1.255509e+4', 6)
t('12555.09', '1.2555090e+4', 7)
t('12555.09', '1.25550900e+4', 8)
t('-12555.09', '-1.255509e+4')
t('-12555.09', '-1e+4', 0)
t('-12555.09', '-1.3e+4', 1)
t('-12555.09', '-1.26e+4', 2)
t('-12555.09', '-1.256e+4', 3)
t('-12555.09', '-1.2555e+4', 4)
t('-12555.09', '-1.25551e+4', 5)
t('-12555.09', '-1.255509e+4', 6)
t('-12555.09', '-1.2555090e+4', 7)
t('-12555.09', '-1.25550900e+4', 8)
t('0', '0e+0')
t('0', '0e+0', 0)
t('0', '0.0e+0', 1)
t('0', '0.00e+0', 2)
t('0', '0.000e+0', 3)
t('0', '0.0000e+0', 4)
t('0.0', '0e+0')
t('0.00', '0e+0', 0)
t('0.0', '0.0e+0', 1)
t('0.000', '0.00e+0', 2)
t('0.0000', '0.000e+0', 3)
t('0.00000000000', '0.0000e+0', 4)
t('-0', '0e+0')
t('-0', '0e+0', 0)
t('-0', '0.0e+0', 1)
t('-0', '0.00e+0', 2)
t('-0', '0.000e+0', 3)
t('-0', '0.0000e+0', 4)
t('-0.0', '0e+0')
t('-0.00', '0e+0', 0)
t('-0.0', '0.0e+0', 1)
t('-0.000', '0.00e+0', 2)
t('-0.0000', '0.000e+0', 3)
t('-0.00000000000', '0.0000e+0', 4)
