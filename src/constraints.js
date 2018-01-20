import {
  validateIsBoolean,
  validateIsWhitelistedString,
  validateIsFunction,
} from 'folktale-validations';
import { values } from 'ramda';
import validateIsNumberOrNumberWithPx from './validators/validateIsNumberOrNumberWithPx';
import numberOrPxNumberToNumber from './transformers/numberOrPxNumberToNumber';
import offsetWithPosition from './baselineOffsetStrategies/offsetWithPosition';
import { UNITS } from './const';

// eslint-disable-next-line import/prefer-default-export
export default {
  fields: [
    {
      name: `rootFontSize`,
      defaultValue: 16,
      validator: validateIsNumberOrNumberWithPx,
      transformer: numberOrPxNumberToNumber,
    },
    {
      name: `baselineHeight`,
      defaultValue: 20,
      validator: validateIsNumberOrNumberWithPx,
      transformer: numberOrPxNumberToNumber,
    },
    {
      name: `renderUnit`,
      defaultValue: UNITS.REM,
      validator: validateIsWhitelistedString(values(UNITS)),
    },
    {
      name: `allowHalfLines`,
      defaultValue: true,
      validator: validateIsBoolean,
    },
    {
      name: `minLeading`,
      defaultValue: 2,
      validator: validateIsNumberOrNumberWithPx,
      transformer: numberOrPxNumberToNumber,
    },
    {
      name: `baselineOffset`,
      defaultValue: 0,
      validator: validateIsNumberOrNumberWithPx,
      transformer: numberOrPxNumberToNumber,
    },
    {
      name: `baselineOffsetStrategy`,
      defaultValue: offsetWithPosition,
      validator: validateIsFunction,
    },
  ],
};
