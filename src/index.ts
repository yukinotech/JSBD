import { DecimalIntVal, DecimalSign } from "./type"
import { isLiteral } from "./utils"

class BigInt {
  constructor(intVal: string) {
    return intVal
  }
}
class Decimal {
  // sign: DecimalSign
  // mantissa: string
  // exponent: string
  constructor(intVal: DecimalIntVal) {
    switch (typeof intVal) {
      case "number": {
        // this.mantissa = intVal.toString(10)
        break
      }
      case "string": {
        if (isLiteral(intVal)) {
        }
        break
      }
      default: {
        throw new Error("init value must be string or number")
      }
    }
  }
}

class JSBD {
  static BigDecimal(intVal: DecimalIntVal) {
    return new Decimal(intVal)
  }
  static add(a: Decimal, b: Decimal) {}
}

console.log(
  JSBD.BigDecimal(0.1111111111111111111111111111111111111111111111111111)
)
