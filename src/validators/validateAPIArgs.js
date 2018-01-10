import { validation as Validation } from 'folktale';
import { unless, compose, append } from 'ramda';
import { isUndefined } from 'ramda-adjunct';
import { validateIsValidNumber } from 'folktale-validations';
import validateIsNumberOrNumberWithPx from './validateIsNumberOrNumberWithPx';

const { collect } = Validation;

export default (fontSize, lines) => {
  const validations = [validateIsNumberOrNumberWithPx(fontSize)];
  unless(isUndefined, compose(append(validations), validateIsValidNumber))(
    lines
  );
  return collect(validations);
};
