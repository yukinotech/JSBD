export type DecimalIntVal = string | number | bigint

export type DecimalSign = -1 | 1

export type Exponent = { sign: DecimalSign; value: string }

export interface RoundOption {
  maximumFractionDigits?: number
  roundingMode?: 'down' | 'half down' | 'half up' | 'half even' | 'up'
}
