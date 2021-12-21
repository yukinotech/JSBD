import { Decimal } from '../../src/decimal'

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
