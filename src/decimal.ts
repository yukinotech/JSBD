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
        if (isNaN(intVal) || intVal === Infinity || intVal === -Infinity) {
          throw new Error(`intVal can't be Infinity or NaN`)
        }
        return new Decimal(intVal.toString(10))
      }
      case 'string': {
        // to make easy to use
        intVal = intVal.trim()
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
          throw new Error(`string value "${intVal}"must be legal number`)
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
      if (this.mantissa === 0n) {
        if (fractionDigits === 0 || fractionDigits === undefined) return '0e+0'
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

      if (fractionDigits === undefined) {
        // to get precision
        fractionDigits = str.slice(offset).replace(/0*$/, '').length - 1
      }

      let mantissa, exponent
      if (fractionDigits < str.length - offset - 1) {
        // to half up
        let v = JSBD.round(snDecimal(this.mantissa, this.exponent), {
          maximumFractionDigits:
            fractionDigits - this.exponent - (str.length - offset - 1),
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
          `${(() => {
            if (finalExponent === 0) {
              return '+0'
            } else if (finalExponent > 0) {
              return '+' + finalExponent.toString()
            } else {
              return finalExponent.toString()
            }
          })()}`
        )
      } else {
        let beforePoint = noZeroVStr.slice(0, offset + 1)
        let afterPoint = noZeroVStr.slice(offset + 1)
        let zero = ''
        for (let i = 0; i < fractionDigits - afterPoint.length; i++) {
          zero += '0'
        }
        return (
          beforePoint +
          '.' +
          afterPoint +
          zero +
          'e' +
          `${(() => {
            if (finalExponent === 0) {
              return '+0'
            } else if (finalExponent > 0) {
              return '+' + finalExponent.toString()
            } else {
              return finalExponent.toString()
            }
          })()}`
        )
      }
    } else {
      throw new Error('param fractionDigits must be a integer >=0 ')
    }
  }
  toPrecision(precision?: number) {
    if (precision === undefined) {
      return this.toString()
    } else if (isInteger(precision) && precision > 0) {
      if (this.mantissa === 0n) {
        // handle zero
        if (precision === 1) return '0'
        let rtnStr = ''
        while (precision > 1) {
          rtnStr += '0'
          precision--
        }
        return '0.' + rtnStr
      }
      const mantissaStr = this.mantissa.toString()
      let mantissa = this.mantissa
      let exponent = this.exponent
      let newMantissaStr = mantissaStr
      let offset = 0
      if (mantissa < 0) {
        offset = 1
      }
      if (precision < mantissaStr.length - offset) {
        // need round
        const v = JSBD.round(snDecimal(this.mantissa, this.exponent), {
          roundingMode: 'half up',
          maximumFractionDigits:
            precision - (mantissaStr.length - offset) - this.exponent,
        })
        mantissa = v.mantissa
        exponent = v.exponent
        newMantissaStr = mantissa.toString()
      }
      // to format
      let minus, precisionStr

      if (precision > newMantissaStr.length - offset) {
        // at least x * 10^n , precision >=2
        minus = precision - (newMantissaStr.length - offset)
        exponent = exponent - minus
        precisionStr = newMantissaStr
        while (minus > 0) {
          precisionStr += '0'
          minus--
        }
      } else {
        precisionStr = newMantissaStr.slice(0, precision + offset)
        minus = newMantissaStr.length - offset - precision
        exponent = exponent + minus
      }
      // precisionStr is precision value
      // now , result = precisionStr * 10^exponent
      if (exponent > 0) {
        // need to format with e
        if (precisionStr.length - offset === 1) {
          return precisionStr + 'e+' + exponent.toString()
        }
        return (
          precisionStr.slice(0, offset + 1) +
          '.' +
          precisionStr.slice(offset + 1) +
          'e+' +
          (exponent + precision - 1).toString()
        )
      } else if (exponent === 0) {
        return precisionStr
      } else {
        // need to format with point
        let absExponent = -1 * exponent
        if (precisionStr.length - offset > absExponent) {
          // minusFlag >= 0
          let insert = precisionStr.length - absExponent
          return (
            precisionStr.slice(0, insert) + '.' + precisionStr.slice(insert)
          )
        } else {
          let zero = ''
          let zeroNumber = absExponent - (precisionStr.length - offset)
          while (zeroNumber > 0) {
            zero += '0'
            zeroNumber--
          }
          return offset === 0
            ? '0.' + zero + precisionStr
            : '-0.' + zero + precisionStr.slice(1)
        }
      }
    } else {
      throw new Error('precision should be an integer >= 1')
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
