const { Bench } = require('tinybench')
const {
  createDecimalPairs,
  createPowInputs,
  createRoundInputs,
} = require('./utils')

const registerAdd = require('./benchmarks/add')
const registerSubtract = require('./benchmarks/subtract')
const registerMultiply = require('./benchmarks/multiply')
const registerDivide = require('./benchmarks/divide')
const registerRemainder = require('./benchmarks/remainder')
const registerPow = require('./benchmarks/pow')
const registerRound = require('./benchmarks/round')
const registerEqual = require('./benchmarks/equal')
const registerNotEqual = require('./benchmarks/notEqual')
const registerLessThan = require('./benchmarks/lessThan')
const registerGreaterThan = require('./benchmarks/greaterThan')
const registerLessThanOrEqual = require('./benchmarks/lessThanOrEqual')
const registerGreaterThanOrEqual = require('./benchmarks/greaterThanOrEqual')

async function run() {
  const bench = new Bench({ time: 50 })
  const pairInputs = createDecimalPairs(200)
  const powInputs = createPowInputs(200)
  const roundInputs = createRoundInputs(200)

  registerAdd(bench, pairInputs)
  registerSubtract(bench, pairInputs)
  registerMultiply(bench, pairInputs)
  registerDivide(bench, pairInputs)
  registerRemainder(bench, pairInputs)
  registerPow(bench, powInputs)
  registerRound(bench, roundInputs)
  registerEqual(bench, pairInputs)
  registerNotEqual(bench, pairInputs)
  registerLessThan(bench, pairInputs)
  registerGreaterThan(bench, pairInputs)
  registerLessThanOrEqual(bench, pairInputs)
  registerGreaterThanOrEqual(bench, pairInputs)

  await bench.run()
  console.table(bench.table())
}

run().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
