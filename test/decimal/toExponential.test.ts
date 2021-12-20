import { Decimal } from '../../src/decimal'

// normal number input
// test('"0" toExponential', () => {
//   let a = new Decimal('0')
//   let v = a.toExponential()
//   expect(v).toBe('0e+0')
//   expect(v).toBe((0).toExponential())
// })

// test('"0" toExponential 0', () => {
//   let a = new Decimal('0')
//   let v = a.toExponential(2)
//   expect(v).toBe('0.00e+0')
//   expect(v).toBe((0).toExponential(2))
// })

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

// test('"-1.15" toExponential', () => {
//   let a = new Decimal('-1.15')
//   let v = a.toExponential(1)
//   expect(v).toBe('-1.2e+0')
//   expect(v).toBe((-1.15).toExponential(1))
// })

// test('toExponential error params', () => {
//   let a = new Decimal('112.5')
//   expect(() => {
//     a.toExponential(-1)
//   }).toThrowError()
// })
