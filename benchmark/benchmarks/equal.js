const JSBD = require('../../dist/index.js')

module.exports = function registerEqual(bench, inputs) {
  let index = 0
  bench.add('JSBD.equal', () => {
    const [lhs, rhs] = inputs[index]
    index = (index + 1) % inputs.length
    JSBD.equal(lhs, rhs)
  })
}
