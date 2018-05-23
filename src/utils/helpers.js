export const aboveZero = value => Math.max(1, value);
export const nonNegative = value => Math.max(0, value);

export const onOffClass = (baseClass, condition) => baseClass + '--' + (condition ? 'on' : 'off');

export const chances = value => Math.random() < value;

export const wait = timeout => new Promise(resolve => setTimeout(resolve, timeout));

export const percent = value => Math.floor(value * 100) + '%';