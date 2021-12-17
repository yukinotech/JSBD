import { DecimalSign, Exponent } from './type'
import { Decimal } from './decimal'

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

// build a decimal form scientific notation
export function snDecimal(mantissa: bigint, exponent: number) {
  let v = new Decimal('0')
  v.exponent = exponent
  v.mantissa = mantissa
  return v
}

// judge a params is an integer
export function isInteger(obj: any) {
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
  return true
}
