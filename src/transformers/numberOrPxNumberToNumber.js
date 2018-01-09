import { numericPartOfUnitedNumber } from 'js-css-units';
import { isNumber } from 'ramda-adjunct';

export default numberOrPxNumber =>
  isNumber(numberOrPxNumber)
    ? numberOrPxNumber
    : numericPartOfUnitedNumber(numberOrPxNumber);
