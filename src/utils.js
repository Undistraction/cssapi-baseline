import {
  curry,
  join,
  compose,
  flip,
  append,
  tap,
  equals,
  complement,
  both,
  isEmpty,
  reject,
  anyPass,
  prop,
  pickBy,
} from 'ramda'
import { isString, isArray, isUndefined, isNotUndefined } from 'ramda-adjunct'

// -----------------------------------------------------------------------------
// Logging
// -----------------------------------------------------------------------------

const log = curry((loggingFunction, prefix) =>
  tap(
    compose(loggingFunction, join(`: `), flip(append)([prefix]), JSON.stringify)
  )
)

// eslint-disable-next-line no-console
export const logToConsole = log(console.log)

// ---------------------------------------------------------------------------
// Predicates
// ---------------------------------------------------------------------------

const isZero = equals(0)
export const isNotZero = complement(isZero)
export const isEmptyArray = both(isArray, isEmpty)
export const isEmptyString = both(isString, isEmpty)

// -----------------------------------------------------------------------------
// String
// -----------------------------------------------------------------------------

export const quote = value => `'${value}'`

export const joinDefined = s => v => {
  const remaining = reject(anyPass([isEmptyString, isEmptyArray, isUndefined]))(
    v
  )
  const result = join(s, remaining)
  return result
}

export const joinWithComma = joinDefined(`, `)
export const joinWithColon = joinDefined(`: `)
export const joinWithSpace = joinDefined(` `)

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

export const propValue = prop(`value`)

// -----------------------------------------------------------------------------
// List
// -----------------------------------------------------------------------------

export const appendTo = flip(append)

// -----------------------------------------------------------------------------
// Object
// -----------------------------------------------------------------------------

export const pickIsNotUndefined = pickBy(isNotUndefined)
