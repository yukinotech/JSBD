import { DecimalIntVal, DecimalSign, Exponent } from './type'
import { isLiteral, parseLiteral } from './utils'

class Decimal {
  sign: DecimalSign
  mantissa: string
  exponent: Exponent
  constructor(intVal: DecimalIntVal) {
    switch (typeof intVal) {
      // case 'number': {
      //   // this.mantissa = intVal.toString(10)
      //   break
      // }
      case 'string': {
        if (isLiteral(intVal)) {
          let { sign, mantissa, exponent } = parseLiteral(intVal)
          this.sign = sign
          this.mantissa = mantissa
          this.exponent = exponent
        } else {
          throw new Error('string value must be legal number')
        }
        break
      }
      default: {
        throw new Error('init value must be string or number')
      }
    }
  }
}

class JSBD {
  static BigDecimal(intVal: DecimalIntVal) {
    return new Decimal(intVal)
  }
  static add(a: Decimal, b: Decimal) {}
}

console.log(
  JSBD.BigDecimal(0.1111111111111111111111111111111111111111111111111111)
)
