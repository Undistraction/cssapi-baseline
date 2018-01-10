import { reduce } from 'ramda';
import { CONFIG } from './const';

const toDefaultConfig = (acc, value) => {
  acc[value.name] = value.default;
  return acc;
};

// eslint-disable-next-line import/prefer-default-export
export const getDefaultConfig = _ => reduce(toDefaultConfig, {}, CONFIG);
