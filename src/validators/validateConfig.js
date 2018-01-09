import { validation } from 'folktale';
import { validateIsObject } from 'folktale-validations';
import validateConfigKeys from './validateConfigKeys';
import validateConfigValues from './validateConfigValues';

const { Success, Failure } = validation;

export default config => {
  const wasObject = validateIsObject(config);
  let errorMessages;
  if (Success.hasInstance(wasObject)) {
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
  } else {
    errorMessages = wasObject.value;
  }
  return Failure(errorMessages);
};
