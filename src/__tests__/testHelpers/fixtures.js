export const allValues = [
  [],
  {},
  function() {},
  /x/,
  `x`,
  1,
  null,
  undefined,
  NaN,
  true,
  false,
];

export const notObject = [
  [],
  function() {},
  /x/,
  `x`,
  1,
  null,
  undefined,
  NaN,
  true,
  false,
];

export const notNumber = [
  [],
  {},
  function() {},
  /x/,
  `x`,
  null,
  undefined,
  NaN,
  true,
  false,
];

export const notNumberOrUndefined = [
  [],
  {},
  function() {},
  /x/,
  `x`,
  null,
  NaN,
  true,
  false,
];
