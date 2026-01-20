# method-benchmark Specification

## Purpose

TBD - created by archiving change add-method-benchmarks. Update Purpose after archive.

## Requirements

### Requirement: 方法级基准覆盖

系统 SHALL 提供针对核心方法的基准测试集合，用于衡量性能与回归。

#### Scenario: 运行核心算术方法基准

- **WHEN** 运行基准测试入口
- **THEN** 对 add、subtract、multiply、divide、remainder、pow、round 生成独立的性能结果

#### Scenario: 运行核心比较方法基准

- **WHEN** 运行基准测试入口
- **THEN** 对 equal、notEqual、lessThan、greaterThan、lessThanOrEqual、greaterThanOrEqual 生成独立的性能结果

### Requirement: 统一的基准执行与输出

系统 SHALL 使用 tinybench 作为基准执行引擎，提供统一的基准执行入口，并以固定格式输出结果，便于对比与回归分析。

#### Scenario: 输出格式一致

- **WHEN** 基准测试完成
- **THEN** 输出包含方法名与关键性能指标的结果条目

#### Scenario: 采用 tinybench 执行

- **WHEN** 运行基准测试入口
- **THEN** 基准任务由 tinybench 进行调度与测量

### Requirement: 基准命令说明

系统 SHALL 提供 tinybench 相关的基准命令说明，便于开发者执行与复现。

#### Scenario: 命令可用性说明

- **WHEN** 开发者查阅基准说明
- **THEN** 能看到运行 tinybench 基准所需的命令与参数示例
