const JSBD = require('../../dist/index.js')

module.exports = function registerMultiply(bench, inputs) {
  let index = 0
  bench.add('JSBD.multiply', () => {
    const [lhs, rhs] = inputs[index]
    index = (index + 1) % inputs.length
    JSBD.multiply(lhs, rhs)
  })
}
