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
test('"0.000" round half even "-1"', () => {
  let a = JSBD.BigDecimal('0.000')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: -1,
    }).toString()
  ).toBe('0')
})

// BigDecimal > 0 && maximumFractionDigits <= 0
test('"1155.4" round half even "-1"', () => {
  let a = JSBD.BigDecimal('1155.4')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: -1,
    }).toString()
  ).toBe('1160')
})

test('"114.67" round half even "0"', () => {
  let a = JSBD.BigDecimal('114.67')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: 0,
    }).toString()
  ).toBe('115')
})

test('"101" round half even "-3"', () => {
  let a = JSBD.BigDecimal('101')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: -3,
    }).toString()
  ).toBe('0')
})

// BigDecimal > 0 && maximumFractionDigits > 0

test('"101.6987" round half even "1"', () => {
  let a = JSBD.BigDecimal('101.6987')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: 1,
    }).toString()
  ).toBe('101.7')
})

test('"110.006" round half even "2"', () => {
  let a = JSBD.BigDecimal('110.006')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: 2,
    }).toString()
  ).toBe('110.01')
})

test('"101.005" round half even "2"', () => {
  let a = JSBD.BigDecimal('101.005')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: 2,
    }).toString()
  ).toBe('101')
})

test('"101.34" round half even "4"', () => {
  let a = JSBD.BigDecimal('101.34')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: 4,
    }).toString()
  ).toBe('101.34')
})

test('"1.5" round half even "0"', () => {
  let a = JSBD.BigDecimal('1.5')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: 0,
    }).toString()
  ).toBe('2')
})

test('"2.5" round half even "0"', () => {
  let a = JSBD.BigDecimal('2.5')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: 0,
    }).toString()
  ).toBe('2')
})

test('"3.5" round half even "0"', () => {
  let a = JSBD.BigDecimal('3.5')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: 0,
    }).toString()
  ).toBe('4')
})

// BigDecimal < 0 && maximumFractionDigits >= 0

test('"-101.6987" round half even "1"', () => {
  let a = JSBD.BigDecimal('-101.6987')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: 1,
    }).toString()
  ).toBe('-101.7')
})

test('"-1.5" round half even "0"', () => {
  let a = JSBD.BigDecimal('-1.5')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: 0,
    }).toString()
  ).toBe('-2')
})

test('"-2.5" round half even "0"', () => {
  let a = JSBD.BigDecimal('-2.5')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: 0,
    }).toString()
  ).toBe('-2')
})

test('"-3.5" round half even "0"', () => {
  let a = JSBD.BigDecimal('-3.5')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: 0,
    }).toString()
  ).toBe('-4')
})

test('"-110.05" round half even "1"', () => {
  let a = JSBD.BigDecimal('-110.05')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: 1,
    }).toString()
  ).toBe('-110')
})

test('"-101.55" round half even "1"', () => {
  let a = JSBD.BigDecimal('-101.55')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: 1,
    }).toString()
  ).toBe('-101.6')
})

test('"-101.34" round half even "4"', () => {
  let a = JSBD.BigDecimal('-101.34')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: 4,
    }).toString()
  ).toBe('-101.34')
})

// BigDecimal < 0 && maximumFractionDigits < 0

test('"-115.6987" round half even "-1"', () => {
  let a = JSBD.BigDecimal('-115.6987')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: -1,
    }).toString()
  ).toBe('-120')
})

test('"-105.001" round half even "-1"', () => {
  let a = JSBD.BigDecimal('-105.001')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: -1,
    }).toString()
  ).toBe('-110')
})

test('"-101.005" round half even "-3"', () => {
  let a = JSBD.BigDecimal('-101.005')
  expect(
    JSBD.round(a, {
      roundingMode: 'half even',
      maximumFractionDigits: -3,
    }).toString()
  ).toBe('0')
})

t('-6832223', '-6832220', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('84294457', '84294460', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('-4356', '-4360', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('8', '10', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('-19094009', '-19094010', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('51014', '51010', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('515', '520', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('7', '10', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('6438', '6440', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('-55', '-60', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('814', '810', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('618999', '619000', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('8937', '8940', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('-4687488', '-4687490', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('624', '620', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('-7', '-10', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('-961', '-960', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('5', '0', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('7258', '7260', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('1', '0', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('959', '960', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('152', '150', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('61872677', '61872680', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('0', '0', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('99364', '99360', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('87655338', '87655340', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('527', '530', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('-312022', '-312020', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('492968949', '492968950', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('8', '10', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('-3', '0', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('1', '0', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('-4984213', '-4984210', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('58254', '58250', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('1282', '1280', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('18924', '18920', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('-667187', '-667190', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('57', '60', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('-1', '0', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('86853141', '86853140', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('136', '140', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('774648990', '774648990', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('5', '0', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('512558', '512560', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('-8051', '-8050', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('-745509863', '-745509860', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('615191917', '615191920', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('2114', '2110', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('504936008', '504936010', { maximumFractionDigits: -1, roundingMode: 'half even' })
t('-693', '-690', { maximumFractionDigits: -1, roundingMode: 'half even' })

t('565630692.08', '565630692.1', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('146.24', '146.2', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('-53.28', '-53.3', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('57.13', '57.1', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('508.04', '508', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('-3.99', '-4', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('-932965560.32', '-932965560.3', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('-0.24', '-0.2', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('484319369.36', '484319369.4', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('1602582.7', '1602582.7', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('-2785506.65', '-2785506.6', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('-32.06', '-32.1', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('0.98', '1', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('-9.37', '-9.4', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('255.45', '255.4', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('-619209440.45', '-619209440.4', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('185944549.11', '185944549.1', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('-38552912.02', '-38552912', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('-0.78', '-0.8', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('97.07', '97.1', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('9110.17', '9110.2', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('740.28', '740.3', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('9922.71', '9922.7', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('62.12', '62.1', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('24.56', '24.6', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('95332.16', '95332.2', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('-542315.81', '-542315.8', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('-1762888.04', '-1762888', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('91.42', '91.4', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('3425207.64', '3425207.6', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('-30242.22', '-30242.2', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('-8303.31', '-8303.3', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('3699.52', '3699.5', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('458866533.36', '458866533.4', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('-18170193.66', '-18170193.7', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('80759.42', '80759.4', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('0.22', '0.2', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('656901287.34', '656901287.3', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('-0.36', '-0.4', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('5093.99', '5094', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('80.39', '80.4', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('460281.58', '460281.6', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('-233633.22', '-233633.2', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('76.85', '76.8', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('-13.81', '-13.8', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('-26898114.34', '-26898114.3', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('-17560449.56', '-17560449.6', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('-8.63', '-8.6', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('87.43', '87.4', { maximumFractionDigits: 1, roundingMode: 'half even' })
t('-252461.72', '-252461.7', { maximumFractionDigits: 1, roundingMode: 'half even' })

t('242866919.4', '242866919', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('966540938.3', '966540938', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('-131.1', '-131', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('26761.3', '26761', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('-11.4', '-11', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('-8.1', '-8', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('88656435.4', '88656435', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('-70491480.4', '-70491480', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('-95.7', '-96', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('2.4', '2', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('7657.1', '7657', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('268965.6', '268966', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('0.5', '0', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('-40', '-40', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('581070.4', '581070', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('5524356.6', '5524357', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('-75683913.2', '-75683913', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('58', '58', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('-0.9', '-1', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('78.4', '78', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('250126.7', '250127', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('71.9', '72', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('-22388307.9', '-22388308', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('762.1', '762', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('-0.7', '-1', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('-726.9', '-727', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('-49810803.6', '-49810804', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('99268034.8', '99268035', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('-35100.4', '-35100', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('-7993.8', '-7994', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('63.3', '63', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('2608055.1', '2608055', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('-16053960.1', '-16053960', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('-104.9', '-105', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('796367.4', '796367', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('-0.1', '0', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('-684.3', '-684', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('-429.5', '-430', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('-0.1', '0', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('-39.3', '-39', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('-84.5', '-84', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('37.9', '38', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('-3324.8', '-3325', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('-85455865.4', '-85455865', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('730118152.7', '730118153', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('-598.3', '-598', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('-969733.5', '-969734', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('-4.4', '-4', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('-681.7', '-682', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('-17178.9', '-17179', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('5.5', '6', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('2.5', '2', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('1.6', '2', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('1.1', '1', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('1.0', '1', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('-1.0', '-1', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('-1.1', '-1', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('-1.6', '-2', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('-2.5', '-2', { maximumFractionDigits: 0, roundingMode: 'half even' })
t('-5.5', '-6', { maximumFractionDigits: 0, roundingMode: 'half even' })

t('-4044.614', '-4044.61', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('42.766', '42.77', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('6.878', '6.88', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('51853496.101', '51853496.1', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-272519.172', '-272519.17', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-0.144', '-0.14', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-5195733.223', '-5195733.22', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('57133.879', '57133.88', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('541.489', '541.49', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-967319.47', '-967319.47', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-74.832', '-74.83', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('578874586.818', '578874586.82', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('4874.774', '4874.77', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('6.845', '6.84', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-0.212', '-0.21', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('6251.989', '6251.99', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-95.386', '-95.39', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('224418.237', '224418.24', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('2741.259', '2741.26', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('0.554', '0.55', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('0.67', '0.67', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-0.269', '-0.27', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-0.18', '-0.18', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('294.943', '294.94', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('938758116.963', '938758116.96', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-750872.942', '-750872.94', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('719298154.531', '719298154.53', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('6510514.741', '6510514.74', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('194.329', '194.33', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-7383.988', '-7383.99', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-540175254.62', '-540175254.62', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('49300.227', '49300.23', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-93983.673', '-93983.67', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('6603629.483', '6603629.48', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('64415.073', '64415.07', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-0.173', '-0.17', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('9.664', '9.66', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('3.97', '3.97', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-832.106', '-832.11', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-14478876.937', '-14478876.94', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('6.308', '6.31', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('2824505.199', '2824505.2', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('236338701.802', '236338701.8', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-3.057', '-3.06', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('862460.269', '862460.27', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('31085064.599', '31085064.6', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-5142.964', '-5142.96', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-47367.55', '-47367.55', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('6.552', '6.55', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('6775162.505', '6775162.5', { maximumFractionDigits: 2, roundingMode: 'half even' })

t('-7102.07976', '-7102.08', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-240310039.84007', '-240310039.84', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-0.77403', '-0.77', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('343144501.21126', '343144501.21', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-386.42413', '-386.42', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-8.40883', '-8.41', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('92.62215', '92.62', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('18691.93483', '18691.93', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('93298436.01761', '93298436.02', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('0.75072', '0.75', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('74686.34336', '74686.34', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-77958211.43603', '-77958211.44', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('6402562.55161', '6402562.55', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('70825329.02277', '70825329.02', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-3243.19485', '-3243.19', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-224894.68825', '-224894.69', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-396103.86633', '-396103.87', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-324.66785', '-324.67', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('4877333.10965', '4877333.11', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('714890.84185', '714890.84', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-22.5231', '-22.52', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-818450.93785', '-818450.94', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-862989.31062', '-862989.31', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-49231.70857', '-49231.71', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('427397.22719', '427397.23', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('67.00441', '67', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-4630230.8613', '-4630230.86', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-850481.40562', '-850481.41', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('70.19512', '70.2', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('26078.82146', '26078.82', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-62.07967', '-62.08', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('61347.23325', '61347.23', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-7476609.30985', '-7476609.31', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('319.55889', '319.56', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-3986490.9626', '-3986490.96', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('400063.10729', '400063.11', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('0.15214', '0.15', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-914484.33221', '-914484.33', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('49728266.47732', '49728266.48', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('67871591.65294', '67871591.65', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('45646929.38389', '45646929.38', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-2281194.42446', '-2281194.42', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('612198767.75867', '612198767.76', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-1.68954', '-1.69', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-445614.30062', '-445614.3', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('19917.50362', '19917.5', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-593387826.15363', '-593387826.15', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('53597218.18527', '53597218.19', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('974102438.72572', '974102438.73', { maximumFractionDigits: 2, roundingMode: 'half even' })
t('-302378.17319', '-302378.17', { maximumFractionDigits: 2, roundingMode: 'half even' })

t('5400', '5400', { maximumFractionDigits: -2, roundingMode: 'up' })
t('-2650', '-2700', { maximumFractionDigits: -2, roundingMode: 'up' })
t('0', '0', { maximumFractionDigits: -2, roundingMode: 'up' })
t('7320', '7400', { maximumFractionDigits: -2, roundingMode: 'up' })
t('0', '0', { maximumFractionDigits: -2, roundingMode: 'up' })
t('0', '0', { maximumFractionDigits: -2, roundingMode: 'up' })
t('10', '100', { maximumFractionDigits: -2, roundingMode: 'up' })
t('-720', '-800', { maximumFractionDigits: -2, roundingMode: 'up' })
t('7390', '7400', { maximumFractionDigits: -2, roundingMode: 'up' })
t('100', '100', { maximumFractionDigits: -2, roundingMode: 'up' })
t('6612070', '6612100', { maximumFractionDigits: -2, roundingMode: 'up' })
t('-10', '-100', { maximumFractionDigits: -2, roundingMode: 'up' })
t('-10', '-100', { maximumFractionDigits: -2, roundingMode: 'up' })
t('-146046980', '-146047000', { maximumFractionDigits: -2, roundingMode: 'up' })
t('-60', '-100', { maximumFractionDigits: -2, roundingMode: 'up' })
t('-94270', '-94300', { maximumFractionDigits: -2, roundingMode: 'up' })
t('225674250', '225674300', { maximumFractionDigits: -2, roundingMode: 'up' })
t('-95156920', '-95157000', { maximumFractionDigits: -2, roundingMode: 'up' })
t('0', '0', { maximumFractionDigits: -2, roundingMode: 'up' })
t('-47720', '-47800', { maximumFractionDigits: -2, roundingMode: 'up' })
t('20', '100', { maximumFractionDigits: -2, roundingMode: 'up' })
t('0', '0', { maximumFractionDigits: -2, roundingMode: 'up' })
t('38010160', '38010200', { maximumFractionDigits: -2, roundingMode: 'up' })
t('-53554700', '-53554700', { maximumFractionDigits: -2, roundingMode: 'up' })
t('-9170', '-9200', { maximumFractionDigits: -2, roundingMode: 'up' })
t('-413853890', '-413853900', { maximumFractionDigits: -2, roundingMode: 'up' })
t('8880', '8900', { maximumFractionDigits: -2, roundingMode: 'up' })
t('-1813450', '-1813500', { maximumFractionDigits: -2, roundingMode: 'up' })
t('292993960', '292994000', { maximumFractionDigits: -2, roundingMode: 'up' })
t('-10', '-100', { maximumFractionDigits: -2, roundingMode: 'up' })
t('-10', '-100', { maximumFractionDigits: -2, roundingMode: 'up' })
t('-23307300', '-23307300', { maximumFractionDigits: -2, roundingMode: 'up' })
t('0', '0', { maximumFractionDigits: -2, roundingMode: 'up' })
t('-50', '-100', { maximumFractionDigits: -2, roundingMode: 'up' })
t('-660', '-700', { maximumFractionDigits: -2, roundingMode: 'up' })
t('7119840', '7119900', { maximumFractionDigits: -2, roundingMode: 'up' })
t('-4950', '-5000', { maximumFractionDigits: -2, roundingMode: 'up' })
t('5222870', '5222900', { maximumFractionDigits: -2, roundingMode: 'up' })
t('-7160', '-7200', { maximumFractionDigits: -2, roundingMode: 'up' })
t('10', '100', { maximumFractionDigits: -2, roundingMode: 'up' })
t('0', '0', { maximumFractionDigits: -2, roundingMode: 'up' })
t('0', '0', { maximumFractionDigits: -2, roundingMode: 'up' })
t('-370552110', '-370552200', { maximumFractionDigits: -2, roundingMode: 'up' })
t('661270', '661300', { maximumFractionDigits: -2, roundingMode: 'up' })
t('-610', '-700', { maximumFractionDigits: -2, roundingMode: 'up' })
t('0', '0', { maximumFractionDigits: -2, roundingMode: 'up' })
t('-650', '-700', { maximumFractionDigits: -2, roundingMode: 'up' })
t('-80', '-100', { maximumFractionDigits: -2, roundingMode: 'up' })
t('-380', '-400', { maximumFractionDigits: -2, roundingMode: 'up' })
t('175280', '175300', { maximumFractionDigits: -2, roundingMode: 'up' })
