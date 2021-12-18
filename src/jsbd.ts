import { DecimalIntVal, RoundOption } from './type'
import { Decimal } from './decimal'
import { snDecimal, isInteger, getAbs } from './utils'

export class JSBD {
  static BigDecimal(intVal: DecimalIntVal) {
    return new Decimal(intVal)
  }
  // add => a + b
  static add(a: Decimal, b: Decimal) {}
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
  static round(
    a: Decimal,
    options: RoundOption = {
      roundingMode: 'half up',
    }
  ): Decimal {
    let { roundingMode, maximumFractionDigits } = options
    // params type check
    // check roundingMode
    if (
      roundingMode !== 'up' &&
      roundingMode !== 'down' &&
      roundingMode !== 'half down' &&
      roundingMode !== 'half up' &&
      roundingMode !== 'half even'
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
    let dig = maximumFractionDigits
    if (dig === undefined) return snDecimal(a.mantissa, a.exponent)
    if (a.mantissa === 0n) return snDecimal(a.mantissa, a.exponent)
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
        // console.log('div', div)
        // console.log('subDiv', subDiv)
        // console.log('left', left)
        // console.log('subLeft', subLeft)
        // console.log('withZero', withZero)
        // console.log('dependValue', dependValue)
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
            let evenDependValue = (superLeft - left) / div
            if (evenDependValue % 1n !== 0n) {
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
