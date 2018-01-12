import {
  validateIsBoolean,
  validateIsWhitelistedString,
} from 'folktale-validations';

import { values, identity } from 'ramda';
import validateIsNumberOrNumberWithPx from './validators/validateIsNumberOrNumberWithPx';
import numberOrPxNumberToNumber from './transformers/numberOrPxNumberToNumber';

// eslint-disable-next-line import/prefer-default-export
export const UNITS = Object.freeze({
  REM: `rem`,
  EM: `em`,
  PX: `px`,
});

// Keys for config object passed into configure()
export const CONFIG = [
  {
    name: `rootFontSize`,
    default: 16,
    validator: validateIsNumberOrNumberWithPx,
    transformer: numberOrPxNumberToNumber,
  },
  {
    name: `baselineHeight`,
    default: 20,
    validator: validateIsNumberOrNumberWithPx,
    transformer: numberOrPxNumberToNumber,
  },
  {
    name: `renderUnit`,
    default: UNITS.REM,
    validator: validateIsWhitelistedString(values(UNITS)),
    transformer: identity,
  },
  {
    name: `allowHalfLines`,
    default: true,
    validator: validateIsBoolean,
    transformer: identity,
  },
  {
    name: `minLeading`,
    default: 2,
    validator: validateIsNumberOrNumberWithPx,
    transformer: numberOrPxNumberToNumber,
  },
];
