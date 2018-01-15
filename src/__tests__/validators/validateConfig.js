import { validation as Validation } from 'folktale';
import validateConfig from '../../validators/validateConfig';
import { CONFIG } from '../../constraints';

const { Success, Failure } = Validation;

describe(`validateConfig()`, () => {
  describe(`with valid values`, () => {
    it(`returns a Validation.Success with the supplied value`, () => {
      const value = {
        rootFontSize: 16,
        baselineHeight: 20,
        minLeading: 4,
        renderUnit: `px`,
        allowHalfLines: true,
        baselineOffset: 0,
        baselineOffsetStrategy() {},
      };
      const result = validateConfig(value);
      expect(Success.hasInstance(result)).toBeTruthy();
    });
  });

  describe(`with invalid values`, () => {
    it(`returns a Validation.Failure with error Messages`, () => {
      const value = {
        rootFontSize: `x`,
        baselineHeight: `x`,
        minLeading: 4,
        renderUnit: `px`,
        allowHalfLines: true,
        baselineOffset: 0,
        baselineOffsetStrategy() {},
      };
      const result = validateConfig(value);
      expect(Failure.hasInstance(result)).toBeTruthy();
      expect(result.value).toEqual([
        `Object included invalid values(s): Key 'rootFontSize': Wasn't a valid Number and Wasn't number with unit: 'px', Key 'baselineHeight': Wasn't a valid Number and Wasn't number with unit: 'px'`,
      ]);
    });
  });
});