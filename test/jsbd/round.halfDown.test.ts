import { JSBD } from '../../src/jsbd'

let t = (a: any, expected: any, roundOption?: any) => {
  test(a.toString() + ' ' + roundOption.roundingMode, () => {
    let a1 = JSBD.BigDecimal(a)
    let res = JSBD.round(a1, roundOption)
    let expectedV = JSBD.BigDecimal(expected)
    expect(res.toString()).toBe(expectedV.toString())
  })
}

// BigDecimal = 0
test('"0.000" round half down "-1"', () => {
  let a = JSBD.BigDecimal('0.000')
  expect(
    JSBD.round(a, {
      roundingMode: 'half down',
      maximumFractionDigits: -1,
    }).toString()
  ).toBe('0')
})

// BigDecimal > 0 && maximumFractionDigits <= 0
test('"1155.4" round half down "-1"', () => {
  let a = JSBD.BigDecimal('1155.4')
  expect(
    JSBD.round(a, {
      roundingMode: 'half down',
      maximumFractionDigits: -1,
    }).toString()
  ).toBe('1160')
})

test('"114.67" round half down "0"', () => {
  let a = JSBD.BigDecimal('114.67')
  expect(
    JSBD.round(a, {
      roundingMode: 'half down',
      maximumFractionDigits: 0,
    }).toString()
  ).toBe('115')
})

test('"101" round half down "-3"', () => {
  let a = JSBD.BigDecimal('101')
  expect(
    JSBD.round(a, {
      roundingMode: 'half down',
      maximumFractionDigits: -3,
    }).toString()
  ).toBe('0')
})

// BigDecimal > 0 && maximumFractionDigits > 0

test('"101.6987" round half down "1"', () => {
  let a = JSBD.BigDecimal('101.6987')
  expect(
    JSBD.round(a, {
      roundingMode: 'half down',
      maximumFractionDigits: 1,
    }).toString()
  ).toBe('101.7')
})

test('"110.006" round half down "2"', () => {
  let a = JSBD.BigDecimal('110.006')
  expect(
    JSBD.round(a, {
      roundingMode: 'half down',
      maximumFractionDigits: 2,
    }).toString()
  ).toBe('110.01')
})

test('"101.005" round half down "2"', () => {
  let a = JSBD.BigDecimal('101.005')
  expect(
    JSBD.round(a, {
      roundingMode: 'half down',
      maximumFractionDigits: 2,
    }).toString()
  ).toBe('101')
})

test('"101.34" round half down "4"', () => {
  let a = JSBD.BigDecimal('101.34')
  expect(
    JSBD.round(a, {
      roundingMode: 'half down',
      maximumFractionDigits: 4,
    }).toString()
  ).toBe('101.34')
})

// BigDecimal < 0 && maximumFractionDigits >= 0

test('"-101.6987" round half down "1"', () => {
  let a = JSBD.BigDecimal('-101.6987')
  expect(
    JSBD.round(a, {
      roundingMode: 'half down',
      maximumFractionDigits: 1,
    }).toString()
  ).toBe('-101.7')
})

test('"-110.05" round half down "1"', () => {
  let a = JSBD.BigDecimal('-110.05')
  expect(
    JSBD.round(a, {
      roundingMode: 'half down',
      maximumFractionDigits: 1,
    }).toString()
  ).toBe('-110')
})

test('"-101.56" round half down "1"', () => {
  let a = JSBD.BigDecimal('-101.56')
  expect(
    JSBD.round(a, {
      roundingMode: 'half down',
      maximumFractionDigits: 1,
    }).toString()
  ).toBe('-101.6')
})

test('"-101.34" round half down "4"', () => {
  let a = JSBD.BigDecimal('-101.34')
  expect(
    JSBD.round(a, {
      roundingMode: 'half down',
      maximumFractionDigits: 4,
    }).toString()
  ).toBe('-101.34')
})

// BigDecimal < 0 && maximumFractionDigits < 0

test('"-101.6987" round half down "-1"', () => {
  let a = JSBD.BigDecimal('-101.6987')
  expect(
    JSBD.round(a, {
      roundingMode: 'half down',
      maximumFractionDigits: -1,
    }).toString()
  ).toBe('-100')
})

test('"-106.001" round half down "-1"', () => {
  let a = JSBD.BigDecimal('-106.001')
  expect(
    JSBD.round(a, {
      roundingMode: 'half down',
      maximumFractionDigits: -1,
    }).toString()
  ).toBe('-110')
})

test('"-101.005" round half down "-3"', () => {
  let a = JSBD.BigDecimal('-101.005')
  expect(
    JSBD.round(a, {
      roundingMode: 'half down',
      maximumFractionDigits: -3,
    }).toString()
  ).toBe('0')
})

test('"111967.045454545" round half down "2"', () => {
  let a = JSBD.BigDecimal('111967.045454545')
  expect(
    JSBD.round(a, {
      roundingMode: 'half down',
      maximumFractionDigits: 2,
    }).toString()
  ).toBe('111967.05')
})

// without maximumFractionDigits or without option
test('"-901.34" round half down with no option', () => {
  let a = JSBD.BigDecimal('-901.34')
  expect(JSBD.round(a).toString()).toBe('-901.34')
})

test('"1.34" round half down with no option', () => {
  let a = JSBD.BigDecimal('1.34')
  expect(
    JSBD.round(a, {
      roundingMode: 'half down',
    }).toString()
  ).toBe('1.34')
})

t('-865241986', '-865241986', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-712213239.8', '-712213240', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-614220681.1', '-614220681', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('7670246.6', '7670247', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-715272965.1', '-715272965', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-9827565.7', '-9827566', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-21.6', '-22', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('0.3', '0', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('65260440.2', '65260440', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('484158983.7', '484158984', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('0.9', '1', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('7352890.8', '7352891', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('779933245.4', '779933245', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-19390.5', '-19390', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-0.6', '-1', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-585436259.9', '-585436260', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('77656.6', '77657', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-75926.3', '-75926', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('6', '6', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('0.3', '0', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('0.5', '0', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('224522.3', '224522', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-98683.1', '-98683', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-0.1', '0', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('3652746.3', '3652746', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('6.7', '7', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('71.3', '71', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-38627.7', '-38628', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('646199.6', '646200', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('1731.1', '1731', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('14742569.5', '14742569', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-0.9', '-1', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-5354718', '-5354718', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('2857.8', '2858', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-5.6', '-6', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('95588.3', '95588', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-0.1', '0', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('17308679.2', '17308679', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('251861519.4', '251861519', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('63.5', '63', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-97.1', '-97', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-86.8', '-87', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('54848.4', '54848', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-0.4', '0', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-721668482.3', '-721668482', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-735425.2', '-735425', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('5030', '5030', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('543740564.8', '543740565', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-133083258.1', '-133083258', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('39.7', '40', { maximumFractionDigits: 0, roundingMode: 'half down' })

t('-7859541.395', '-7859541.39', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('9969923.855', '9969923.85', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('0.828', '0.83', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('-1374779.165', '-1374779.16', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('-127.667', '-127.67', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('-3.836', '-3.84', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('6521256.443', '6521256.44', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('158216987.821', '158216987.82', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('-472984064.909', '-472984064.91', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('-5454.97', '-5454.97', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('-64508992.999', '-64508993', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('-248.648', '-248.65', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('700193039.566', '700193039.57', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('-74075662.353', '-74075662.35', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('5.213', '5.21', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('0.952', '0.95', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('4735241.735', '4735241.73', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('-851871.147', '-851871.15', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('-0.223', '-0.22', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('-5612285.04', '-5612285.04', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('-4019034.774', '-4019034.77', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('38185.173', '38185.17', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('0.315', '0.31', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('44382.182', '44382.18', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('78428677.934', '78428677.93', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('-448165.112', '-448165.11', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('2.844', '2.84', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('-172868.234', '-172868.23', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('-95.851', '-95.85', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('-3.106', '-3.11', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('542542.462', '542542.46', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('363845386.75', '363845386.75', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('670007327.685', '670007327.68', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('927675.685', '927675.68', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('8.28', '8.28', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('-7358.184', '-7358.18', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('-8.699', '-8.7', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('1.41', '1.41', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('-7529836.077', '-7529836.08', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('227799.38', '227799.38', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('938.975', '938.97', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('-733027.17', '-733027.17', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('-5875376.693', '-5875376.69', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('3190.03', '3190.03', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('5143769.146', '5143769.15', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('9610812.584', '9610812.58', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('-638.313', '-638.31', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('-91850.206', '-91850.21', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('8709.696', '8709.7', { maximumFractionDigits: 2, roundingMode: 'half down' })
t('24.192', '24.19', { maximumFractionDigits: 2, roundingMode: 'half down' })

t('-0.7263', '-0.7', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('-16.4421', '-16.4', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('-5.9834', '-6', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('41554.0075', '41554', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('7.1481', '7.1', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('-917.0291', '-917', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('809666.1078', '809666.1', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('54448.3298', '54448.3', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('-41940.3713', '-41940.4', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('530382.397', '530382.4', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('68064.4186', '68064.4', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('-3.3684', '-3.4', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('-899935.3127', '-899935.3', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('-107.1346', '-107.1', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('-35331727.3522', '-35331727.4', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('2730975.8237', '2730975.8', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('-8701063.5361', '-8701063.5', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('3653968.5717', '3653968.6', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('82842829.5687', '82842829.6', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('-6.3457', '-6.3', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('-84973715.3192', '-84973715.3', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('222586991.1624', '222586991.2', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('633093.5003', '633093.5', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('6398.6563', '6398.7', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('-471.4504', '-471.5', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('-6436.899', '-6436.9', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('-292.5841', '-292.6', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('1659.3929', '1659.4', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('864.4596', '864.5', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('-0.5846', '-0.6', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('-693.4667', '-693.5', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('514228123.9361', '514228123.9', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('-26569973.7307', '-26569973.7', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('41.609', '41.6', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('5747651.7733', '5747651.8', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('-124.7946', '-124.8', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('329825.8622', '329825.9', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('-9.6608', '-9.7', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('-0.127', '-0.1', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('-51.4038', '-51.4', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('0.0246', '0', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('-0.4103', '-0.4', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('1.5662', '1.6', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('-6.5628', '-6.6', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('-507352.6911', '-507352.7', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('-68288357.9286', '-68288357.9', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('77074.0115', '77074', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('51.4863', '51.5', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('979.4164', '979.4', { maximumFractionDigits: 1, roundingMode: 'half down' })
t('-857943930.5048', '-857943930.5', { maximumFractionDigits: 1, roundingMode: 'half down' })

t('871412.2', '871412', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-6.9', '-7', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('0.4', '0', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-7613.6', '-7614', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-21765216.3', '-21765216', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-17459144.8', '-17459145', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-676215.5', '-676215', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('3428454.2', '3428454', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('5960.9', '5961', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-5.5', '-5', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-2005', '-2005', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('0.9', '1', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('41037695.3', '41037695', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('79.5', '79', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('8.8', '9', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-875.2', '-875', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-11.8', '-12', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-290565117.1', '-290565117', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('0.2', '0', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-3767372.7', '-3767373', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-29.3', '-29', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-29215.4', '-29215', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('146836030.6', '146836031', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('823857.6', '823858', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('7699.5', '7699', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-307152075', '-307152075', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-25113735.2', '-25113735', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-0.3', '0', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-88.2', '-88', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('6484.7', '6485', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('5.4', '5', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('1', '1', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('188227.4', '188227', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('925.6', '926', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('606205252.1', '606205252', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('9999.6', '10000', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-5087.7', '-5088', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-12.3', '-12', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-9', '-9', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-923', '-923', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('0.6', '1', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-13.6', '-14', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('79738.9', '79739', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-36586.3', '-36586', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-737758502', '-737758502', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('188803.4', '188803', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('692274098.4', '692274098', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-716772294', '-716772294', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-13087.9', '-13088', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-4878.4', '-4878', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('5.5', '5', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('2.5', '2', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('1.6', '2', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('1.1', '1', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('1.0', '1', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-1.0', '-1', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-1.1', '-1', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-1.6', '-2', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-2.5', '-2', { maximumFractionDigits: 0, roundingMode: 'half down' })
t('-5.5', '-5', { maximumFractionDigits: 0, roundingMode: 'half down' })

t('-67989', '-67990', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('191763', '191760', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('315469', '315470', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('83275128', '83275130', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('-1', '0', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('7868674', '7868670', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('-454', '-450', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('9489', '9490', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('62', '60', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('8049582', '8049580', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('4126', '4130', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('-27966707', '-27966710', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('41993', '41990', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('95517303', '95517300', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('0', '0', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('-341', '-340', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('-27268', '-27270', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('67822', '67820', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('6968', '6970', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('-74', '-70', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('449', '450', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('-4309', '-4310', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('-749958035', '-749958030', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('81776', '81780', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('7', '10', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('-808378976', '-808378980', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('-88', '-90', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('5359', '5360', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('22782', '22780', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('33373841', '33373840', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('5847', '5850', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('59864', '59860', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('-413', '-410', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('-797428', '-797430', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('537435096', '537435100', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('7480', '7480', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('2361', '2360', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('-73490220', '-73490220', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('464719200', '464719200', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('7884', '7880', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('907', '910', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('-1', '0', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('7810963', '7810960', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('47', '50', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('-259476866', '-259476870', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('-3', '0', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('-96', '-100', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('5', '0', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('186', '190', { maximumFractionDigits: -1, roundingMode: 'half down' })
t('717670', '717670', { maximumFractionDigits: -1, roundingMode: 'half down' })
