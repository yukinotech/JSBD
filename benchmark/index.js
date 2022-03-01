const BigNumber = require('bignumber.js')
const JSBD = require('../dist/index.js').default

BigNumber.config({
  DECIMAL_PLACES: 34,
  ROUNDING_MODE: 4,
  EXPONENTIAL_AT: 100000000,
  RANGE: [-1e9, 1e9],
})

function generateRandom() {
  return (Math.random() * 100).toString()
}

function go() {
  let a = [generateRandom(), generateRandom()]
  let start = performance.now()
  let v1 = JSBD.divide(JSBD.BigDecimal(a[0]), JSBD.BigDecimal(a[1]))
  let end1 = performance.now()
  t1 += end1 - start
  let v2 = new BigNumber(a[0]).dividedBy(a[1])
  let end2 = performance.now()
  t2 += end2 - end1
  // console.log('JSBD', v1.toString())
  // console.log('b.js', v2.toString())
}

let t1 = 0
let t2 = 0

for (let i = 0; i < 10000; i++) {
  go()
}

console.log(t1)
console.log(t2)
