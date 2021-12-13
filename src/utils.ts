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
  let sign: DecimalSign = 1
  let mantissa: string
  let exponent: Exponent
  if (str[0] === '-') {
    sign = -1
    str = str.slice(1)
  } else if (str[0] === '+') {
    sign = 1
    str = str.slice(1)
  }
  let pointI = str.indexOf('.')
  if (pointI !== -1) {
    let subStr = str.replace(/(^0?\.0*)|(\.)/, '')
    if (subStr) {
      mantissa = subStr
      // str.length must to be < Number.MAX_SAFE_INTEGER
      exponent = { sign: -1, value: String(str.length - 1 - pointI) }
    } else {
      // 0
      mantissa = '0'
      exponent = { sign: 1, value: '0' }
    }
  } else {
    // int
    mantissa = str
    exponent = { sign: 1, value: '0' }
  }

  return { sign, mantissa, exponent }
}
