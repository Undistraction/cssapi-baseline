import { reduce } from 'ramda';

const toDefaultConfig = (acc, value) => {
  acc[value.name] = value.default;
  return acc;
};

// eslint-disable-next-line import/prefer-default-export
export const defaultConfig = reduce(toDefaultConfig, {});
