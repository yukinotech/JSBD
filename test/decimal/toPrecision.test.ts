import { Decimal } from '../../src/decimal'

test('"0" toPrecision undefined', () => {
  let a = new Decimal('0')
  let v = a.toPrecision()
  expect(v).toBe('0')
  expect(v).toBe((0).toPrecision())
})

test('"0.78" toPrecision undefined', () => {
  let a = new Decimal('0.78')
  let v = a.toPrecision()
  expect(v).toBe('0.78')
  expect(v).toBe((0.78).toPrecision())
})

test('"0" toPrecision 1', () => {
  let a = new Decimal('0')
  let v = a.toPrecision(1)
  expect(v).toBe('0')
  expect(v).toBe((0).toPrecision(1))
})

test('"0" toPrecision 2', () => {
  let a = new Decimal('0')
  let v = a.toPrecision(2)
  expect(v).toBe('0.0')
  expect(v).toBe((0).toPrecision(2))
})

test('-0.001" toPrecision 2', () => {
  let a = new Decimal('-0.001')
  let v = a.toPrecision(2)
  expect(v).toBe('-0.0010')
  expect(v).toBe((-0.001).toPrecision(2))
})

test('"6" toPrecision 1', () => {
  let a = new Decimal('6')
  let v = a.toPrecision(1)
  expect(v).toBe('6')
  expect(v).toBe((6).toPrecision(1))
})

test('"6" toPrecision 2', () => {
  let a = new Decimal('6')
  let v = a.toPrecision(2)
  expect(v).toBe('6.0')
  expect(v).toBe((6).toPrecision(2))
})

test('"3e-6" toPrecision 2', () => {
  let a = new Decimal('3e-6')
  let v = a.toPrecision(2)
  expect(v).toBe('0.0000030')
})

test('"3e-3" toPrecision 2', () => {
  let a = new Decimal('3e-3')
  let v = a.toPrecision(1)
  expect(v).toBe('0.003')
})

test('"110" toPrecision 2', () => {
  let a = new Decimal('110')
  let v = a.toPrecision(2)
  expect(v).toBe('1.1e+2')
})

test('"111" toPrecision 1', () => {
  let a = new Decimal('111')
  let v = a.toPrecision(1)
  expect(v).toBe('1e+2')
})

test('"111.456" toPrecision 1', () => {
  let a = new Decimal('111.456')
  let v = a.toPrecision(1)
  expect(v).toBe('1e+2')
})

test('"111.456" toPrecision 4', () => {
  let a = new Decimal('111.456')
  let v = a.toPrecision(4)
  expect(v).toBe('1.115e+2')
})

test('"56.12" toPrecision 6', () => {
  let a = new Decimal('56.12')
  let v = a.toPrecision(6)
  expect(v).toBe('5.61200e+1')
})

test('"111" toPrecision 2', () => {
  let a = new Decimal('111')
  let v = a.toPrecision(2)
  expect(v).toBe('1.1e+2')
})

test('"119" toPrecision 2', () => {
  let a = new Decimal('119')
  let v = a.toPrecision(2)
  expect(v).toBe('1.2e+2')
})

test('"120" toPrecision 2', () => {
  let a = new Decimal('120')
  let v = a.toPrecision(2)
  expect(v).toBe('1.2e+2')
})

test('"12300" toPrecision ', () => {
  let a = new Decimal('12300')
  let v = a.toPrecision(8)
  expect(v).toBe('1.2300000e+4')
})

test('"-1.15" toPrecision 4', () => {
  let a = new Decimal('-1.15')
  let v = a.toPrecision(4)
  expect(v).toBe('-1.150')
})

test('"-1.15" toPrecision 3', () => {
  let a = new Decimal('-1.15')
  let v = a.toPrecision(3)
  expect(v).toBe('-1.15')
})

test('"-1.15" toPrecision 2', () => {
  let a = new Decimal('-1.15')
  let v = a.toPrecision(2)
  expect(v).toBe('-1.2')
})

test('"-1.15" toPrecision 1', () => {
  let a = new Decimal('-1.15')
  let v = a.toPrecision(1)
  expect(v).toBe('-1')
})

test('toPrecision error params', () => {
  let a = new Decimal('112.5')
  expect(() => {
    a.toPrecision(-1)
  }).toThrowError()
})

// readme eg
test('111.22 toPrecision 1', () => {
  let a = new Decimal('111.22')
  let v = a.toPrecision()
  expect(v).toBe('111.22')
})

test('111.22 toPrecision 4', () => {
  let a = new Decimal('111.22')
  let v = a.toPrecision(4)
  expect(v).toBe('1.112e+2')
})

test('111.22 toPrecision 2', () => {
  let a = new Decimal('111.22')
  let v = a.toPrecision(2)
  expect(v).toBe('1.1e+2')
})
