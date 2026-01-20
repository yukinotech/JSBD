const JSBD = require('../../dist/index.js')

const roundOptions = {
  maximumFractionDigits: 10,
  roundingMode: 'half up',
}

module.exports = function registerRound(bench, inputs) {
  let index = 0
  bench.add('JSBD.round', () => {
    const value = inputs[index]
    index = (index + 1) % inputs.length
    JSBD.round(value, roundOptions)
  })
}
