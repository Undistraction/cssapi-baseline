import { CONFIG } from './const';
import { defaultConfig } from './utils';
import { throwError, invalidConfigMessage } from './errors';
import validateConfig from './validators/validateConfig';

const build = config => `xx`;

const configure = (config = defaultConfig(CONFIG)) =>
  validateConfig(config).matchWith({
    Success: build,
    Failure: ({ value }) => {
      throwError(invalidConfigMessage(value));
    },
  });

export default {
  configure,
};
