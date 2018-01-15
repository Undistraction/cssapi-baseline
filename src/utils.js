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
  prop,
  has,
  map,
  filter,
} from 'ramda';
import { isNotUndefined } from 'ramda-adjunct';
import { CONFIG } from './constraints';

export const getDefaultConfig = _ =>
  reduce(
    (acc, value) =>
      isNotUndefined(value.default)
        ? assoc(value.name, value.default, acc)
        : acc,
    {},
    CONFIG
  );

const hasIsRequiredKey = has(`isRequired`);
const pluckName = pluck(`name`);
const propName = prop(`name`);

export const configKeys = always(pluckName(CONFIG));
export const requiredConfigKeys = always(
  compose(map(propName), filter(hasIsRequiredKey))(CONFIG)
);

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

export const joinWithComma = join(`, `);
