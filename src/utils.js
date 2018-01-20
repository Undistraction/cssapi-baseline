import {
  curry,
  join,
  compose,
  flip,
  append,
  tap,
  equals,
  complement,
} from 'ramda';

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
