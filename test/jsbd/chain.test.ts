import { JSBD } from '../../src/jsbd'

let t = (addendA: any, addendB: any, divideA: any, expected: any, roundOption?: any) => {
  test(addendA.toString() + ' + ' + addendB.toString(), () => {
    let a = JSBD.BigDecimal(addendA)
    let b = JSBD.BigDecimal(addendB)
    let c = JSBD.BigDecimal(divideA)
    let res = a.add(b, roundOption).divide(c, roundOption)
    let expectedV = JSBD.BigDecimal(expected)
    expect(res.toString()).toBe(expectedV.toString())
  })
}
t('100', '100.00', '2', '100')
