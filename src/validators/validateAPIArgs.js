import { validateObjectWithConstraints } from 'folktale-validations';
import { validation as Validation } from 'folktale';
import { compose, head, of } from 'ramda';
import { API } from '../constraints';
import { replaceValidationMessageForApi } from '../errors';

const { Failure } = Validation;

export default o =>
  validateObjectWithConstraints(API)(o).orElse(
    compose(Failure, of, replaceValidationMessageForApi, head)
  );
