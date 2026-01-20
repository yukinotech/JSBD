const JSBD = require('../../dist/index.js')

module.exports = function registerAdd(bench, inputs) {
  let index = 0
  bench.add('JSBD.add', () => {
    const [lhs, rhs] = inputs[index]
    index = (index + 1) % inputs.length
    JSBD.add(lhs, rhs)
  })
}
