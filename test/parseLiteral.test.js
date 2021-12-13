import { parseLiteral } from '../dist/utils.js'

test('+0', () => {
  expect(parseLiteral('+0')).toEqual({
    sign: 1,
    mantissa: '0',
    exponent: { sign: 1, value: '0' },
  })
})
test('-0', () => {
  expect(parseLiteral('-0')).toEqual({
    sign: -1,
    mantissa: '0',
    exponent: { sign: 1, value: '0' },
  })
})
test('0', () => {
  expect(parseLiteral('0')).toEqual({
    sign: 1,
    mantissa: '0',
    exponent: { sign: 1, value: '0' },
  })
})
test('0.', () => {
  expect(parseLiteral('0.')).toEqual({
    sign: 1,
    mantissa: '0',
    exponent: { sign: 1, value: '0' },
  })
})
test('0.000', () => {
  expect(parseLiteral('0.000')).toEqual({
    sign: 1,
    mantissa: '0',
    exponent: { sign: 1, value: '0' },
  })
})
test('0.01000', () => {
  expect(parseLiteral('0.01000')).toEqual({
    sign: 1,
    mantissa: '1000',
    exponent: { sign: -1, value: '5' },
  })
})
test('118.01', () => {
  expect(parseLiteral('118.01')).toEqual({
    sign: 1,
    mantissa: '11801',
    exponent: { sign: -1, value: '2' },
  })
})
test('200.', () => {
  expect(parseLiteral('200.')).toEqual({
    sign: 1,
    mantissa: '200',
    exponent: { sign: -1, value: '0' },
  })
})
test('1180', () => {
  expect(parseLiteral('1180')).toEqual({
    sign: 1,
    mantissa: '1180',
    exponent: { sign: 1, value: '0' },
  })
})
test('25456456464.06565', () => {
  expect(parseLiteral('25456456464.06565')).toEqual({
    sign: 1,
    mantissa: '2545645646406565',
    exponent: { sign: -1, value: '5' },
  })
})
test('-332', () => {
  expect(parseLiteral('-332')).toEqual({
    sign: -1,
    mantissa: '332',
    exponent: { sign: 1, value: '0' },
  })
})
test('.2', () => {
  expect(parseLiteral('.2')).toEqual({
    sign: 1,
    mantissa: '2',
    exponent: { sign: -1, value: '1' },
  })
})
test('-56.027', () => {
  expect(parseLiteral('-56.027')).toEqual({
    sign: -1,
    mantissa: '56027',
    exponent: { sign: -1, value: '3' },
  })
})
