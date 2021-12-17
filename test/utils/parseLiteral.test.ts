import { parseLiteral } from '../../src/utils'

test('+0', () => {
  let { mantissa, exponent } = parseLiteral('+0')
  expect(mantissa.toString()).toBe(BigInt(0).toString())
  expect(exponent).toBe(0)
})

test('-0', () => {
  let { mantissa, exponent } = parseLiteral('-0')
  expect(mantissa.toString()).toBe(BigInt(0).toString())
  expect(exponent).toBe(0)
})

test('0', () => {
  let { mantissa, exponent } = parseLiteral('0')
  expect(mantissa.toString()).toBe(BigInt(0).toString())
  expect(exponent).toBe(0)
})

test('0.', () => {
  let { mantissa, exponent } = parseLiteral('0.')
  expect(mantissa.toString()).toBe(BigInt(0).toString())
  expect(exponent).toBe(0)
})

test('0.000', () => {
  let { mantissa, exponent } = parseLiteral('0.000')
  expect(mantissa.toString()).toBe(BigInt(0).toString())
  expect(exponent).toBe(0)
})

test('0.01000', () => {
  let { mantissa, exponent } = parseLiteral('0.01000')
  expect(mantissa.toString()).toBe(BigInt(1000).toString())
  expect(exponent).toBe(-5)
})

test('118.01', () => {
  let { mantissa, exponent } = parseLiteral('118.01')
  expect(mantissa.toString()).toBe(BigInt(11801).toString())
  expect(exponent).toBe(-2)
})

test('200.', () => {
  let { mantissa, exponent } = parseLiteral('200.')
  expect(mantissa.toString()).toBe(BigInt(200).toString())
  expect(exponent).toBe(-0)
})

test('1180', () => {
  let { mantissa, exponent } = parseLiteral('1180')
  expect(mantissa.toString()).toBe(BigInt(1180).toString())
  expect(exponent).toBe(0)
})

test('25456456464.06565', () => {
  let { mantissa, exponent } = parseLiteral('25456456464.06565')
  expect(mantissa.toString()).toBe(BigInt(2545645646406565).toString())
  expect(exponent).toBe(-5)
})

test('-332', () => {
  let { mantissa, exponent } = parseLiteral('-332')
  expect(mantissa.toString()).toBe(BigInt(-332).toString())
  expect(exponent).toBe(0)
})

test('.2', () => {
  let { mantissa, exponent } = parseLiteral('.2')
  expect(mantissa.toString()).toBe(BigInt(2).toString())
  expect(exponent).toBe(-1)
})

test('-56.027', () => {
  let { mantissa, exponent } = parseLiteral('-56.027')
  expect(mantissa.toString()).toBe(BigInt(-56027).toString())
  expect(exponent).toBe(-3)
})
