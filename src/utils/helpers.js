export const aboveZero = value => Math.max(1, value);
export const nonNegative = value => Math.max(0, value);

export const onOffClass = (baseClass, condition) => baseClass + '--' + (condition ? 'on' : 'off');

// export const chance()