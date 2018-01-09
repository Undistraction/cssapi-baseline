import { validation as Validation } from 'folktale';
import validateIsNumberOrNumberWithPx from '../../validators/validateIsNumberOrNumberWithPx';

const { Success, Failure } = Validation;

describe(`isNumberOrNumberWithPx`, () => {
  describe(`when argument is a number`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const value = 1;
      const validation = validateIsNumberOrNumberWithPx(value);
      expect(Success.hasInstance(validation)).toBeTruthy();
      expect(validation.value).toEqual(value);
    });
  });

  describe(`when argument is a number with px`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const value = `1.1px`;
      const validation = validateIsNumberOrNumberWithPx(value);
      expect(Success.hasInstance(validation)).toBeTruthy();
      expect(validation.value).toEqual(value);
    });
  });

  describe(`when argument is invalid`, () => {
    it(`returns a Validation.Failure with an error message`, () => {
      const value = `x`;
      const validation = validateIsNumberOrNumberWithPx(value);
      expect(Failure.hasInstance(validation)).toBeTruthy();
      expect(validation.value).toEqual([
        `Wasn't a valid Number and Wasn't number with unit: 'px'`,
      ]);
    });
  });
});
