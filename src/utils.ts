import { DecimalSign, Exponent } from './type'

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
