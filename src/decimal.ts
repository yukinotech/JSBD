import {
  isLiteral,
  parseLiteral,
  isSN,
  parseSN,
  isInteger,
  getAbs,
  getGcd,
  isOnly25Or1,
} from './utils'
import { JSBD } from './jsbd'
import { DecimalIntVal, RoundOption } from './type'

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

  add(bVal: number | string | bigint | Decimal, option?: RoundOption): Decimal {
    let b = parseParam(bVal)
    if (this.exponent >= b.exponent) {
      let minus = this.exponent - b.exponent
      let newMantissa = this.mantissa * 10n ** BigInt(minus) + b.mantissa
      let sn = snDecimal(newMantissa, b.exponent)
      if (option) {
        return JSBD.round(sn, option)
      } else {
        return sn
      }
    } else {
      let minus = b.exponent - this.exponent
      let newMantissa = b.mantissa * 10n ** BigInt(minus) + this.mantissa
      let sn = snDecimal(newMantissa, this.exponent)
      if (option) {
        return JSBD.round(sn, option)
      } else {
        return sn
      }
    }
  }
  // subtract => a - b
  subtract(
    bVal: number | string | bigint | Decimal,
    option?: RoundOption
  ): Decimal {
    let b = parseParam(bVal)
    if (this.exponent >= b.exponent) {
      let minus = this.exponent - b.exponent
      let newMantissa = this.mantissa * 10n ** BigInt(minus) - b.mantissa
      let sn = snDecimal(newMantissa, b.exponent)
      if (option) {
        return JSBD.round(sn, option)
      } else {
        return sn
      }
    } else {
      let minus = b.exponent - this.exponent
      let newMantissa = this.mantissa - b.mantissa * 10n ** BigInt(minus)
      let sn = snDecimal(newMantissa, this.exponent)
      if (option) {
        return JSBD.round(sn, option)
      } else {
        return sn
      }
    }
  }
  // multiply => a * b
  multiply(
    bVal: number | string | bigint | Decimal,
    option?: RoundOption
  ): Decimal {
    let b = parseParam(bVal)
    let sn = snDecimal(this.mantissa * b.mantissa, this.exponent + b.exponent)
    if (option) {
      return JSBD.round(sn, option)
    } else {
      return sn
    }
  }
  // pow => a ^ b
  pow(power: number, option?: RoundOption): Decimal {
    if (!(isInteger(power) && power > 0)) {
      throw new RangeError('power must be a positive number')
    }

    let sn = snDecimal(this.mantissa, this.exponent)
    sn.mantissa = this.mantissa
    sn.exponent = this.exponent
    power--
    while (power > 0) {
      sn = JSBD.multiply(sn, this)
      power--
    }

    if (option) {
      return JSBD.round(sn, option)
    } else {
      return sn
    }
  }
  // divide => a / b
  divide(
    bVal: number | string | bigint | Decimal,
    option?: RoundOption
  ): Decimal {
    let b = parseParam(bVal)
    if (b.mantissa === 0n) {
      throw new Error(`0 can't be divided`)
    }
    if (this.mantissa === 0n) {
      return JSBD.BigDecimal('0')
    }

    // to abs
    const aPositive = getAbs(this.mantissa)
    const bPositive = getAbs(b.mantissa)
    // get greatest common factor
    // use Euclidean algorithm , if a>=b, getGcd(a,b) = getGcd(b,a mod b)
    // result is not repeating decimal
    const gcf = getGcd(aPositive, bPositive)
    let bCoprime = bPositive / gcf

    // common params
    let res = this.mantissa / b.mantissa
    let minus = this.exponent - b.exponent
    let maximumFractionDigits = option?.maximumFractionDigits
    let roundingMode = option?.roundingMode

    // result is limit decimal , and no default maximumFractionDigits
    if (maximumFractionDigits === undefined && isOnly25Or1(bCoprime)) {
      // which means should get exact value of divide
      let left = aPositive % bPositive
      if (left === 0n) return snDecimal(res, minus)
      const sign =
        (this.mantissa > 0 && b.mantissa > 0) ||
        (this.mantissa < 0 && b.mantissa < 0)
          ? 1
          : -1
      while (true) {
        // new value in the position of result
        let left10 = left * 10n
        let newValue = left10 / bPositive
        left = left10 % bPositive
        res = sign > 0 ? res * 10n + newValue : res * 10n - newValue
        minus--
        if (left === 0n) {
          break
        }
      }
      return snDecimal(res, minus)
    }

    // other case , maximumFractionDigits is needed
    if (
      !isInteger(maximumFractionDigits) &&
      maximumFractionDigits !== undefined
    ) {
      throw new TypeError(
        // @ts-ignore
        `params maximumFractionDigits :${String(
          maximumFractionDigits
        )} is not a legal integer`
      )
    }

    // the result is repeating decimal , maximumFractionDigits should be specified,
    // or round the number with 34 fractional digits using halfUp round mode
    if (maximumFractionDigits === undefined) {
      maximumFractionDigits = 34
    }

    if (roundingMode === undefined) {
      roundingMode = 'half up'
    }

    let dig = -maximumFractionDigits
    if (minus < dig) {
      let sn = snDecimal(res, minus)
      return JSBD.round(sn, {
        maximumFractionDigits,
        roundingMode,
      })
    } else {
      let toDivideTimes = minus - dig + 1
      let left = aPositive % bPositive
      if (left === 0n) {
        let sn = snDecimal(res, minus)
        return JSBD.round(sn, {
          maximumFractionDigits,
          roundingMode,
        })
      }
      if (
        (this.mantissa > 0 && b.mantissa > 0) ||
        (this.mantissa < 0 && b.mantissa < 0)
      ) {
        while (toDivideTimes > 0) {
          // new value in the position of result
          let left10 = left * 10n
          let newValue = left10 / bPositive
          left = left10 % bPositive
          res = res * 10n + newValue
          minus--
          toDivideTimes--
          if (left === 0n) {
            break
          }
        }
        let sn = snDecimal(res, minus)
        return JSBD.round(sn, {
          maximumFractionDigits,
          roundingMode,
        })
      } else {
        while (toDivideTimes > 0) {
          // new value in the position of result
          let left10 = left * 10n
          let newValue = left10 / bPositive
          left = left10 % bPositive
          res = res * 10n - newValue
          minus--
          toDivideTimes--
          if (left === 0n) {
            break
          }
        }
        let sn = snDecimal(res, minus)
        return JSBD.round(sn, {
          maximumFractionDigits,
          roundingMode,
        })
      }
    }
  }
  // remainder => a % b
  remainder(
    bVal: number | string | bigint | Decimal,
    option?: RoundOption
  ): Decimal {
    let b = parseParam(bVal)
    let v = JSBD.divide(this, b, {
      maximumFractionDigits: 0,
      roundingMode: 'down',
    })
    if (option) {
      return JSBD.round(JSBD.subtract(this, JSBD.multiply(v, b), option))
    }
    return JSBD.subtract(this, JSBD.multiply(v, b))
  }
  // equal => a === b
  equal(bVal: number | string | bigint | Decimal): boolean {
    let b = parseParam(bVal)
    let minus: number
    if (this.exponent > b.exponent) {
      minus = this.exponent - b.exponent
      return this.mantissa * 10n ** BigInt(minus) === b.mantissa
    } else if (this.exponent < b.exponent) {
      minus = b.exponent - this.exponent
      return b.mantissa * 10n ** BigInt(minus) === this.mantissa
    } else {
      return this.mantissa === b.mantissa
    }
  }
  // notEqual => a !== b
  notEqual(bVal: number | string | bigint | Decimal): boolean {
    let b = parseParam(bVal)
    return !JSBD.equal(this, b)
  }
  // lessThan => a < b
  lessThan(bVal: number | string | bigint | Decimal): boolean {
    let b = parseParam(bVal)
    let minus: number
    if (this.exponent > b.exponent) {
      minus = this.exponent - b.exponent
      return this.mantissa * 10n ** BigInt(minus) < b.mantissa
    } else if (this.exponent < b.exponent) {
      minus = b.exponent - this.exponent
      return this.mantissa < b.mantissa * 10n ** BigInt(minus)
    } else {
      return this.mantissa < b.mantissa
    }
  }
  // greaterThanOrEqual => a >= b
  greaterThanOrEqual(bVal: number | string | bigint | Decimal): boolean {
    let b = parseParam(bVal)
    return !JSBD.lessThan(this, b)
  }
  // greaterThan => a > b
  greaterThan(bVal: number | string | bigint | Decimal): boolean {
    let b = parseParam(bVal)
    let minus: number
    if (this.exponent > b.exponent) {
      minus = this.exponent - b.exponent
      return this.mantissa * 10n ** BigInt(minus) > b.mantissa
    } else if (this.exponent < b.exponent) {
      minus = b.exponent - this.exponent
      return this.mantissa > b.mantissa * 10n ** BigInt(minus)
    } else {
      return this.mantissa > b.mantissa
    }
  }
  // lessThanOrEqual => a <= b
  lessThanOrEqual(bVal: number | string | bigint | Decimal): boolean {
    let b = parseParam(bVal)
    return !JSBD.greaterThan(this, b)
  }
  // round => BigDecimal.round
  round(options?: RoundOption): Decimal {
    // @ts-ignore
    let roundingMode = options?.roundingMode
    // @ts-ignore
    const maximumFractionDigits = options?.maximumFractionDigits
    // params type check
    // check roundingMode
    if (
      roundingMode !== 'up' &&
      roundingMode !== 'down' &&
      roundingMode !== 'half down' &&
      roundingMode !== 'half up' &&
      roundingMode !== 'half even' &&
      roundingMode !== undefined
    ) {
      throw new Error(
        `roundingMode should be one of 'down' | 'half down' | 'half up' | 'half even' | 'up'`
      )
    }
    // check maximumFractionDigits
    if (
      !isInteger(maximumFractionDigits) &&
      maximumFractionDigits !== undefined
    ) {
      throw new Error(`maximumFractionDigits should be integer`)
    }
    let dig = maximumFractionDigits as number
    if (dig === undefined) {
      return snDecimal(this.mantissa, this.exponent)
    }
    if (roundingMode === undefined) {
      roundingMode = 'half up'
    }
    if (this.mantissa === 0n) {
      return snDecimal(this.mantissa, this.exponent)
    }
    // 取反
    dig = -dig
    if (roundingMode === 'up' || roundingMode === 'down') {
      if (this.exponent >= dig) {
        return snDecimal(this.mantissa, this.exponent)
      } else {
        // 缩放 maximumFractionDigits
        let minus = dig - this.exponent
        let div = 10n ** BigInt(minus)
        let left = this.mantissa % div
        let withZero = this.mantissa - left
        if (this.mantissa > 0n && left > 0n) {
          if (roundingMode === 'up') {
            return snDecimal(withZero + div, this.exponent)
          } else {
            return snDecimal(withZero, this.exponent)
          }
        } else if (this.mantissa < 0n && left < 0n) {
          if (roundingMode === 'up') {
            return snDecimal(withZero - div, this.exponent)
          } else {
            return snDecimal(withZero, this.exponent)
          }
        } else {
          // left === 0n
          return snDecimal(withZero, this.exponent)
        }
      }
    } else {
      if (this.exponent >= dig) {
        return snDecimal(this.mantissa, this.exponent)
      } else {
        let minus = dig - this.exponent
        let div = 10n ** BigInt(minus)
        let subDiv = 10n ** BigInt(minus - 1)
        let left = this.mantissa % div
        let subLeft = this.mantissa % subDiv
        let dependValue = (left - subLeft) / subDiv
        let withZero = this.mantissa - left
        if (roundingMode === 'half up') {
          if (getAbs(dependValue) > 4) {
            if (this.mantissa > 0) {
              return snDecimal(withZero + div, this.exponent)
            } else {
              return snDecimal(withZero - div, this.exponent)
            }
          } else {
            return snDecimal(withZero, this.exponent)
          }
        } else if (roundingMode === 'half down') {
          if (getAbs(dependValue) > 5) {
            if (this.mantissa > 0) {
              return snDecimal(withZero + div, this.exponent)
            } else {
              return snDecimal(withZero - div, this.exponent)
            }
          } else {
            return snDecimal(withZero, this.exponent)
          }
        } else {
          // roundingMode === 'half even'
          if (getAbs(dependValue) > 5) {
            if (this.mantissa > 0) {
              return snDecimal(withZero + div, this.exponent)
            } else {
              return snDecimal(withZero - div, this.exponent)
            }
          } else if (getAbs(dependValue) < 5) {
            return snDecimal(withZero, this.exponent)
          } else {
            // dependValue === 5
            let superDiv = 10n ** BigInt(minus + 1)
            let superLeft = this.mantissa % superDiv
            // evenDependValue can be negative or positive
            let evenDependValue = (superLeft - left) / div
            if (evenDependValue % 2n !== 0n) {
              if (this.mantissa > 0) {
                return snDecimal(withZero + div, this.exponent)
              } else {
                return snDecimal(withZero - div, this.exponent)
              }
            } else {
              return snDecimal(withZero, this.exponent)
            }
          }
        }
      }
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

function parseParam(param: number | string | bigint | Decimal) {
  if (param instanceof Decimal) return param
  return new Decimal(param)
}
// let a = new Decimal(2)
// let b = a.add(new Decimal(3)).divide(new Decimal(2))
// console.log('b', b)
