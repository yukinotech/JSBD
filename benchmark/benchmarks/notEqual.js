const JSBD = require('../../dist/index.js')

module.exports = function registerNotEqual(bench, inputs) {
  let index = 0
  bench.add('JSBD.notEqual', () => {
    const [lhs, rhs] = inputs[index]
    index = (index + 1) % inputs.length
    JSBD.notEqual(lhs, rhs)
  })
}
