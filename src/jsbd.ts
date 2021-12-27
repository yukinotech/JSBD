import { DecimalIntVal, RoundOption } from './type'
import { Decimal, snDecimal } from './decimal'
import { isInteger, getAbs } from './utils'

export class JSBD {
  /**
   * Init a BigDecimal object
   * @param intVal default value to init a BigDecimal object
   */
  static BigDecimal(intVal: DecimalIntVal) {
    return new Decimal(intVal)
  }
  // add => a + b
  static add(a: Decimal, b: Decimal, option?: RoundOption): Decimal {
    if (a.exponent >= b.exponent) {
      let minus = a.exponent - b.exponent
      let newMantissa = a.mantissa * 10n ** BigInt(minus) + b.mantissa
      let sn = snDecimal(newMantissa, b.exponent)
      if (option) {
        return JSBD.round(sn, option)
      } else {
        return sn
      }
    } else {
      let minus = b.exponent - a.exponent
      let newMantissa = b.mantissa * 10n ** BigInt(minus) + a.mantissa
      let sn = snDecimal(newMantissa, a.exponent)
      if (option) {
        return JSBD.round(sn, option)
      } else {
        return sn
      }
    }
  }
  // subtract => a - b
  static subtract(a: Decimal, b: Decimal, option?: RoundOption): Decimal {
    if (a.exponent >= b.exponent) {
      let minus = a.exponent - b.exponent
      let newMantissa = a.mantissa * 10n ** BigInt(minus) - b.mantissa
      let sn = snDecimal(newMantissa, b.exponent)
      if (option) {
        return JSBD.round(sn, option)
      } else {
        return sn
      }
    } else {
      let minus = b.exponent - a.exponent
      let newMantissa = a.mantissa - b.mantissa * 10n ** BigInt(minus)
      let sn = snDecimal(newMantissa, a.exponent)
      if (option) {
        return JSBD.round(sn, option)
      } else {
        return sn
      }
    }
  }
  // multiply => a * b
  static multiply(a: Decimal, b: Decimal, option?: RoundOption): Decimal {
    let sn = snDecimal(a.mantissa * b.mantissa, a.exponent + b.exponent)
    if (option) {
      return JSBD.round(sn, option)
    } else {
      return sn
    }
  }
  // pow => a ^ b
  static pow(a: Decimal, power: number, option?: RoundOption): Decimal {
    if (!(isInteger(power) && power > 0)) {
      throw new RangeError('power must be a positive number')
    }
    let sn = a
    power--
    while (power > 0) {
      sn = JSBD.multiply(sn, a)
      power--
    }

    if (option) {
      return JSBD.round(sn, option)
    } else {
      return sn
    }
  }
  // divide => a / b
  static divide(a: Decimal, b: Decimal, option: RoundOption): Decimal {
    // @ts-ignore
    const maximumFractionDigits = option?.maximumFractionDigits as number
    if (!isInteger(maximumFractionDigits)) {
      throw new TypeError(
        'divide result maximumFractionDigits must be an integer'
      )
    }
    if (b.mantissa === 0n) {
      throw new Error(`0 can't be divided`)
    }
    if (a.mantissa === 0n) {
      return JSBD.BigDecimal('0')
    }
    let res = a.mantissa / b.mantissa
    let minus = a.exponent - b.exponent
    let dig = -maximumFractionDigits
    if (minus < dig) {
      let sn = snDecimal(res, minus)
      return JSBD.round(sn, option)
    } else {
      let toDivideTimes = minus - dig + 1
      // all to be positive
      let aPositive = a.mantissa > 0 ? a.mantissa : a.mantissa * -1n
      let bPositive = b.mantissa > 0 ? b.mantissa : b.mantissa * -1n
      let left = aPositive % bPositive
      if (left === 0n) {
        let sn = snDecimal(res, minus)
        return JSBD.round(sn, option)
      }
      if (
        (a.mantissa > 0 && b.mantissa > 0) ||
        (a.mantissa < 0 && b.mantissa < 0)
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
        return JSBD.round(sn, option)
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
        return JSBD.round(sn, option)
      }
    }
  }
  // remainder => a % b
  static remainder(a: Decimal, b: Decimal, option?: RoundOption): Decimal {
    let v = JSBD.divide(a, b, {
      maximumFractionDigits: 0,
      roundingMode: 'down',
    })
    if (option) {
      return JSBD.round(JSBD.subtract(a, JSBD.multiply(v, b), option))
    }
    return JSBD.subtract(a, JSBD.multiply(v, b))
  }
  // equal => a === b
  static equal(a: Decimal, b: Decimal): boolean {
    let minus: number
    if (a.exponent > b.exponent) {
      minus = a.exponent - b.exponent
      return a.mantissa * 10n ** BigInt(minus) === b.mantissa
    } else if (a.exponent < b.exponent) {
      minus = b.exponent - a.exponent
      return b.mantissa * 10n ** BigInt(minus) === a.mantissa
    } else {
      return a.mantissa === b.mantissa
    }
  }
  // notEqual => a !== b
  static notEqual(a: Decimal, b: Decimal): boolean {
    return !JSBD.equal(a, b)
  }
  // lessThan => a < b
  static lessThan(a: Decimal, b: Decimal): boolean {
    let minus: number
    if (a.exponent > b.exponent) {
      minus = a.exponent - b.exponent
      return a.mantissa * 10n ** BigInt(minus) < b.mantissa
    } else if (a.exponent < b.exponent) {
      minus = b.exponent - a.exponent
      return a.mantissa < b.mantissa * 10n ** BigInt(minus)
    } else {
      return a.mantissa < b.mantissa
    }
  }
  // greaterThanOrEqual => a >= b
  static greaterThanOrEqual(a: Decimal, b: Decimal): boolean {
    return !JSBD.lessThan(a, b)
  }
  // greaterThan => a > b
  static greaterThan(a: Decimal, b: Decimal): boolean {
    let minus: number
    if (a.exponent > b.exponent) {
      minus = a.exponent - b.exponent
      return a.mantissa * 10n ** BigInt(minus) > b.mantissa
    } else if (a.exponent < b.exponent) {
      minus = b.exponent - a.exponent
      return a.mantissa > b.mantissa * 10n ** BigInt(minus)
    } else {
      return a.mantissa > b.mantissa
    }
  }
  // lessThanOrEqual => a <= b
  static lessThanOrEqual(a: Decimal, b: Decimal): boolean {
    return !JSBD.greaterThan(a, b)
  }
  // round => BigDecimal.round
  static round(a: Decimal, options?: RoundOption): Decimal {
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
      return snDecimal(a.mantissa, a.exponent)
    }
    if (roundingMode === undefined) {
      roundingMode = 'half up'
    }
    if (a.mantissa === 0n) {
      return snDecimal(a.mantissa, a.exponent)
    }
    // 取反
    dig = -dig
    if (roundingMode === 'up' || roundingMode === 'down') {
      if (a.exponent >= dig) {
        return snDecimal(a.mantissa, a.exponent)
      } else {
        // 缩放 maximumFractionDigits
        let minus = dig - a.exponent
        let div = 10n ** BigInt(minus)
        let left = a.mantissa % div
        let withZero = a.mantissa - left
        if (a.mantissa > 0n && left > 0n) {
          if (roundingMode === 'up') {
            return snDecimal(withZero + div, a.exponent)
          } else {
            return snDecimal(withZero, a.exponent)
          }
        } else if (a.mantissa < 0n && left < 0n) {
          if (roundingMode === 'up') {
            return snDecimal(withZero - div, a.exponent)
          } else {
            return snDecimal(withZero, a.exponent)
          }
        } else {
          // left === 0n
          return snDecimal(withZero, a.exponent)
        }
      }
    } else {
      if (a.exponent >= dig) {
        return snDecimal(a.mantissa, a.exponent)
      } else {
        let minus = dig - a.exponent
        let div = 10n ** BigInt(minus)
        let subDiv = 10n ** BigInt(minus - 1)
        let left = a.mantissa % div
        let subLeft = a.mantissa % subDiv
        let dependValue = (left - subLeft) / subDiv
        let withZero = a.mantissa - left
        if (roundingMode === 'half up') {
          if (getAbs(dependValue) > 4) {
            if (a.mantissa > 0) {
              return snDecimal(withZero + div, a.exponent)
            } else {
              return snDecimal(withZero - div, a.exponent)
            }
          } else {
            return snDecimal(withZero, a.exponent)
          }
        } else if (roundingMode === 'half down') {
          if (getAbs(dependValue) > 5) {
            if (a.mantissa > 0) {
              return snDecimal(withZero + div, a.exponent)
            } else {
              return snDecimal(withZero - div, a.exponent)
            }
          } else {
            return snDecimal(withZero, a.exponent)
          }
        } else {
          // roundingMode === 'half even'
          if (getAbs(dependValue) > 5) {
            if (a.mantissa > 0) {
              return snDecimal(withZero + div, a.exponent)
            } else {
              return snDecimal(withZero - div, a.exponent)
            }
          } else if (getAbs(dependValue) < 5) {
            return snDecimal(withZero, a.exponent)
          } else {
            // dependValue === 5
            let superDiv = 10n ** BigInt(minus + 1)
            let superLeft = a.mantissa % superDiv
            // evenDependValue can be negative or positive
            let evenDependValue = (superLeft - left) / div
            if (evenDependValue % 2n !== 0n) {
              if (a.mantissa > 0) {
                return snDecimal(withZero + div, a.exponent)
              } else {
                return snDecimal(withZero - div, a.exponent)
              }
            } else {
              return snDecimal(withZero, a.exponent)
            }
          }
        }
      }
    }
  }
}
