import { isFunction } from 'ramda-adjunct';
import createBaseline from '../index';

describe(`configure()`, () => {
  describe(`with no arguments`, () => {
    it(`doesn't throw`, () => {
      expect(() => createBaseline()).not.toThrow();
    });

    it(`returns a function`, () => {
      expect(isFunction(createBaseline())).toBeTruthy();
    });
  });

  describe(`with an invalid argument`, () => {
    it(`throws`, () => {
      const value = `x`;
      expect(() => createBaseline(value)).toThrow(
        `[cssapi-baseline] configure() The config object was invalid: Wasn't type: 'Object'`
      );
    });
  });

  describe(`with invalid config param names`, () => {
    it(`throws`, () => {
      const value = { a: 1, b: 2 };

      expect(() => createBaseline(value)).toThrow(
        `[cssapi-baseline] configure() The config object was invalid: Object Invalid: Object included invalid key(s): '[a, b]'`
      );
    });
  });

  describe(`with invalid config param keys`, () => {
    it(`throws`, () => {
      const value = { rootFontSize: `x`, baselineHeight: `100%` };
      expect(() => createBaseline(value)).toThrow(
        `[cssapi-baseline] configure() The config object was invalid: Object Invalid: Object included invalid values(s): Key 'rootFontSize': Wasn't a valid Number and Wasn't number with unit: 'px', Key 'baselineHeight': Wasn't a valid Number and Wasn't number with unit: 'px'`
      );
    });
  });
});
