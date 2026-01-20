# 项目概述

JSBD 是 ECMAScript 中 BigDecimal 提案（stage 1）的一个 polyfill，采用类似 JSBI 的设计思路。它实现了高精度十进制运算，遵循 [tc39-bigDecimal 提案](https://github.com/tc39/proposal-decimal)，并从 `Java.math.BigDecimal` 中汲取灵感。

该库提供了一整套健壮的十进制数运算、舍入和比较功能，并保证 100% 的测试覆盖率，同时支持 TypeScript。

## 主要特性

* **BigDecimal 创建**：支持从 number、string 和 BigInt 初始化。
* **算术运算**：`add`、`subtract`、`multiply`、`divide`、`remainder`、`pow`。
* **舍入模式**：提供全面的舍入选项，包括 `down`、`half down`、`half up`、`half even` 和 `up`。
* **比较操作**：完整的比较函数集合（如 `equal`、`greaterThan` 等）。
* **格式化**：提供标准方法，如 `toString`、`toFixed`、`toExponential` 和 `toPrecision`。

# 技术栈

* **语言**：TypeScript
* **测试**：使用 Jest（配合 `ts-jest`）进行单元测试，目标是高覆盖率。
* **构建系统**：使用 Rollup 将库打包为多种格式（CommonJS、ESM、UMD）。
* **代码质量**：使用 Prettier 进行代码格式化，使用 Husky 管理 pre-commit 钩子。
* **包管理器**：Yarn

# 目录结构

* `src/`

  * `index.ts`：入口文件，导出整个库。
  * `jsbd.ts`：公共 API 的主要实现（JSBD 对象）。
  * `decimal.ts`：`BigDecimal` 数据结构及底层算术逻辑的核心实现。
  * `utils.ts`：内部使用的工具函数。
  * `type.ts`：TypeScript 类型定义。
* `test/`：按模块组织的单元测试（`decimal`、`jsbd`、`utils`）。
* `benchmark/`：性能基准测试。
* `dist/`：构建后生成的产物（执行 build 后生成）。

# 开发流程

## 安装依赖

```bash
yarn install
```

## 运行测试

运行所有测试并生成覆盖率报告：

```bash
yarn test
```

普通运行测试：

```bash
yarn test:pre
```

## 构建

构建生产版本（生成 `dist/`）：

```bash
yarn build
```

## 格式化

项目使用 Prettier 进行代码格式化，并通过 pre-commit 钩子对暂存的文件自动格式化。

