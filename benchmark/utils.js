const JSBD = require('../dist/index.js')

function toNonZeroString(value) {
  if (value === 0) {
    return '1'
  }
  return value.toString()
}

function createDecimalPairs(count) {
  const inputs = new Array(count)
  for (let i = 0; i < count; i++) {
    const a = Math.random() * 100
    const b = Math.random() * 100
    inputs[i] = [
      JSBD.BigDecimal(a.toString()),
      JSBD.BigDecimal(toNonZeroString(b)),
    ]
  }
  return inputs
}

function createPowInputs(count) {
  const inputs = new Array(count)
  for (let i = 0; i < count; i++) {
    const base = JSBD.BigDecimal((Math.random() * 10).toString())
    const power = (i % 6) + 1
    inputs[i] = [base, power]
  }
  return inputs
}

function createRoundInputs(count) {
  const inputs = new Array(count)
  for (let i = 0; i < count; i++) {
    inputs[i] = JSBD.BigDecimal((Math.random() * 100).toString())
  }
  return inputs
}

module.exports = {
  createDecimalPairs,
  createPowInputs,
  createRoundInputs,
}
