import { getGcd } from '../../src/utils'

let t = (a: bigint, b: bigint, expected: bigint) => {
  test(a.toString() + ' gcd ' + b.toString(), () => {
    let res = getGcd(a, b)
    expect(res.toString()).toBe(expected.toString())
  })
}

t(100n, 75n, 25n)
t(1n, 1n, 1n)
t(2n, 1n, 1n)
t(1n, 2n, 1n)
t(2n, 2n, 2n)

t(75n, 7n, 1n)
t(7n, 75n, 1n)
t(9n, 75n, 3n)

t(12n, 25n, 1n)
t(12n, 14n, 2n)
t(12n, 13n, 1n)
t(12n, 12n, 12n)
t(12n, 11n, 1n)
t(12n, 10n, 2n)
t(12n, 9n, 3n)
t(12n, 8n, 4n)
t(12n, 7n, 1n)
t(12n, 6n, 6n)
t(12n, 5n, 1n)
t(12n, 4n, 4n)
t(12n, 3n, 3n)
t(12n, 2n, 2n)
t(12n, 1n, 1n)
