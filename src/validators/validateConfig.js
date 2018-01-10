import { validation } from 'folktale';
import validateConfigKeys from './validateConfigKeys';
import validateConfigValues from './validateConfigValues';

const { Success, Failure } = validation;

export default config => {
  let errorMessages;
  const hadValidKeys = validateConfigKeys(config);
  if (Success.hasInstance(hadValidKeys)) {
    const hasValidValues = validateConfigValues(config);
    if (Success.hasInstance(hasValidValues)) {
      return Success(config);
    }
    errorMessages = hasValidValues.value;
  } else {
    errorMessages = hadValidKeys.value;
  }
  return Failure(errorMessages);
};
