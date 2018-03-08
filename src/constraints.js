import {
  validateIsBoolean,
  validateIsWhitelistedValue,
  validateIsFunction,
  validateIsValidNumber,
  validateIsPlainObject,
} from 'folktale-validations';
import { values } from 'ramda';
import validateIsNumberOrNumberWithPx from './validations/validators/validateIsNumberOrNumberWithPx';
import numberOrPxNumberToNumber from './transformers/numberOrPxNumberToNumber';
import offsetWithPosition from './baselineOffsetStrategies/offsetWithPosition';
import { UNITS } from './const';

// eslint-disable-next-line import/prefer-default-export
export const CONFIG = {
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
      validator: validateIsWhitelistedValue(values(UNITS)),
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

export const BASELINE_ARGS = {
  fields: [
    {
      name: `config`,
      validator: validateIsPlainObject,
      defaultValue: {},
      value: CONFIG,
    },
  ],
};

export const API = {
  fields: [
    {
      name: `fontSize`,
      isRequired: true,
      validator: validateIsNumberOrNumberWithPx,
      transformer: numberOrPxNumberToNumber,
    },
    {
      name: `lines`,
      validator: validateIsValidNumber,
    },
  ],
};
