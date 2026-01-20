# Change: 为核心方法新增基准测试方案

## Why

当前缺少系统化的性能基准，难以量化不同方法的性能变化与回归。

## What Changes

- 建立 tinybench 基准测试基础框架与运行入口，按方法拆分基准文件
- 覆盖核心算术与比较方法基准
- 补充 tinybench 基准相关命令说明

## Impact

- Affected specs: method-benchmark
- Affected code: benchmark/
