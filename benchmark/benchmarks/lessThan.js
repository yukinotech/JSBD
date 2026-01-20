const JSBD = require('../../dist/index.js')

module.exports = function registerLessThan(bench, inputs) {
  let index = 0
  bench.add('JSBD.lessThan', () => {
    const [lhs, rhs] = inputs[index]
    index = (index + 1) % inputs.length
    JSBD.lessThan(lhs, rhs)
  })
}
