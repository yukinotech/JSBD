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
test('"0.000" round up "-1"', () => {
  let a = JSBD.BigDecimal('0.000')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
      maximumFractionDigits: -1,
    }).toString()
  ).toBe('0')
})

// BigDecimal > 0 && maximumFractionDigits < 0
test('"101" round up "-1"', () => {
  let a = JSBD.BigDecimal('101')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
      maximumFractionDigits: -1,
    }).toString()
  ).toBe('110')
})

test('"110" round up "-2"', () => {
  let a = JSBD.BigDecimal('101')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
      maximumFractionDigits: -2,
    }).toString()
  ).toBe('200')
})

test('"101" round up "-3"', () => {
  let a = JSBD.BigDecimal('101')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
      maximumFractionDigits: -3,
    }).toString()
  ).toBe('1000')
})

test('"101" round up "-4"', () => {
  let a = JSBD.BigDecimal('101')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
      maximumFractionDigits: -4,
    }).toString()
  ).toBe('10000')
})

test('"12000e-2" round up "-1"', () => {
  let a = JSBD.BigDecimal('12000e-2')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
      maximumFractionDigits: -1,
    }).toString()
  ).toBe('120')
})

// BigDecimal > 0 && maximumFractionDigits >= 0

test('"101.6987" round up "1"', () => {
  let a = JSBD.BigDecimal('101.6987')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
      maximumFractionDigits: 1,
    }).toString()
  ).toBe('101.7')
})

test('"110.001" round up "2"', () => {
  let a = JSBD.BigDecimal('110.001')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
      maximumFractionDigits: 2,
    }).toString()
  ).toBe('110.01')
})

test('"101.005" round up "0"', () => {
  let a = JSBD.BigDecimal('101.005')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
      maximumFractionDigits: 0,
    }).toString()
  ).toBe('102')
})

test('"101.34" round up "4"', () => {
  let a = JSBD.BigDecimal('101.34')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
      maximumFractionDigits: 4,
    }).toString()
  ).toBe('101.34')
})

// BigDecimal < 0 && maximumFractionDigits >= 0

test('"-101.6987" round up "1"', () => {
  let a = JSBD.BigDecimal('-101.6987')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
      maximumFractionDigits: 1,
    }).toString()
  ).toBe('-101.7')
})

test('"-110.001" round up "2"', () => {
  let a = JSBD.BigDecimal('-110.001')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
      maximumFractionDigits: 2,
    }).toString()
  ).toBe('-110.01')
})

test('"-101.005" round up "0"', () => {
  let a = JSBD.BigDecimal('-101.005')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
      maximumFractionDigits: 0,
    }).toString()
  ).toBe('-102')
})

test('"-101.34" round up "4"', () => {
  let a = JSBD.BigDecimal('-101.34')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
      maximumFractionDigits: 4,
    }).toString()
  ).toBe('-101.34')
})

// BigDecimal < 0 && maximumFractionDigits < 0

test('"-101.6987" round up "-1"', () => {
  let a = JSBD.BigDecimal('-101.6987')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
      maximumFractionDigits: -1,
    }).toString()
  ).toBe('-110')
})

test('"-110.001" round up "-2"', () => {
  let a = JSBD.BigDecimal('-110.001')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
      maximumFractionDigits: -2,
    }).toString()
  ).toBe('-200')
})

test('"-101.005" round up "-3"', () => {
  let a = JSBD.BigDecimal('-101.005')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
      maximumFractionDigits: -3,
    }).toString()
  ).toBe('-1000')
})

test('"-901.34" round up "-4"', () => {
  let a = JSBD.BigDecimal('-901.34')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
      maximumFractionDigits: -4,
    }).toString()
  ).toBe('-10000')
})

// without maximumFractionDigits or without option
test('"-901.34" round up with no option', () => {
  let a = JSBD.BigDecimal('-901.34')
  expect(JSBD.round(a).toString()).toBe('-901.34')
})

test('"1.34" round up with roundingMode', () => {
  let a = JSBD.BigDecimal('1.34')
  expect(
    JSBD.round(a, {
      roundingMode: 'up',
    }).toString()
  ).toBe('1.34')
})

test('"1.34" round up with maximumFractionDigits', () => {
  let a = JSBD.BigDecimal('1.34')
  expect(
    JSBD.round(a, {
      maximumFractionDigits: 2,
    }).toString()
  ).toBe('1.34')
})

test('"1.34" round up with wrong param', () => {
  let a = JSBD.BigDecimal('1.34')
  expect(() => {
    JSBD.round(a, {
      // @ts-ignore
      roundingMode: '4355',
    }).toString()
  }).toThrow()
})

test('"1.34" round up with wrong param', () => {
  let a = JSBD.BigDecimal('1.34')
  expect(() => {
    JSBD.round(a, {
      // @ts-ignore
      maximumFractionDigits: '4355',
    }).toString()
  }).toThrow()
})

t('-18004.893', '-18004.9', { maximumFractionDigits: 2, roundingMode: 'up' })
t('3.971', '3.98', { maximumFractionDigits: 2, roundingMode: 'up' })
t('710607.247', '710607.25', { maximumFractionDigits: 2, roundingMode: 'up' })
t('1751.637', '1751.64', { maximumFractionDigits: 2, roundingMode: 'up' })
t('-23523.764', '-23523.77', { maximumFractionDigits: 2, roundingMode: 'up' })
t('615710335.031', '615710335.04', { maximumFractionDigits: 2, roundingMode: 'up' })
t('-0.983', '-0.99', { maximumFractionDigits: 2, roundingMode: 'up' })
t('893655.785', '893655.79', { maximumFractionDigits: 2, roundingMode: 'up' })
t('4366510.443', '4366510.45', { maximumFractionDigits: 2, roundingMode: 'up' })
t('55950.041', '55950.05', { maximumFractionDigits: 2, roundingMode: 'up' })
t('-615924039.627', '-615924039.63', { maximumFractionDigits: 2, roundingMode: 'up' })
t('-93.538', '-93.54', { maximumFractionDigits: 2, roundingMode: 'up' })
t('3.787', '3.79', { maximumFractionDigits: 2, roundingMode: 'up' })
t('-987574.446', '-987574.45', { maximumFractionDigits: 2, roundingMode: 'up' })
t('-7135047.519', '-7135047.52', { maximumFractionDigits: 2, roundingMode: 'up' })
t('-0.379', '-0.38', { maximumFractionDigits: 2, roundingMode: 'up' })
t('-529845446.047', '-529845446.05', { maximumFractionDigits: 2, roundingMode: 'up' })
t('45708311.886', '45708311.89', { maximumFractionDigits: 2, roundingMode: 'up' })
t('48420711.545', '48420711.55', { maximumFractionDigits: 2, roundingMode: 'up' })
t('-273.777', '-273.78', { maximumFractionDigits: 2, roundingMode: 'up' })
t('8.258', '8.26', { maximumFractionDigits: 2, roundingMode: 'up' })
t('-597.665', '-597.67', { maximumFractionDigits: 2, roundingMode: 'up' })
t('1392948.993', '1392949', { maximumFractionDigits: 2, roundingMode: 'up' })
t('7.395', '7.4', { maximumFractionDigits: 2, roundingMode: 'up' })
t('-118688327.508', '-118688327.51', { maximumFractionDigits: 2, roundingMode: 'up' })
t('-669867.677', '-669867.68', { maximumFractionDigits: 2, roundingMode: 'up' })
t('-73.526', '-73.53', { maximumFractionDigits: 2, roundingMode: 'up' })
t('-43223477.728', '-43223477.73', { maximumFractionDigits: 2, roundingMode: 'up' })
t('-8.259', '-8.26', { maximumFractionDigits: 2, roundingMode: 'up' })
t('-6624928.516', '-6624928.52', { maximumFractionDigits: 2, roundingMode: 'up' })
t('1.13', '1.13', { maximumFractionDigits: 2, roundingMode: 'up' })
t('877.875', '877.88', { maximumFractionDigits: 2, roundingMode: 'up' })
t('-0.887', '-0.89', { maximumFractionDigits: 2, roundingMode: 'up' })
t('-8723.034', '-8723.04', { maximumFractionDigits: 2, roundingMode: 'up' })
t('-266985.43', '-266985.43', { maximumFractionDigits: 2, roundingMode: 'up' })
t('89679171.49', '89679171.49', { maximumFractionDigits: 2, roundingMode: 'up' })
t('-846.337', '-846.34', { maximumFractionDigits: 2, roundingMode: 'up' })
t('-941782.948', '-941782.95', { maximumFractionDigits: 2, roundingMode: 'up' })
t('-252.317', '-252.32', { maximumFractionDigits: 2, roundingMode: 'up' })
t('430589.33', '430589.33', { maximumFractionDigits: 2, roundingMode: 'up' })
t('-0.207', '-0.21', { maximumFractionDigits: 2, roundingMode: 'up' })
t('-7065.942', '-7065.95', { maximumFractionDigits: 2, roundingMode: 'up' })
t('105.471', '105.48', { maximumFractionDigits: 2, roundingMode: 'up' })
t('-501.016', '-501.02', { maximumFractionDigits: 2, roundingMode: 'up' })
t('-26922755.099', '-26922755.1', { maximumFractionDigits: 2, roundingMode: 'up' })
t('-0.924', '-0.93', { maximumFractionDigits: 2, roundingMode: 'up' })
t('0.217', '0.22', { maximumFractionDigits: 2, roundingMode: 'up' })
t('67394.05', '67394.05', { maximumFractionDigits: 2, roundingMode: 'up' })
t('76.182', '76.19', { maximumFractionDigits: 2, roundingMode: 'up' })
t('-1793.86', '-1793.86', { maximumFractionDigits: 2, roundingMode: 'up' })

t('-30023.45', '-30023.5', { maximumFractionDigits: 1, roundingMode: 'up' })
t('-38033365.92', '-38033366', { maximumFractionDigits: 1, roundingMode: 'up' })
t('-42.07', '-42.1', { maximumFractionDigits: 1, roundingMode: 'up' })
t('-58849.77', '-58849.8', { maximumFractionDigits: 1, roundingMode: 'up' })
t('-3.9', '-3.9', { maximumFractionDigits: 1, roundingMode: 'up' })
t('-296861.16', '-296861.2', { maximumFractionDigits: 1, roundingMode: 'up' })
t('3957.8', '3957.8', { maximumFractionDigits: 1, roundingMode: 'up' })
t('-6.56', '-6.6', { maximumFractionDigits: 1, roundingMode: 'up' })
t('-7178.5', '-7178.5', { maximumFractionDigits: 1, roundingMode: 'up' })
t('0.43', '0.5', { maximumFractionDigits: 1, roundingMode: 'up' })
t('404.84', '404.9', { maximumFractionDigits: 1, roundingMode: 'up' })
t('-2.87', '-2.9', { maximumFractionDigits: 1, roundingMode: 'up' })
t('-50.73', '-50.8', { maximumFractionDigits: 1, roundingMode: 'up' })
t('98735.42', '98735.5', { maximumFractionDigits: 1, roundingMode: 'up' })
t('-460135.87', '-460135.9', { maximumFractionDigits: 1, roundingMode: 'up' })
t('94.2', '94.2', { maximumFractionDigits: 1, roundingMode: 'up' })
t('0.35', '0.4', { maximumFractionDigits: 1, roundingMode: 'up' })
t('-38.01', '-38.1', { maximumFractionDigits: 1, roundingMode: 'up' })
t('-3.8', '-3.8', { maximumFractionDigits: 1, roundingMode: 'up' })
t('-769356.08', '-769356.1', { maximumFractionDigits: 1, roundingMode: 'up' })
t('-2.93', '-3', { maximumFractionDigits: 1, roundingMode: 'up' })
t('-493.45', '-493.5', { maximumFractionDigits: 1, roundingMode: 'up' })
t('8.05', '8.1', { maximumFractionDigits: 1, roundingMode: 'up' })
t('41818.78', '41818.8', { maximumFractionDigits: 1, roundingMode: 'up' })
t('-9708.68', '-9708.7', { maximumFractionDigits: 1, roundingMode: 'up' })
t('-403001.81', '-403001.9', { maximumFractionDigits: 1, roundingMode: 'up' })
t('99113.69', '99113.7', { maximumFractionDigits: 1, roundingMode: 'up' })
t('0.67', '0.7', { maximumFractionDigits: 1, roundingMode: 'up' })
t('87072220.29', '87072220.3', { maximumFractionDigits: 1, roundingMode: 'up' })
t('-235.09', '-235.1', { maximumFractionDigits: 1, roundingMode: 'up' })
t('-12.04', '-12.1', { maximumFractionDigits: 1, roundingMode: 'up' })
t('2633288.26', '2633288.3', { maximumFractionDigits: 1, roundingMode: 'up' })
t('459213225.11', '459213225.2', { maximumFractionDigits: 1, roundingMode: 'up' })
t('354.59', '354.6', { maximumFractionDigits: 1, roundingMode: 'up' })
t('-868.46', '-868.5', { maximumFractionDigits: 1, roundingMode: 'up' })
t('1404343.66', '1404343.7', { maximumFractionDigits: 1, roundingMode: 'up' })
t('5.44', '5.5', { maximumFractionDigits: 1, roundingMode: 'up' })
t('-0.31', '-0.4', { maximumFractionDigits: 1, roundingMode: 'up' })
t('-927039.99', '-927040', { maximumFractionDigits: 1, roundingMode: 'up' })
t('1591239.51', '1591239.6', { maximumFractionDigits: 1, roundingMode: 'up' })
t('-6.39', '-6.4', { maximumFractionDigits: 1, roundingMode: 'up' })
t('0.11', '0.2', { maximumFractionDigits: 1, roundingMode: 'up' })
t('-0.06', '-0.1', { maximumFractionDigits: 1, roundingMode: 'up' })
t('-281281.74', '-281281.8', { maximumFractionDigits: 1, roundingMode: 'up' })
t('-7159681.91', '-7159682', { maximumFractionDigits: 1, roundingMode: 'up' })
t('-236219.94', '-236220', { maximumFractionDigits: 1, roundingMode: 'up' })
t('-37.42', '-37.5', { maximumFractionDigits: 1, roundingMode: 'up' })
t('-7293006.81', '-7293006.9', { maximumFractionDigits: 1, roundingMode: 'up' })
t('-79876327.37', '-79876327.4', { maximumFractionDigits: 1, roundingMode: 'up' })
t('-8.66', '-8.7', { maximumFractionDigits: 1, roundingMode: 'up' })

t('3820550.8', '3820551', { maximumFractionDigits: 0, roundingMode: 'up' })
t('3.9', '4', { maximumFractionDigits: 0, roundingMode: 'up' })
t('-639.1', '-640', { maximumFractionDigits: 0, roundingMode: 'up' })
t('769.5', '770', { maximumFractionDigits: 0, roundingMode: 'up' })
t('-894.7', '-895', { maximumFractionDigits: 0, roundingMode: 'up' })
t('0', '0', { maximumFractionDigits: 0, roundingMode: 'up' })
t('82.6', '83', { maximumFractionDigits: 0, roundingMode: 'up' })
t('-6.7', '-7', { maximumFractionDigits: 0, roundingMode: 'up' })
t('0.5', '1', { maximumFractionDigits: 0, roundingMode: 'up' })
t('-0.2', '-1', { maximumFractionDigits: 0, roundingMode: 'up' })
t('-1071496.6', '-1071497', { maximumFractionDigits: 0, roundingMode: 'up' })
t('-67738682.6', '-67738683', { maximumFractionDigits: 0, roundingMode: 'up' })
t('966.4', '967', { maximumFractionDigits: 0, roundingMode: 'up' })
t('-23767.7', '-23768', { maximumFractionDigits: 0, roundingMode: 'up' })
t('9520', '9520', { maximumFractionDigits: 0, roundingMode: 'up' })
t('-38.4', '-39', { maximumFractionDigits: 0, roundingMode: 'up' })
t('-3.1', '-4', { maximumFractionDigits: 0, roundingMode: 'up' })
t('-5693499.3', '-5693500', { maximumFractionDigits: 0, roundingMode: 'up' })
t('93.1', '94', { maximumFractionDigits: 0, roundingMode: 'up' })
t('32.9', '33', { maximumFractionDigits: 0, roundingMode: 'up' })
t('-9168084.1', '-9168085', { maximumFractionDigits: 0, roundingMode: 'up' })
t('-3195.6', '-3196', { maximumFractionDigits: 0, roundingMode: 'up' })
t('3.9', '4', { maximumFractionDigits: 0, roundingMode: 'up' })
t('-667430574.6', '-667430575', { maximumFractionDigits: 0, roundingMode: 'up' })
t('-4.7', '-5', { maximumFractionDigits: 0, roundingMode: 'up' })
t('-61036585.3', '-61036586', { maximumFractionDigits: 0, roundingMode: 'up' })
t('7689.8', '7690', { maximumFractionDigits: 0, roundingMode: 'up' })
t('44172160.9', '44172161', { maximumFractionDigits: 0, roundingMode: 'up' })
t('-490.8', '-491', { maximumFractionDigits: 0, roundingMode: 'up' })
t('24.6', '25', { maximumFractionDigits: 0, roundingMode: 'up' })
t('-278.3', '-279', { maximumFractionDigits: 0, roundingMode: 'up' })
t('-717030960.3', '-717030961', { maximumFractionDigits: 0, roundingMode: 'up' })
t('-2.7', '-3', { maximumFractionDigits: 0, roundingMode: 'up' })
t('-897966.4', '-897967', { maximumFractionDigits: 0, roundingMode: 'up' })
t('-711222196.4', '-711222197', { maximumFractionDigits: 0, roundingMode: 'up' })
t('-24243.9', '-24244', { maximumFractionDigits: 0, roundingMode: 'up' })
t('70.5', '71', { maximumFractionDigits: 0, roundingMode: 'up' })
t('-8181', '-8181', { maximumFractionDigits: 0, roundingMode: 'up' })
t('2859.3', '2860', { maximumFractionDigits: 0, roundingMode: 'up' })
t('22751111.4', '22751112', { maximumFractionDigits: 0, roundingMode: 'up' })
t('-50.8', '-51', { maximumFractionDigits: 0, roundingMode: 'up' })
t('-3.3', '-4', { maximumFractionDigits: 0, roundingMode: 'up' })
t('68210836.4', '68210837', { maximumFractionDigits: 0, roundingMode: 'up' })
t('-5246', '-5246', { maximumFractionDigits: 0, roundingMode: 'up' })
t('-67.9', '-68', { maximumFractionDigits: 0, roundingMode: 'up' })
t('8.7', '9', { maximumFractionDigits: 0, roundingMode: 'up' })
t('5.8', '6', { maximumFractionDigits: 0, roundingMode: 'up' })
t('6364161.3', '6364162', { maximumFractionDigits: 0, roundingMode: 'up' })
t('955952', '955952', { maximumFractionDigits: 0, roundingMode: 'up' })
t('3896.7', '3897', { maximumFractionDigits: 0, roundingMode: 'up' })
t('5.5', '6', { maximumFractionDigits: 0, roundingMode: 'up' })
t('2.5', '3', { maximumFractionDigits: 0, roundingMode: 'up' })
t('1.6', '2', { maximumFractionDigits: 0, roundingMode: 'up' })
t('1.1', '2', { maximumFractionDigits: 0, roundingMode: 'up' })
t('1.0', '1', { maximumFractionDigits: 0, roundingMode: 'up' })
t('-1.0', '-1', { maximumFractionDigits: 0, roundingMode: 'up' })
t('-1.1', '-2', { maximumFractionDigits: 0, roundingMode: 'up' })
t('-1.6', '-2', { maximumFractionDigits: 0, roundingMode: 'up' })
t('-2.5', '-3', { maximumFractionDigits: 0, roundingMode: 'up' })
t('-5.5', '-6', { maximumFractionDigits: 0, roundingMode: 'up' })

t('95', '100', { maximumFractionDigits: -1, roundingMode: 'up' })
t('861', '870', { maximumFractionDigits: -1, roundingMode: 'up' })
t('-895', '-900', { maximumFractionDigits: -1, roundingMode: 'up' })
t('1', '10', { maximumFractionDigits: -1, roundingMode: 'up' })
t('5', '10', { maximumFractionDigits: -1, roundingMode: 'up' })
t('-59', '-60', { maximumFractionDigits: -1, roundingMode: 'up' })
t('-14300', '-14300', { maximumFractionDigits: -1, roundingMode: 'up' })
t('-714010', '-714010', { maximumFractionDigits: -1, roundingMode: 'up' })
t('80845288', '80845290', { maximumFractionDigits: -1, roundingMode: 'up' })
t('45558952', '45558960', { maximumFractionDigits: -1, roundingMode: 'up' })
t('-643728', '-643730', { maximumFractionDigits: -1, roundingMode: 'up' })
t('-7743', '-7750', { maximumFractionDigits: -1, roundingMode: 'up' })
t('-759350', '-759350', { maximumFractionDigits: -1, roundingMode: 'up' })
t('-766456', '-766460', { maximumFractionDigits: -1, roundingMode: 'up' })
t('9', '10', { maximumFractionDigits: -1, roundingMode: 'up' })
t('-16557', '-16560', { maximumFractionDigits: -1, roundingMode: 'up' })
t('2195', '2200', { maximumFractionDigits: -1, roundingMode: 'up' })
t('365', '370', { maximumFractionDigits: -1, roundingMode: 'up' })
t('-802681627', '-802681630', { maximumFractionDigits: -1, roundingMode: 'up' })
t('416201801', '416201810', { maximumFractionDigits: -1, roundingMode: 'up' })
t('-83341708', '-83341710', { maximumFractionDigits: -1, roundingMode: 'up' })
t('-2853185', '-2853190', { maximumFractionDigits: -1, roundingMode: 'up' })
t('344401126', '344401130', { maximumFractionDigits: -1, roundingMode: 'up' })
t('224777', '224780', { maximumFractionDigits: -1, roundingMode: 'up' })
t('-3', '-10', { maximumFractionDigits: -1, roundingMode: 'up' })
t('0', '0', { maximumFractionDigits: -1, roundingMode: 'up' })
t('-89570412', '-89570420', { maximumFractionDigits: -1, roundingMode: 'up' })
t('-829254257', '-829254260', { maximumFractionDigits: -1, roundingMode: 'up' })
t('7636604', '7636610', { maximumFractionDigits: -1, roundingMode: 'up' })
t('47977', '47980', { maximumFractionDigits: -1, roundingMode: 'up' })
t('35328201', '35328210', { maximumFractionDigits: -1, roundingMode: 'up' })
t('-7744', '-7750', { maximumFractionDigits: -1, roundingMode: 'up' })
t('33881882', '33881890', { maximumFractionDigits: -1, roundingMode: 'up' })
t('30893', '30900', { maximumFractionDigits: -1, roundingMode: 'up' })
t('4060', '4060', { maximumFractionDigits: -1, roundingMode: 'up' })
t('964753', '964760', { maximumFractionDigits: -1, roundingMode: 'up' })
t('1', '10', { maximumFractionDigits: -1, roundingMode: 'up' })
t('-40208', '-40210', { maximumFractionDigits: -1, roundingMode: 'up' })
t('0', '0', { maximumFractionDigits: -1, roundingMode: 'up' })
t('329989', '329990', { maximumFractionDigits: -1, roundingMode: 'up' })
t('-9277770', '-9277770', { maximumFractionDigits: -1, roundingMode: 'up' })
t('-30339', '-30340', { maximumFractionDigits: -1, roundingMode: 'up' })
t('121', '130', { maximumFractionDigits: -1, roundingMode: 'up' })
t('-21027', '-21030', { maximumFractionDigits: -1, roundingMode: 'up' })
t('7', '10', { maximumFractionDigits: -1, roundingMode: 'up' })
t('0', '0', { maximumFractionDigits: -1, roundingMode: 'up' })
t('-93331', '-93340', { maximumFractionDigits: -1, roundingMode: 'up' })
t('6969', '6970', { maximumFractionDigits: -1, roundingMode: 'up' })
t('-31307621', '-31307630', { maximumFractionDigits: -1, roundingMode: 'up' })
t('-407', '-410', { maximumFractionDigits: -1, roundingMode: 'up' })
