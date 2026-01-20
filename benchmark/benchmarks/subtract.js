const JSBD = require('../../dist/index.js')

module.exports = function registerSubtract(bench, inputs) {
  let index = 0
  bench.add('JSBD.subtract', () => {
    const [lhs, rhs] = inputs[index]
    index = (index + 1) % inputs.length
    JSBD.subtract(lhs, rhs)
  })
}
