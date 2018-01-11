import { validation as Validation } from 'folktale';
import { compose, reduce, find, propEq, toPairs } from 'ramda';
import { CONFIG } from '../const';

const { Success, Failure } = Validation;

const getValidator = (acc, value) => {
  const name = value[0];
  const item = find(propEq(`name`, name), CONFIG);
  const { validator } = item;
  const result = validator(value[1]).matchWith({
    Success: _ => acc,
    Failure: validation => Failure([`Param '${name}': ${validation.value}`]),
  });

  return acc.concat(result);
};

export default o => compose(reduce(getValidator, Success(o)), toPairs)(o);
