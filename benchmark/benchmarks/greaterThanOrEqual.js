const JSBD = require('../../dist/index.js')

module.exports = function registerGreaterThanOrEqual(bench, inputs) {
  let index = 0
  bench.add('JSBD.greaterThanOrEqual', () => {
    const [lhs, rhs] = inputs[index]
    index = (index + 1) % inputs.length
    JSBD.greaterThanOrEqual(lhs, rhs)
  })
}
