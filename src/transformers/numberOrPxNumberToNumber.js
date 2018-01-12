import { numericPartOfUnitedNumber } from 'cssjs-units';
import { isNumber } from 'ramda-adjunct';

export default numberOrPxNumber =>
  isNumber(numberOrPxNumber)
    ? numberOrPxNumber
    : numericPartOfUnitedNumber(numberOrPxNumber);
