# Project Overview

JSBD is a polyfill for the BigDecimal proposal (stage 1) in ECMAScript, designed with a JSBI-style approach. It implements high-precision decimal arithmetic, following the [tc39-bigDecimal proposal](https://github.com/tc39/proposal-decimal) and drawing inspiration from `Java.math.BigDecimal`.

The library provides a robust set of operations for arithmetic, rounding, and comparison of decimal numbers, ensuring 100% test coverage and TypeScript support.

## Key Features

- **BigDecimal Creation**: Support for initializing from numbers, strings, and BigInts.
- **Arithmetic Operations**: `add`, `subtract`, `multiply`, `divide`, `remainder`, `pow`.
- **Rounding Modes**: Comprehensive rounding options including `down`, `half down`, `half up`, `half even`, and `up`.
- **Comparisons**: Full suite of comparison functions (`equal`, `greaterThan`, etc.).
- **Formatting**: Standard methods like `toString`, `toFixed`, `toExponential`, and `toPrecision`.

# Tech Stack

- **Language**: TypeScript
- **Testing**: Jest (with `ts-jest`) is used for unit testing, aiming for high coverage.
- **Build System**: Rollup is used to bundle the library into various formats (CommonJS, ESM, UMD).
- **Code Quality**: Prettier and Husky are used for code formatting and pre-commit hooks.
- **Package Manager**: Yarn

# Directory Structure

- `src/`
  - `index.ts`: Entry point exporting the library.
  - `jsbd.ts`: Main implementation of the public API (JSBD object).
  - `decimal.ts`: Core logic for `BigDecimal` data structure and low-level arithmetic.
  - `utils.ts`: Utility functions for internal use.
  - `type.ts`: TypeScript type definitions.
- `test/`: Contains unit tests organized by module (`decimal`, `jsbd`, `utils`).
- `benchmark/`: Performance benchmarks.
- `dist/`: Generated build artifacts (created after build).

# Development Workflow

## Setup
```bash
yarn install
```

## Running Tests
Run all tests with coverage:
```bash
yarn test
```

Run tests generally:
```bash
yarn test:pre
```

## Building
Build the project for production (generates `dist/`):
```bash
yarn build
```

## Formatting
The project uses Prettier. Setup includes a pre-commit hook to format staged files.
