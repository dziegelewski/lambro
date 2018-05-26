export const plus = number => value => value + number;

export const minus = number => value => value - number;

export const notBiggerThan = number => value => Math.min(value, number);

export const nonNegative = value => Math.max(0, value);

export const aboveZero = value => Math.max(1, value);

export const toPowerOf = pow => value => value ** pow;

export const pipe = (value, ...functions) => functions.reduce((total, fn) => fn(total), value);