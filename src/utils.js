import {
  reduce,
  assoc,
  pluck,
  always,
  curry,
  join,
  compose,
  flip,
  append,
  tap,
  equals,
  complement,
} from 'ramda';
import { CONFIG } from './const';
import { isNotUndefined } from 'ramda-adjunct';

export const getDefaultConfig = _ =>
  reduce(
    (acc, value) =>
      isNotUndefined(value.default)
        ? assoc(value.name, value.default, acc)
        : acc,
    {},
    CONFIG
  );

export const configKeys = always(pluck(`name`, CONFIG));

export const configValidatorsMap = always(
  reduce((acc, { name, validator }) => assoc(name, validator, acc), {})(CONFIG)
);

const log = curry((loggingFunction, prefix) =>
  tap(
    compose(loggingFunction, join(`: `), flip(append)([prefix]), JSON.stringify)
  )
);

const isZero = equals(0);
export const isNotZero = complement(isZero);

// eslint-disable-next-line no-console
export const logToConsole = log(console.log);
