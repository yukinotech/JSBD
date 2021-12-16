import { DecimalIntVal, RoundOption } from './type'
import { Decimal } from './decimal'

export class JSBD {
  static BigDecimal(intVal: DecimalIntVal) {
    return new Decimal(intVal)
  }
  // add => a + b
  static add(a: Decimal, b: Decimal) {}
  // equal => a === b
  static equal(a: Decimal, b: Decimal): boolean {
    let minus: bigint
    if (a.exponent > b.exponent) {
      minus = a.exponent - b.exponent
      return a.mantissa * 10n ** minus === b.mantissa
    } else if (a.exponent < b.exponent) {
      minus = b.exponent - a.exponent
      return b.mantissa * 10n ** minus === a.mantissa
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
    let minus: bigint
    if (a.exponent > b.exponent) {
      minus = a.exponent - b.exponent
      return a.mantissa * 10n ** minus < b.mantissa
    } else if (a.exponent < b.exponent) {
      minus = b.exponent - a.exponent
      return a.mantissa < b.mantissa * 10n ** minus
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
    let minus: bigint
    if (a.exponent > b.exponent) {
      minus = a.exponent - b.exponent
      return a.mantissa * 10n ** minus > b.mantissa
    } else if (a.exponent < b.exponent) {
      minus = b.exponent - a.exponent
      return a.mantissa > b.mantissa * 10n ** minus
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
  ): Decimal | undefined {
    let { roundingMode, maximumFractionDigits } = options
    let dig = maximumFractionDigits
    if (!dig) {
      return a
    }
    switch (roundingMode) {
      case 'up': {
        if (dig < 0) {
          if (a.exponent > dig) {
            let minus = a.exponent - BigInt(dig)
            let div = 10n ** minus
            console.log('div', div)
            let hasZero = (a.mantissa / div) * div
            console.log('hasZero', hasZero)
            let left = a.mantissa - hasZero
            console.log('left', left)
            if (left > 0) {
              a.mantissa = hasZero + div
            } else {
              a.mantissa = hasZero
            }
            return a
          } else {
          }
        }
      }
    }
  }
}
