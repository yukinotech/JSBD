import { isLiteral, parseLiteral, isSN, parseSN, isInteger } from './utils'
import { JSBD } from './jsbd'

export class Decimal {
  mantissa!: bigint
  exponent!: number
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
          // style like 1234.56
          let { mantissa, exponent } = parseLiteral(intVal)
          this.mantissa = mantissa
          this.exponent = exponent
        } else if (isSN(intVal)) {
          // scientific notation style like 115e-10
          let { mantissa, exponent } = parseSN(intVal)
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
      let offset = this.exponent * -1
      let str: string
      // make str without sign
      if (this.mantissa > 0) {
        str = this.mantissa.toString(10)
      } else {
        str = (this.mantissa * -1n).toString(10)
      }
      if (str.length > offset) {
        let minus = str.length - offset
        let withZeroStr = str.slice(0, minus) + '.' + str.slice(minus)
        return this.mantissa > 0
          ? withZeroStr.replace(/\.?0*$/, '')
          : '-' + withZeroStr.replace(/\.?0*$/, '')
      } else {
        let minus = offset - str.length
        let addZero = '0.'
        while (minus > 0) {
          addZero += '0'
          minus--
        }
        let withZeroStr = addZero + str
        return this.mantissa > 0
          ? withZeroStr.replace(/\.?0*$/, '')
          : '-' + withZeroStr.replace(/\.?0*$/, '')
      }
    }
  }
  toFixed(digits?: number) {
    if ((isInteger(digits) && digits >= 0) || digits === undefined) {
      if (digits === undefined) {
        digits = 0
      }
      let v = JSBD.round(snDecimal(this.mantissa, this.exponent), {
        maximumFractionDigits: digits,
        roundingMode: 'half up',
      })
      let str = v.toString()
      if (str.indexOf('.') !== -1) {
        let [before, after] = str.split('.')
        for (let i = 0; i < digits - after.length; i++) {
          str += '0'
        }
        return str
      } else {
        if (digits === 0) return str
        str += '.'
        for (let i = 0; i < digits; i++) {
          str += '0'
        }
        return str
      }
    } else {
      throw new Error('param digits must be a integer >=0 ')
    }
  }
  toExponential(fractionDigits?: number) {
    if (
      (isInteger(fractionDigits) && fractionDigits >= 0) ||
      fractionDigits === undefined
    ) {
      if (fractionDigits === undefined) {
        fractionDigits = 0
      }
      if (this.mantissa === 0n) {
        if (fractionDigits === 0) return '0e+0'
        let rtn = '0.'
        for (let i = 0; i < fractionDigits; i++) {
          rtn += '0'
        }
        return rtn + 'e+0'
      }
      let str = this.mantissa.toString(10)
      let offset = 0
      if (this.mantissa < 0) {
        offset = 1
      }
      let mantissa, exponent
      if (fractionDigits < str.length - offset - 1) {
        // to half up
        let v = JSBD.round(snDecimal(this.mantissa, this.exponent), {
          maximumFractionDigits:
            fractionDigits + this.exponent - (str.length - offset - 1),
          roundingMode: 'half up',
        })
        mantissa = v.mantissa
        exponent = v.exponent
      } else {
        mantissa = this.mantissa
        exponent = this.exponent
      }
      // to format

      let vStr = mantissa.toString(10)
      console.log('vStr', vStr)
      console.log('mantissa', mantissa)
      console.log('exponent', exponent)
      let vOffset = 0
      if (mantissa < 0) {
        vOffset = 1
      }
      // get final exponent
      let finalExponent = exponent + vStr.length - 1 - vOffset

      // add point and add zero
      let noZeroVStr = vStr.replace(/0*$/, '')
      if (noZeroVStr.length - offset === 1) {
        // eg: 9 * 10^6
        let point = fractionDigits === 0 ? '' : '.'
        for (let i = 0; i < fractionDigits; i++) {
          point += '0'
        }
        return (
          noZeroVStr +
          point +
          'e' +
          `${finalExponent === 0 ? '+0' : finalExponent.toString()}`
        )
      } else {
        let beforePoint = noZeroVStr.slice(0, offset)
        let afterPoint = noZeroVStr.slice(offset + 1)
        let point = '.'
        for (let i = 0; i < fractionDigits - afterPoint.length; i++) {
          point += '0'
        }
        return (
          beforePoint +
          point +
          afterPoint +
          'e' +
          `${finalExponent === 0 ? '+0' : finalExponent.toString()}`
        )
      }
    } else {
      throw new Error('param fractionDigits must be a integer >=0 ')
    }
  }
}

// build a decimal form scientific notation
export function snDecimal(mantissa: bigint, exponent: number) {
  let v = new Decimal('0')
  v.exponent = exponent
  v.mantissa = mantissa
  return v
}
