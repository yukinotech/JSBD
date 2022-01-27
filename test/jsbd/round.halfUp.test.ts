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
test('"0.000" round half up "-1"', () => {
  let a = JSBD.BigDecimal('0.000')
  expect(
    JSBD.round(a, {
      roundingMode: 'half up',
      maximumFractionDigits: -1,
    }).toString()
  ).toBe('0')
})

// BigDecimal > 0 && maximumFractionDigits < 0
test('"111" round half up "-1"', () => {
  let a = JSBD.BigDecimal('111')
  expect(
    JSBD.round(a, {
      roundingMode: 'half up',
      maximumFractionDigits: -1,
    }).toString()
  ).toBe('110')
})

test('"111" round half up "-2"', () => {
  let a = JSBD.BigDecimal('111')
  expect(
    JSBD.round(a, {
      roundingMode: 'half up',
      maximumFractionDigits: -2,
    }).toString()
  ).toBe('100')
})

test('"101" round half up "-3"', () => {
  let a = JSBD.BigDecimal('101')
  expect(
    JSBD.round(a, {
      roundingMode: 'half up',
      maximumFractionDigits: -3,
    }).toString()
  ).toBe('0')
})

// BigDecimal > 0 && maximumFractionDigits >= 0

test('"101.6987" round half up "1"', () => {
  let a = JSBD.BigDecimal('101.6987')
  expect(
    JSBD.round(a, {
      roundingMode: 'half up',
      maximumFractionDigits: 1,
    }).toString()
  ).toBe('101.7')
})

test('"110.001" round half up "2"', () => {
  let a = JSBD.BigDecimal('110.001')
  expect(
    JSBD.round(a, {
      roundingMode: 'half up',
      maximumFractionDigits: 2,
    }).toString()
  ).toBe('110')
})

test('"101.005" round half up "2"', () => {
  let a = JSBD.BigDecimal('101.005')
  expect(
    JSBD.round(a, {
      roundingMode: 'half up',
      maximumFractionDigits: 2,
    }).toString()
  ).toBe('101.01')
})

test('"101.34" round half up "4"', () => {
  let a = JSBD.BigDecimal('101.34')
  expect(
    JSBD.round(a, {
      roundingMode: 'half up',
      maximumFractionDigits: 4,
    }).toString()
  ).toBe('101.34')
})

// BigDecimal < 0 && maximumFractionDigits >= 0

test('"-101.6987" round half up "1"', () => {
  let a = JSBD.BigDecimal('-101.6987')
  expect(
    JSBD.round(a, {
      roundingMode: 'half up',
      maximumFractionDigits: 1,
    }).toString()
  ).toBe('-101.7')
})

test('"-110.05" round half up "1"', () => {
  let a = JSBD.BigDecimal('-110.05')
  expect(
    JSBD.round(a, {
      roundingMode: 'half up',
      maximumFractionDigits: 1,
    }).toString()
  ).toBe('-110.1')
})

test('"-101.55" round half up "1"', () => {
  let a = JSBD.BigDecimal('-101.55')
  expect(
    JSBD.round(a, {
      roundingMode: 'half up',
      maximumFractionDigits: 1,
    }).toString()
  ).toBe('-101.6')
})

test('"-101.34" round half up "4"', () => {
  let a = JSBD.BigDecimal('-101.34')
  expect(
    JSBD.round(a, {
      roundingMode: 'half up',
      maximumFractionDigits: 4,
    }).toString()
  ).toBe('-101.34')
})

// BigDecimal < 0 && maximumFractionDigits < 0

test('"-101.6987" round half up "-1"', () => {
  let a = JSBD.BigDecimal('-101.6987')
  expect(
    JSBD.round(a, {
      roundingMode: 'half up',
      maximumFractionDigits: -1,
    }).toString()
  ).toBe('-100')
})

test('"-105.001" round half up "-1"', () => {
  let a = JSBD.BigDecimal('-110.001')
  expect(
    JSBD.round(a, {
      roundingMode: 'half up',
      maximumFractionDigits: -1,
    }).toString()
  ).toBe('-110')
})

test('"-101.005" round half up "-3"', () => {
  let a = JSBD.BigDecimal('-101.005')
  expect(
    JSBD.round(a, {
      roundingMode: 'half up',
      maximumFractionDigits: -3,
    }).toString()
  ).toBe('0')
})

test('"-901.34" round half up "-4"', () => {
  let a = JSBD.BigDecimal('-901.34')
  expect(
    JSBD.round(a, {
      roundingMode: 'half up',
      maximumFractionDigits: -4,
    }).toString()
  ).toBe('0')
})

// without maximumFractionDigits or without option
test('"-901.34" round half up with no option', () => {
  let a = JSBD.BigDecimal('-901.34')
  expect(JSBD.round(a).toString()).toBe('-901.34')
})

test('"1.34" round half up with no option', () => {
  let a = JSBD.BigDecimal('1.34')
  expect(
    JSBD.round(a, {
      roundingMode: 'half up',
    }).toString()
  ).toBe('1.34')
})

// with wrong params
// test('"-901.34" round half up with no option', () => {
//   let a = JSBD.BigDecimal('-901.34')
//   expect(JSBD.round(a, {}).toString()).toBe('-901.34')
// })

// test('"1.34" round half up with no option', () => {
//   let a = JSBD.BigDecimal('1.34')
//   expect(
//     JSBD.round(a, {
//       roundingMode: 'half up',
//     }).toString()
//   ).toBe('1.34')
// })

t('47585.4033', '47585.4', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('-574974142.3733', '-574974142.37', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('4908.4484', '4908.45', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('8431.7511', '8431.75', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('693113135.9311', '693113135.93', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('-62275220.1247', '-62275220.12', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('18339.1405', '18339.14', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('-9866.7308', '-9866.73', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('-37.5867', '-37.59', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('-555999.06', '-555999.06', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('9.666', '9.67', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('251672.842', '251672.84', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('-37.016', '-37.02', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('-82819.558', '-82819.56', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('-0.024', '-0.02', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('-85025.276', '-85025.28', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('2375.333', '2375.33', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('48.027', '48.03', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('-4446459.385', '-4446459.39', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('-622865.465', '-622865.47', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('83.661', '83.66', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('723069.686', '723069.69', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('24197611.275', '24197611.28', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('-4852.887', '-4852.89', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('-35063636.174', '-35063636.17', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('-30117730.78', '-30117730.78', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('-4296362.766', '-4296362.77', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('-0.798', '-0.8', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('7.425', '7.43', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('30422.791', '30422.79', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('0.64', '0.64', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('-368030862.471', '-368030862.47', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('42018929.353', '42018929.35', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('7.908', '7.91', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('21541162.441', '21541162.44', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('94.25', '94.25', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('-860.246', '-860.25', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('8203.276', '8203.28', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('-539.273', '-539.27', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('2.365', '2.37', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('-584303168.732', '-584303168.73', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('386.47', '386.47', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('174706.405', '174706.41', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('59008758.439', '59008758.44', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('4656.002', '4656', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('-24.129', '-24.13', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('-537606471.315', '-537606471.32', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('-5293.922', '-5293.92', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('16489233.246', '16489233.25', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('-0.683', '-0.68', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('2627.907', '2627.91', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('7583.462', '7583.46', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('-0.436', '-0.44', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('-6413.605', '-6413.61', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('747844.071', '747844.07', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('4617394.787', '4617394.79', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('572.989', '572.99', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('-475906.303', '-475906.3', { maximumFractionDigits: 2, roundingMode: 'half up' })
t('878913.696', '878913.7', { maximumFractionDigits: 2, roundingMode: 'half up' })

t('1.3549', '1.355', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('-205277.8726', '-205277.873', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('41.5419', '41.542', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('39408.7684', '39408.768', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('762610690.4357', '762610690.436', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('7.0798', '7.08', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('-4.8407', '-4.841', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('-0.2926', '-0.293', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('483319103.3361', '483319103.336', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('-68386330.1538', '-68386330.154', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('21.1849', '21.185', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('420197.8253', '420197.825', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('11664.7213', '11664.721', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('3333598.5946', '3333598.595', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('-8.3593', '-8.359', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('1515.6328', '1515.633', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('-927.4751', '-927.475', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('423439.3365', '423439.337', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('-56.9743', '-56.974', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('15.7145', '15.715', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('-14.4309', '-14.431', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('14.3524', '14.352', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('623515.8427', '623515.843', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('549.2008', '549.201', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('28291.1376', '28291.138', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('-799.0105', '-799.011', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('-12225.1325', '-12225.133', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('0.9636', '0.964', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('-787831.5628', '-787831.563', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('19548433.368', '19548433.368', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('-116505266.0022', '-116505266.002', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('-255365803.5718', '-255365803.572', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('184560.357', '184560.357', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('8.021', '8.021', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('-3.1479', '-3.148', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('0.018', '0.018', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('-0.2094', '-0.209', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('8.6172', '8.617', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('-45115183.7572', '-45115183.757', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('-124876.0118', '-124876.012', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('2.526', '2.526', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('-5.3817', '-5.382', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('0.4434', '0.443', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('-81.218', '-81.218', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('91122178.1927', '91122178.193', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('-95773684.6394', '-95773684.639', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('-96977.7604', '-96977.76', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('-532.0194', '-532.019', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('-0.5058', '-0.506', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('612219.5604', '612219.56', { maximumFractionDigits: 3, roundingMode: 'half up' })
t('44.5555000001', '44.556', { maximumFractionDigits: 3, roundingMode: 'half up' })

t('4484.9652', '4480', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-523015385.9632', '-523015390', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('85840621.7486', '85840620', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-0.4481', '0', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-3.896', '0', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('0.9142', '0', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('197874.0528', '197870', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('264505264.7917', '264505260', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-5.0566', '-10', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('413624530.1072', '413624530', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-382293235.5743', '-382293240', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('34425096.38', '34425100', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('75317.3751', '75320', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('33.2951', '30', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('1713.1877', '1710', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-4.1491', '0', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('7111.8125', '7110', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('38955.8488', '38960', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('411.3798', '410', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('8849.0102', '8850', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-4831.9951', '-4830', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-78871465.1058', '-78871470', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('124.2886', '120', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('4.1131', '0', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('90436.4519', '90440', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('10798.2694', '10800', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-8706.2326', '-8710', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('833287.5717', '833290', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-54869.3321', '-54870', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('138921485.0515', '138921490', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-2.8278', '0', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-7088.7346', '-7090', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-875.5963', '-880', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-295.0337', '-300', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('0.4008', '0', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('21385.1855', '21390', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('0.4486', '0', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('492790494.1085', '492790490', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('62576.3949', '62580', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('66859.5362', '66860', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('99.611', '100', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-5541642.3211', '-5541640', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-4.8028', '0', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-167266393.3077', '-167266390', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('0.5149', '0', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-1.6445', '0', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('5.0801', '10', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-430.9971', '-430', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-6408.0009', '-6410', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('24.8279', '20', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-11492', '-11490', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('13168476', '13168480', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('1', '0', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('740', '740', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('1494', '1490', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-258838758', '-258838760', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('0', '0', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-3918', '-3920', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('6214', '6210', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('13874', '13870', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('95549968', '95549970', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-6', '-10', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-644978', '-644980', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('231039', '231040', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-1', '0', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('0', '0', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-65801074', '-65801070', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('353776', '353780', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('942', '940', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-978743276', '-978743280', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('2', '0', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-3329', '-3330', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-7', '-10', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('7', '10', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('10', '10', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('0', '0', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-17924', '-17920', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-42', '-40', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-5', '-10', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-160118803', '-160118800', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-1', '0', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-75262', '-75260', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-1', '0', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-1', '0', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('8384', '8380', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('953', '950', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('15715', '15720', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('4', '0', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('99486', '99490', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('93870927', '93870930', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-5754194', '-5754190', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('0', '0', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('1', '0', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-7', '-10', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-945685', '-945690', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('25847', '25850', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('729', '730', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('37', '40', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-308', '-310', { maximumFractionDigits: -1, roundingMode: 'half up' })
t('-759530', '-759530', { maximumFractionDigits: -1, roundingMode: 'half up' })

t('52440.5', '52441', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('0.2', '0', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('73121090.9', '73121091', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('-549046.4', '-549046', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('-0.2', '0', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('243.4', '243', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('-15106.4', '-15106', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('-79258208.6', '-79258209', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('-0.2', '0', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('314722507.2', '314722507', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('-0.3', '0', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('74.1', '74', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('-60.9', '-61', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('3823.4', '3823', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('863796.5', '863797', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('1759145.8', '1759146', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('-84407', '-84407', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('-5.6', '-6', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('-49525985.3', '-49525985', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('-14.9', '-15', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('0.7', '1', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('9375.4', '9375', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('-547388.6', '-547389', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('-80101734.1', '-80101734', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('392.7', '393', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('-950793784.3', '-950793784', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('0', '0', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('8.6', '9', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('-114446.2', '-114446', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('6.8', '7', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('-828.5', '-829', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('2683.7', '2684', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('-964.5', '-965', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('2801.9', '2802', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('-545.9', '-546', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('-8.8', '-9', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('-77121.8', '-77122', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('605733.7', '605734', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('917457', '917457', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('-7423138.9', '-7423139', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('347.1', '347', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('-424.2', '-424', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('-18577861.8', '-18577862', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('-830203.3', '-830203', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('86153.5', '86154', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('-3129024.9', '-3129025', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('-0.7', '-1', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('98.6', '99', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('-0.7', '-1', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('2858094.5', '2858095', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('5.5', '6', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('2.5', '3', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('1.6', '2', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('1.1', '1', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('1.0', '1', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('-1.0', '-1', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('-1.1', '-1', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('-1.6', '-2', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('-2.5', '-3', { maximumFractionDigits: 0, roundingMode: 'half up' })
t('-5.5', '-6', { maximumFractionDigits: 0, roundingMode: 'half up' })
