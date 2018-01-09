import { validation as Validation } from 'folktale';
import validateConfigValues from '../../validators/validateConfigValues';

const { Success, Failure } = Validation;

describe(`validateConfigValues()`, () => {
  describe(`with valid values`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const value = {
        rootFontSize: 16,
        baselineHeight: 20,
      };
      const result = validateConfigValues(value);
      expect(Success.hasInstance(result)).toBeTruthy();
    });
  });

  describe(`with invalid values`, () => {
    it(`returns a Validation.Failure with error Messages`, () => {
      const value = {
        rootFontSize: `x`,
        baselineHeight: `x`,
      };
      const result = validateConfigValues(value);
      expect(Failure.hasInstance(result)).toBeTruthy();
      expect(result.value).toEqual([
        `Param 'rootFontSize': Wasn't a valid Number and Wasn't number with unit: 'px'`,
        `Param 'baselineHeight': Wasn't a valid Number and Wasn't number with unit: 'px'`,
      ]);
    });
  });
});