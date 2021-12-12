import { DecimalSign } from "./type"

export function isLiteral(str: string) {
  // first check if str is legal literal number ,see test for detail
  if (str.match(/^(-|\+)?((0\.[0-9]*)|([1-9][0-9]*\.[0-9]*)|([1-9][0-9]*)|(0))$/)) {
    let sign: DecimalSign = 1
    if (str[0] === "-") {
      sign = -1
    }
    return { sign }
  } else {
    return null
  }
}
