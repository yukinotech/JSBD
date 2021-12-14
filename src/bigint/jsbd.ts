import { DecimalIntVal, RoundOption } from './type'
import { Decimal } from './decimal'

export class JSBD {
  static BigDecimal(intVal: DecimalIntVal) {
    return new Decimal(intVal)
  }
  // add => a + b
  static add(a: Decimal, b: Decimal) {}
  // equal => a === b
  static equal(a: Decimal, b: Decimal) {
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
  static notEqual(a: Decimal, b: Decimal) {
    return !JSBD.equal(a, b)
  }
  // lessThan => a < b
  static lessThan(a: Decimal, b: Decimal) {
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
  static greaterThanOrEqual(a: Decimal, b: Decimal) {
    return !JSBD.lessThan(a, b)
  }
  // greaterThan => a > b
  static greaterThan(a: Decimal, b: Decimal) {
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
  static lessThanOrEqual(a: Decimal, b: Decimal) {
    return !JSBD.greaterThan(a, b)
  }
  // round => BigDecimal.round
  static round(
    a: Decimal,
    options: RoundOption = {
      roundingMode: 'half up',
    }
  ) {
    let { roundingMode, maximumFractionDigits } = options
  }
}
