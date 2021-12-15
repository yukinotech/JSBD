import { isLiteral, parseLiteral } from './utils'

export class Decimal {
  mantissa!: bigint
  exponent!: bigint
  constructor(intVal: number | string | bigint) {
    switch (typeof intVal) {
      case 'bigint': {
        return new Decimal(intVal.toString(10))
      }
      case 'number': {
        return new Decimal(intVal.toString(10))
      }
      case 'string': {
        if (isLiteral(intVal)) {
          let { mantissa, exponent } = parseLiteral(intVal)
          this.mantissa = mantissa
          this.exponent = exponent
        } else if (isLiteral(intVal)) {
          // to do scientific notation
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
  toString() {
    if (this.mantissa === 0n) {
      return '0'
    }
    if (this.exponent >= 0) {
      let zero = ''
      let offset = this.exponent
      while (offset > 0) {
        zero += '0'
        offset--
      }
      return this.mantissa.toString(10) + zero
    } else {
      let offset = this.exponent * -1n
      let str = this.mantissa.toString(10)
      if (str.length > offset) {
        let minus = Number(BigInt(str.length) - offset)
        let withZeroStr = str.slice(0, minus) + '.' + str.slice(minus)
        return withZeroStr.replace(/\.?0*$/, '')
      } else {
        let minus = Number(offset - BigInt(str.length))
        let addZero = '0.'
        while (minus > 0) {
          addZero += '0'
          minus--
        }
        let withZeroStr = addZero + str
        return withZeroStr.replace(/\.?0*$/, '')
      }
    }
  }
}
