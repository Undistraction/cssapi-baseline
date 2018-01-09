import { pluck } from 'ramda';
import { validateKeys } from 'folktale-validations';
import { CONFIG } from '../const';

export default validateKeys(pluck(`name`, CONFIG));
