import { isSN } from '../../src/utils'

// is scientific notation
test('+0e-32', () => {
  expect(isSN('+0e-32')).toBeTruthy()
})
test('-0e+32', () => {
  expect(isSN('-0e+32')).toBeTruthy()
})
test('0', () => {
  expect(isSN('0')).toBeFalsy()
})
test('0.', () => {
  expect(isSN('0.')).toBeFalsy()
})
test('0.000e43', () => {
  expect(isSN('0.000e43')).toBeTruthy()
})
test('1.1e2', () => {
  expect(isSN('1.1e2')).toBeTruthy()
})
test('1234E-4', () => {
  expect(isSN('1234E-4')).toBeTruthy()
})
test('118e', () => {
  expect(isSN('118e')).toBeFalsy()
})
test('200.e4', () => {
  expect(isSN('200.e4')).toBeTruthy()
})
test('1180e0', () => {
  expect(isSN('1180e0')).toBeTruthy()
})
test('-3.65E-12', () => {
  expect(isSN('-3.65E-12')).toBeTruthy()
})
test('25456456464.06565E4', () => {
  expect(isSN('25456456464.06565E4')).toBeTruthy()
})
test('36.64', () => {
  expect(isSN('36.64')).toBeFalsy()
})
