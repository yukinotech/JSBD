import { isLiteral } from '../../src/utils'

// legal literal
// +0
// -0
// 0
// 0.
// 0.000
// 0.01000
// 0111.111 ❌
// 118.01
// 200.
// 1180
// 01180 ❌
// -332
// .2

test('+0', () => {
  expect(isLiteral('+0')).toBeTruthy()
})
test('-0', () => {
  expect(isLiteral('-0')).toBeTruthy()
})
test('0', () => {
  expect(isLiteral('0')).toBeTruthy()
})
test('0.', () => {
  expect(isLiteral('0.')).toBeTruthy()
})
test('0.000', () => {
  expect(isLiteral('0.000')).toBeTruthy()
})
test('0.01000', () => {
  expect(isLiteral('0.01000')).toBeTruthy()
})
test('0111.111', () => {
  expect(isLiteral('0111.111')).toBeFalsy()
})
test('118.01', () => {
  expect(isLiteral('118.01')).toBeTruthy()
})
test('200.', () => {
  expect(isLiteral('200.')).toBeTruthy()
})
test('1180', () => {
  expect(isLiteral('1180')).toBeTruthy()
})
test('01180', () => {
  expect(isLiteral('01180')).toBeFalsy()
})
test('25456456464.06565', () => {
  expect(isLiteral('25456456464.06565')).toBeTruthy()
})
test('-332', () => {
  expect(isLiteral('-332')).toBeTruthy()
})
test('.2', () => {
  expect(isLiteral('.2')).toBeTruthy()
})
