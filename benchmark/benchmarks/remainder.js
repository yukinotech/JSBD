const JSBD = require('../../dist/index.js')

module.exports = function registerRemainder(bench, inputs) {
  let index = 0
  bench.add('JSBD.remainder', () => {
    const [lhs, rhs] = inputs[index]
    index = (index + 1) % inputs.length
    JSBD.remainder(lhs, rhs)
  })
}
