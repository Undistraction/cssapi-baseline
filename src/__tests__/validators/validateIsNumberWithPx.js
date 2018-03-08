import { validation as Validation } from 'folktale';
import validateIsNumberWithPx from '../../validations/validators/validateIsNumberWithPx';

const { Success } = Validation;

describe(`isNumberWithPx()`, () => {
  describe(`when argument is pixel value`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const value = `11.3px`;
      const result = validateIsNumberWithPx(value);
      expect(Success.hasInstance(result)).toBeTruthy();
      expect(result.value).toEqual(value);
    });
  });
  describe(`when argument is invalid value`, () => {
    it(`returns a Validation.Failure with an error message`, () => {
      const validation = validateIsNumberWithPx(11);
      expect(validation.value).toEqual({
        args: [`px`],
        uid: `folktale-validations.validateIsNumberWithUnit`,
        value: 11,
      });
    });
  });
});
