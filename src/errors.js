import { defaultRenderers } from 'folktale-validations'
import { compose } from 'ramda'
import { joinWithComma, joinWithSpace, appendTo } from './utils'
import { ERROR_PREFIX, CONFIGURE_PREFIX, API_PREFIX } from './const'

const { argumentsFailureRenderer } = defaultRenderers

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const throwError = message => {
  throw new Error(joinWithSpace([ERROR_PREFIX, message]))
}

const throwPrefixedError = prefix =>
  compose(throwError, joinWithSpace, appendTo([prefix]))

// -----------------------------------------------------------------------------
// Prefixed Errors
// -----------------------------------------------------------------------------

export const throwConfigureError = compose(
  throwPrefixedError(CONFIGURE_PREFIX),
  argumentsFailureRenderer
)
export const throwAPIError = compose(
  throwPrefixedError(API_PREFIX),
  argumentsFailureRenderer
)

// -----------------------------------------------------------------------------
// Messages
// -----------------------------------------------------------------------------

export const invalidConfigMessage = validationErrors =>
  `The config object was invalid: ${joinWithComma(validationErrors)}`

export const invalidAPIParamsMessage = joinWithComma
