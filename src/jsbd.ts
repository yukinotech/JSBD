import { DecimalIntVal } from './type'
import { Decimal } from './decimal'

export class JSBD {
  static BigDecimal(intVal: DecimalIntVal) {
    return new Decimal(intVal)
  }
  static add(a: Decimal, b: Decimal) {}
  // equal  =>  ===
  static equal(a: Decimal, b: Decimal) {
    if (a.sign !== b.sign) return
    // intAdd(
    //   { sign: a.exponent.sign, value: a.exponent.value },
    //   { sign: b.exponent.sign, value: b.exponent.value }
    // )
  }
}
