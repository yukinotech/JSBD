import { DecimalSign, Exponent } from './type'

// judge if string has style like "143.09"
export function isLiteral(str: string) {
  // first check if str is legal literal number ,see test for detail
  if (
    str.match(
      /^(-|\+)?((0\.[0-9]*)|([1-9][0-9]*\.[0-9]*)|(\.[0-9]+)|([1-9][0-9]*)|(0))$/
    )
  ) {
    return true
  } else {
    return false
  }
}

// parse string like "134.23" to 13423 and 10^2
export function parseLiteral(str: string) {
  let sign: bigint = 1n
  let mantissa: bigint
  let exponent: number
  if (str[0] === '-') {
    sign = -1n
    str = str.slice(1)
  } else if (str[0] === '+') {
    sign = 1n
    str = str.slice(1)
  }
  let pointI = str.indexOf('.')
  if (pointI !== -1) {
    let subStr = str.replace(/(^0?\.0*)|(\.)/, '')
    if (subStr) {
      mantissa = sign * BigInt(subStr)
      // str.length must to be < Number.MAX_SAFE_INTEGER
      exponent = -(str.length - 1 - pointI)
    } else {
      // 0
      mantissa = BigInt('0')
      exponent = 0
    }
  } else {
    // int
    mantissa = sign * BigInt(str)
    exponent = 0
  }

  return { mantissa, exponent }
}

// judge a params is an legal integer
export function isInteger(obj: any): obj is number {
  return typeof obj === 'number' && obj % 1 === 0
}

// return the abs of a bigint
export function getAbs(v: bigint) {
  if (v > 0n) return v
  if (v < 0n) return v * -1n
  return 0n
}

// judge if string has style like "143e-23"
export function isSN(str: string) {
  if (
    str.match(
      /^(-|\+)?((0\.[0-9]*)|([1-9][0-9]*\.[0-9]*)|(\.[0-9]+)|([1-9][0-9]*)|(0))[eE][-+]?(([1-9][0-9]*)|0)$/
    )
  ) {
    return true
  } else {
    return false
  }
}

export function parseSN(str: string) {
  let before: string, after: string
  if (str.indexOf('e') !== -1) {
    ;[before, after] = str.split('e')
  } else {
    ;[before, after] = str.split('E')
  }
  let { exponent, mantissa } = parseLiteral(before)
  return { exponent: exponent + Number(after), mantissa }
}

// use Euclidean algorithm , if a>=b, getGcd(a,b) = getGcd(b,a mod b)
export function getGcd(a: bigint, b: bigint): bigint {
  // params default value is positive, >=1n
  let result: bigint
  if (a < b) {
    result = b
    b = a
    a = result
  }
  while (true) {
    result = a % b
    if (result === 1n) {
      return 1n
    }
    if (result === 0n) {
      return b
    }
    a = b
    b = result
  }
}

// check if a bigint = 2^n * 5^m or === 1
export function isOnly25Or1(a: bigint): boolean {
  // params default value is positive, >=1n
  if (a === 1n) return true
  // get m
  let m = 0n
  let mod5 = a % 5n
  let count5 = a / 5n
  while (mod5 === 0n) {
    m++
    mod5 = count5 % 5n
    count5 = count5 / 5n
  }
  // get n
  let n = 0n
  let mod2 = a % 2n
  let count2 = a / 2n
  while (mod2 === 0n) {
    n++
    mod2 = count2 % 2n
    count2 = count2 / 2n
  }
  if (2n ** n * 5n ** m === a) {
    return true
  } else {
    return false
  }
}
