import { validation as Validation } from 'folktale';
import validateIsNumberWithPx from '../../validators/validateIsNumberWithPx';

const { Success, Failure } = Validation;

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
      const validation = validateIsNumberWithPx();
      expect(Failure.hasInstance(validation)).toBeTruthy();
      expect(validation.value).toEqual([`Wasn't number with unit: 'px'`]);
    });
  });
});
