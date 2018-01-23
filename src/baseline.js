import { compose } from 'ramda';
import { validateIsObject } from 'folktale-validations';
import { throwConfigureError, invalidConfigMessage } from './errors';
import validateConfig from './validators/validateConfig';
import api from './api';
import { propValue } from './utils';

const throwOrBuildApi = config =>
  validateConfig(config).matchWith({
    Success: compose(api, propValue),
    Failure: compose(throwConfigureError, invalidConfigMessage, propValue),
  });

export default (config = {}) =>
  validateIsObject(config).matchWith({
    Success: ({ value }) => throwOrBuildApi(value),
    Failure: ({ value }) =>
      compose(throwConfigureError, invalidConfigMessage)(value),
  });
