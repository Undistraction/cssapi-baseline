import { compose } from 'ramda';
import { joinWithComma, joinWithSpace, appendTo } from './utils';
import { ERROR_PREFIX, CONFIGURE_PREFIX, API_PREFIX } from './const';

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

const throwError = message => {
  throw new Error(joinWithSpace([ERROR_PREFIX, message]));
};

const throwPrefixedError = prefix =>
  compose(throwError, joinWithSpace, appendTo([prefix]));

// -----------------------------------------------------------------------------
// Prefixed Errors
// -----------------------------------------------------------------------------

export const throwConfigureError = throwPrefixedError(CONFIGURE_PREFIX);
export const throwAPIError = throwPrefixedError(API_PREFIX);

// -----------------------------------------------------------------------------
// Messages
// -----------------------------------------------------------------------------

export const invalidConfigMessage = validationErrors =>
  `The config object was invalid: ${joinWithComma(validationErrors)}`;

export const invalidAPIParamsMessage = validationErrors =>
  `The values supplied were invalid: ${joinWithComma(validationErrors)}`;
