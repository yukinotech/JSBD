const JSBD = require('../../dist/index.js')

const divideOptions = {
  maximumFractionDigits: 34,
  roundingMode: 'half up',
}

module.exports = function registerDivide(bench, inputs) {
  let index = 0
  bench.add('JSBD.divide', () => {
    const [lhs, rhs] = inputs[index]
    index = (index + 1) % inputs.length
    JSBD.divide(lhs, rhs, divideOptions)
  })
}
