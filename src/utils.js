import {
  reduce,
  assoc,
  curry,
  join,
  compose,
  flip,
  append,
  tap,
  equals,
  complement,
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
