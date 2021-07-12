export const parseToNumber = (value: unknown) =>
  value == null || Number.isNaN(value) ? null : Number(value);
