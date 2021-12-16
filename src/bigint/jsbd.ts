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
  ): Decimal | undefined {
    let { roundingMode, maximumFractionDigits } = options
    let dig = maximumFractionDigits
    if (dig === undefined) return a
    if (a.mantissa === 0n) return a
    // 取反
    dig = -dig
    if (roundingMode === 'up' || roundingMode === 'down') {
      if (a.exponent >= dig) {
        return a
      } else {
        // 缩放 maximumFractionDigits
        let minus = dig - a.exponent
        let div = 10n ** BigInt(minus)
        let left = a.mantissa % div
        let withZero = a.mantissa - left
        if (a.mantissa > 0n && left > 0n) {
          if (roundingMode === 'up') {
            a.mantissa = withZero + div
          } else {
            a.mantissa = withZero
          }
          return a
        } else if (a.mantissa < 0n && left < 0n) {
          if (roundingMode === 'up') {
            a.mantissa = withZero - div
          } else {
            a.mantissa = withZero
          }
          return a
        } else {
          // left === 0n
          a.mantissa = withZero
          return a
        }
      }
    }
  }
}
