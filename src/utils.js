import { reduce, assoc, pluck, always } from 'ramda';
import { CONFIG } from './const';

export const getDefaultConfig = _ =>
  reduce(
    (acc, value) =>
      value.default ? assoc(value.name, value.default, acc) : acc,
    {},
    CONFIG
  );

export const configKeys = always(pluck(`name`, CONFIG));

export const configValidatorsMap = always(
  reduce((acc, { name, validator }) => assoc(name, validator, acc), {})(CONFIG)
);
