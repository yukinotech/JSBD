const JSBD = require('../../dist/index.js')

module.exports = function registerPow(bench, inputs) {
  let index = 0
  bench.add('JSBD.pow', () => {
    const [base, power] = inputs[index]
    index = (index + 1) % inputs.length
    JSBD.pow(base, power)
  })
}
