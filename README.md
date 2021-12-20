# JSBD

## a JSBI style polyfill for BigDecimal

This is a polyfill for BigDecimal , which implement tc39-bigDecimal proposal https://github.com/tc39/proposal-decimal

And some result of the method referred Java.math.BigDecimal

typescript and 100% case coverage

## install

```
// use npm
npm install jsbd
// or use yarn
yarn add jsbd
```

## usage

### JSBD.BigDecimal

use `JSBD.BigDecimal` to init a BigDecimal object

```js
import JSBD from 'jsbd'

let a = JSBD.BigDecimal(3) // returns 3m
let b = JSBD.BigDecimal('345') // returns 345m
let c = JSBD.BigDecimal('115e-10') // returns 0.0000000115m
let d = JSBD.BigDecimal(2545562323242232323n) // results 2545562323242232323m
let e = JSBD.BigDecimal(true) // Throws TypeError
let f = JSBD.BigDecimal(false) // Throws TypeError
let g = JSBD.BigDecimal(null) // Throws TypeError
let h = JSBD.BigDecimal(undefined) // Throws TypeError
let i = JSBD.BigDecimal(0.1) // returns 0.1m
```

### JSBD.round(value [, options])

This is the function to be used when there's need to round `BigDecimals` in some specific way. It rounds the
`BigDecimal` passed as parameter, taking in consideration `options`.

- `value`: A `BigDecimal` value. If the value is from another type, it throws `TypeError`.
- `options`: It is an object indicating how the round operation should be performed. It is an object that can
  contain roundingMode and maximumFractionDigits properties.
  - `maximumFractionDigits`: This options indicates the maximum of factional digits the rounding operation
    should preserve. If it is `undefined`, round operations returns `value`.
  - `roundingMode`: This option indicates which algorithm is used to round the given `BigDecimal`. Each
    possible option is described below.
    - down: round towards zero.
    - half down: round towards "nearest neighbor". If both neighbors are equidistant, it rounds down.
    - half up: round towards "nearest neighbor". If both neighbors are equidistant, it rounds up.
    - half even: round towards the "nearest neighbor". If both neighbors are equidistant, it rounds towards
      the even neighbor.
    - up: round away from zero.

```js
let a = JSBD.round(0.53m, { roundingMode: 'half up', maximumFractionDigits: 1 })
assert(a, 0.5m)

a = JSBD.round(0.53m, { roundingMode: 'half down', maximumFractionDigits: 1 })
assert(a, 0.5m)

a = JSBD.round(0.53m, { roundingMode: 'half even', maximumFractionDigits: 1 })
assert(a, 0.5m)

a = JSBD.round(0.31m, { roundingMode: 'down', maximumFractionDigits: 1 })
assert(a, 0.3m)

a = JSBD.round(0.31m, { roundingMode: 'up', maximumFractionDigits: 1 })
assert(a, 0.4m)
```

### JSBD.add(lhs, rhs [, options])

This function can be used as an alternative to `+` binary operator that allows rounding the result after the
calculation. It adds `rhs` and `lhs` and returns the result of such operation, applying the rounding rules
based on `options` object, if given. `options` is an options bag that configures the rounding of this
operation.

- `lhs`: A `BigDecimal` value. If the value is from another type, it throws `TypeError`.
- `rhs`: A `BigDecimal` value. If the value is from another type, it throws `TypeError`.
- `options`: It is an object indicating how the round operation should be performed. It's the same options bag
  object described on [JSBD.round](#bigdecimalroundvalue--options). If it's not given, no rounding
  operation will be applied, and the exact result will be returned.

```javascript
let a = JSBD.BigDecimal('1.25')
let b = JSBD.BigDecimal('644e-2')
JSBD.add(a, b).toString()
// '7.69'
```

### JSBD.subtract(lhs, rhs [, options])

This function can be used as an alternative to `-` binary operator that allows rounding the result after the
calculation. It subtracts `rhs` from `lhs` and returns the result of such operation, applying the rounding
based on `options` object, if given. `options` is an options bag that configures the rounding of this
operation.

- `lhs`: A `BigDecimal` value. If the value is from another type, it throws `TypeError`.
- `rhs`: A `BigDecimal` value. If the value is from another type, it throws `TypeError`.
- `options`: It is an object indicating how the round operation should be performed. It's the same options bag
  object described on [JSBD.round](#bigdecimalroundvalue--options). If it's not given, no rounding
  operation will be applied, and the exact result will be returned.

```javascript
let a = JSBD.BigDecimal('1.25')
let b = JSBD.BigDecimal('644e-2')
JSBD.subtract(a, b).toString()
// '-5.19'
```

### JSBD.multiply(lhs, rhs [, options])

This function can be used as an alternative to `*` binary operator that allows rounding the result after the
calculation. It multiplies `rhs` by `lhs` and returns the result of such operation applying the rounding based
on `options` object, if given. `options` is an options bag that configures the rounding of this operation.

- `lhs`: A `BigDecimal` value. If the value is from another type, it throws `TypeError`.
- `rhs`: A `BigDecimal` value. If the value is from another type, it throws `TypeError`.
- `options`: It is an object indicating how the round operation should be performed. It's the same options bag
  object described on [JSBD.round](#bigdecimalroundvalue--options). If it's not given, no rounding
  operation will be applied, and the exact result will be returned.

```javascript
let a = JSBD.BigDecimal('12')
let b = JSBD.BigDecimal('1.2')
JSBD.multiply(a, b).toString()
// '14.4'
```

### JSBD.divide(lhs, rhs, options)

This function is the main way to apply division using BigDecimals. It divides `lhs` by `rhs` and returns the
result of such operation applying the rounding based on `options` object. `options` is an options
bag that configures the rounding of this operation.

- `lhs`: A `BigDecimal` value. If the value is from another type, it throws `TypeError`.
- `rhs`: A `BigDecimal` value. If the value is from another type, it throws `TypeError`.
- `options`: It is an object indicating how the round operation should be performed. It's the same options bag
  object described on [JSBD.round](#bigdecimalroundvalue--options). If it's not given, no rounding
  operation will be applied, and the exact result will be returned. If the result can't be represented (due to a
  non-terminating decimal expansion), it throws `TypeError`.

Different from other arithmetic operations on `BigDecimal` constructors, we require `options` for division
because this is the only operation where some results can't be represented as a `BigDecimal` value (e.g. when
we divide 1m by 3m) if we don't round. With the requirement to describe how we should round the result, it's
then possible to return a correct result for any given input.

```javascript
let a = JSBD.BigDecimal('0.2')
let b = JSBD.BigDecimal('3')

JSBD.divide(a, b, {
  maximumFractionDigits: 4,
  roundingMode: 'half even',
}).toString()
// '0.0067'
```

### JSBD.remainder(lhs, rhs [, options])

This function can be used as an alternative to `%` binary operator that allows rounding the result after the
calculation. It returns the reminder of dividing `lhs` by `rhs`, applying the rounding based on `options`
object, if given. `options` is an options bag that configures the rounding of this operation.

- `lhs`: A `BigDecimal` value. If the value is from another type, it throws `TypeError`.
- `rhs`: A `BigDecimal` value. If the value is from another type, it throws `TypeError`.
- `options`: It is an object indicating how the round operation should be performed. It's the same options bag
  object described on [JSBD.round](#bigdecimalroundvalue--options). If it's not given, no rounding
  operation will be applied, and the exact result will be returned.

```javascript
let a = JSBD.BigDecimal('2')
let b = JSBD.BigDecimal('0.3')

// 2 % 0.3 => 0.2
JSBD.remainder(a, b).toString()
// '0.2'
```

### JSBD.pow(number, power [, options])

This function returns the power of `number` by `power`, applying the rounding based on `options` object, if
given. `options` is an options bag that configures the rounding of this operation. `power` needs to be a
positive integer.

- `number`: A `BigDecimal` value. If the value is from another type, it throws `TypeError`.
- `power`: A positive integer `Number` value. If the value is from another type or not a positive integer, it
  throws `RangeError`.
- `options`: It is an object indicating how the round operation should be performed. It's the same options bag
  object described on [JSBD.round](#bigdecimalroundvalue--options). If it's not given, no rounding
  operation will be applied, and the exact result will be returned.

```javascript
let a = JSBD.BigDecimal('0.2')
let b = 3
JSBD.pow(a, b).toString()
// '0.008'
```

## BigDecimal prototype

`BigDecimal.prototype` includes utility methods used to help manipulation of `BigDecimal` values.

### `BigDecimal.prototype.toString()`

This method returns a string that represents the `BigDecimal` value.

```js
let v = JSBD.BigDecimal('0.55')
console.log(v.toString()) // prints "0.55"
```

### `BigDecimal.prototype.toFixed([digits])`

This function returns a string that represents fixed-point notation of the `BigDecimal` value. There is an
optional parameter `digits` that defines the number of digits after decimal point. It follows the same
semantics of `Number.prototype.toFixed`.

```js
let v = JSBD.BigDecimal('100.456')
console.log(v.toFixed(2)) // prints 100.46
let v = JSBD.BigDecimal('0')
console.log(v.toFixed(2)) // prints 0.00
```

### `BigDecimal.prototype.toExponential([fractionDigits])`

This methods returns a string of the `BigDecimal` in exponential representation. It takes an optional
parameter `fractionDigits` that defines the number of digits after decimal point. It follows the same
semantics of `Number.prototype.toExponential`.

```js
// to do
let v = JSBD.BigDecimal('1010')
console.log(v.toExponential(2)) // prints 1.01e+3
```

### `BigDecimal.prototype.toPrecision([precision])`

This function returns a string that represents the `BigDecimal` in the specified precision. It follows the
same semantics of `Number.prototype.toPrecision`.

```js
// to do
let v = JSBD.BigDecimal('1.22')
console.log(v.toPrecision()) // prints 111.22
console.log(v.toPrecision(4)) // 111.2
console.log(v.toPrecision(2)) //1.1e+2
```

## for developer

since test use es module in node , better use node >= 14

```
yarn install
// change source code and add test case
yarn test
```
