import {
  validateIsValidNumber,
  alternativeValidator,
} from 'folktale-validations';
import validateIsNumberWithPx from './validateIsNumberWithPx';

export default alternativeValidator([
  validateIsValidNumber,
  validateIsNumberWithPx,
]);
