import { validation as Validation } from 'folktale';
import { compose, map, find, propEq, toPairs, identity } from 'ramda';
import { CONFIG } from '../const';

const { Failure, collect } = Validation;

const getValidator = config => {
  const name = config[0];
  const item = find(propEq(`name`, name), CONFIG);
  const { validator } = item;
  return validator(config[1]).matchWith({
    Success: identity(),
    Failure: validation => Failure([`Param '${name}': ${validation.value}`]),
  });
};

export default o => compose(collect, map(getValidator), toPairs)(o);
