import { isLiteral, parseLiteral } from './utils'

export class Decimal {
  mantissa: bigint
  exponent: bigint
  constructor(intVal: number | string) {
    switch (typeof intVal) {
      // case 'number': {
      //   // this.mantissa = intVal.toString(10)
      //   break
      // }
      case 'string': {
        if (isLiteral(intVal)) {
          let { mantissa, exponent } = parseLiteral(intVal)
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
