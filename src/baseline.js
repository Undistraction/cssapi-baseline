import { merge, compose } from 'ramda';
import { validateIsObject } from 'folktale-validations';
import { getDefaultConfig } from './utils';
import { throwError, invalidConfigMessage } from './errors';
import validateConfig from './validators/validateConfig';
import api from './api';

const mergeDefaults = merge(getDefaultConfig());

const throwOrBuildApi = config =>
  validateConfig(config).matchWith({
    Success: validation => api(validation.value),
    Failure: ({ value }) => {
      throwError(invalidConfigMessage(value));
    },
  });

const configure = (config = {}) =>
  validateIsObject(config).matchWith({
    Success: ({ value }) => compose(throwOrBuildApi, mergeDefaults)(value),
    Failure: ({ value }) => compose(throwError, invalidConfigMessage)(value),
  });

export default {
  configure,
};
