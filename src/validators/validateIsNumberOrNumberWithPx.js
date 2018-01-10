import { validateIsValidNumber, orValidator } from 'folktale-validations';
import validateIsNumberWithPx from './validateIsNumberWithPx';

export default orValidator(validateIsValidNumber, validateIsNumberWithPx);
