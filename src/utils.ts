import { DecimalSign } from './type'

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
  let mantissa = '1'
  let exponent = '1'
  if (str[0] === '-') {
    sign = -1
    str = str.slice(1)
  } else if (str[0] === '+') {
    sign = 1
    str = str.slice(1)
  }
  if (str.indexOf('.') !== -1) {
    // if has point remove last zero
    for (let i = 0; i < str.length; i++) {
      if (str[length - 1] === '.') {
      }
    }
  } else {
  }

  return { sign, mantissa, exponent }
}
