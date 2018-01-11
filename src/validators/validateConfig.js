import { untilFailureValidator } from 'folktale-validations';
import validateConfigKeys from './validateConfigKeys';
import validateConfigValues from './validateConfigValues';

export default untilFailureValidator([
  validateConfigKeys,
  validateConfigValues,
]);
