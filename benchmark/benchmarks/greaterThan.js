const JSBD = require('../../dist/index.js')

module.exports = function registerGreaterThan(bench, inputs) {
  let index = 0
  bench.add('JSBD.greaterThan', () => {
    const [lhs, rhs] = inputs[index]
    index = (index + 1) % inputs.length
    JSBD.greaterThan(lhs, rhs)
  })
}
