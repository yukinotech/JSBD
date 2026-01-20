const JSBD = require('../../dist/index.js')

module.exports = function registerLessThanOrEqual(bench, inputs) {
  let index = 0
  bench.add('JSBD.lessThanOrEqual', () => {
    const [lhs, rhs] = inputs[index]
    index = (index + 1) % inputs.length
    JSBD.lessThanOrEqual(lhs, rhs)
  })
}
