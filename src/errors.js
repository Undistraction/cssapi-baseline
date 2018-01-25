import { compose, replace } from 'ramda';
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

export const invalidConfigMessage = validationErrors => {
  console.log(`!!!!!`, validationErrors);
  return `The config object was invalid: ${joinWithComma(validationErrors)}`;
};

export const invalidAPIParamsMessage = joinWithComma;

// -----------------------------------------------------------------------------
// Validation Replacement
// -----------------------------------------------------------------------------

const replaceMissingRequiredValuesPrefix = replace(
  `Object Invalid: Object was missing required key(s):`,
  `Missing required arguments`
);

const replaceInvalidKeysPrefix = replace(
  `Object Invalid: Object included invalid key(s):`,
  `You supplied unsupported Arguments`
);

const replaceInvalidValuesPrefix = replace(
  `Object Invalid: Object included invalid values(s): `,
  `You supplied invalid Arguments `
);

const replaceValidationMessageKey = replace(/Key /g, `Argument `);

export const replaceValidationMessageForApi = compose(
  replaceMissingRequiredValuesPrefix,
  replaceInvalidKeysPrefix,
  replaceInvalidValuesPrefix,
  replaceValidationMessageKey
);
