import rhythm from '../index';

describe(`rhythm`, () => {
  describe(`configure()`, () => {
    describe(`with no arguments`, () => {
      it(`doesn't throw`, () => {
        expect(() => rhythm.configure()).not.toThrow();
      });
    });
    describe(`with an invalid argument`, () => {
      it(`throws`, () => {
        const value = `x`;
        expect(() => rhythm.configure(value)).toThrow(
          `The config object was invalid: Wasn't type: 'Object'`
        );
      });
    });

    describe(`with invalid config param names`, () => {
      it(`throws`, () => {
        const value = { a: 1, b: 2 };
        expect(() => rhythm.configure(value)).toThrow(
          `The config object was invalid: Object included invalid keys: '[a, b]'`
        );
      });
    });

    describe(`with invalid config param keys`, () => {
      it(`throws`, () => {
        const value = { rootFontSize: `x`, baselineHeight: `100%` };
        expect(() => rhythm.configure(value)).toThrow(
          `The config object was invalid: Param 'rootFontSize': Wasn't a valid Number and Wasn't number with unit: 'px', Param 'baselineHeight': Wasn't a valid Number and Wasn't number with unit: 'px'`
        );
      });
    });
  });
});
