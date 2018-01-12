import { isFunction } from 'ramda-adjunct';
import 'jest-styled-components';

import rhythm from '../index';

describe.only(`rhythm`, () => {
  describe(`configure()`, () => {
    describe(`with no arguments`, () => {
      it(`doesn't throw`, () => {
        expect(() => rhythm.configure()).not.toThrow();
      });

      it(`returns a function`, () => {
        expect(isFunction(rhythm.configure())).toBeTruthy();
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
          `The config object was invalid: Object included invalid key(s): '[a, b]`
        );
      });
    });

    describe(`with invalid config param keys`, () => {
      it(`throws`, () => {
        const value = { rootFontSize: `x`, baselineHeight: `100%` };
        expect(() => rhythm.configure(value)).toThrow(
          `The config object was invalid: Object included invalid values(s): Key 'rootFontSize': Wasn't a valid Number and Wasn't number with unit: 'px', Key 'baselineHeight': Wasn't a valid Number and Wasn't number with unit: 'px'`
        );
      });
    });
  });

  describe(`api`, () => {
    describe(`with defaults`, () => {
      const baseline = rhythm.configure();

      describe(`with param 'font-size'`, () => {
        describe(`invalid value`, () => {
          it(`throws`, () => {
            expect(() => baseline(`x`)).toThrowError(
              `The values supplied were invalid: Wasn't a valid Number and Wasn't number with unit: 'px'`
            );
          });

          describe(`valid unitless value`, () => {
            it(`returns the correct line-height and font-size`, () => {
              expect(baseline(16)).toEqual({
                'font-size': `1rem`,
                'line-height': `1.25rem`,
              });

              expect(baseline(19)).toEqual({
                'font-size': `1.1875rem`,
                'line-height': `1.875rem`,
              });

              expect(baseline(19)).toEqual({
                'font-size': `1.1875rem`,
                'line-height': `1.875rem`,
              });

              expect(baseline(6)).toEqual({
                'font-size': `0.375rem`,
                'line-height': `0.625rem`,
              });
            });
          });

          describe(`valid united value`, () => {
            it(`returns the correct line-height and font-size`, () => {
              expect(baseline(`16px`)).toEqual({
                'font-size': `1rem`,
                'line-height': `1.25rem`,
              });

              expect(baseline(`19px`)).toEqual({
                'font-size': `1.1875rem`,
                'line-height': `1.875rem`,
              });

              expect(baseline(`19px`)).toEqual({
                'font-size': `1.1875rem`,
                'line-height': `1.875rem`,
              });

              expect(baseline(`6px`)).toEqual({
                'font-size': `0.375rem`,
                'line-height': `0.625rem`,
              });
            });
          });
        });
      });

      describe(`with param 'lines'`, () => {
        describe(`invalid value`, () => {
          it(`throws`, () => {
            expect(() => baseline(`x`)).toThrowError(
              `The values supplied were invalid: Wasn't a valid Number and Wasn't number with unit: 'px'`
            );
          });
        });

        describe(`valid value`, () => {
          it(`returns the correct line-height and font-size`, () => {
            expect(baseline(16, 3)).toEqual({
              'font-size': `1rem`,
              'line-height': `3.75rem`,
            });

            expect(baseline(8, 1.5)).toEqual({
              'font-size': `0.5rem`,
              'line-height': `1.875rem`,
            });
          });
        });
      });
    });

    describe(`with custom 'rootFontSize'`, () => {
      const baseline = rhythm.configure({ rootFontSize: 10 });

      it(`returns the correct line-height and font-size`, () => {
        expect(baseline(10)).toEqual({
          'font-size': `1rem`,
          'line-height': `2rem`, // 1 line
        });

        expect(baseline(8)).toEqual({
          'font-size': `0.8rem`,
          'line-height': `1rem`, // 0.5 lines
        });

        expect(baseline(18)).toEqual({
          'font-size': `1.8rem`,
          'line-height': `2rem`, // 1 line
        });

        expect(baseline(20)).toEqual({
          'font-size': `2rem`,
          'line-height': `3rem`,
        });
      });
    });

    describe(`with custom 'baselineHeight'`, () => {
      const baseline = rhythm.configure({ baselineHeight: 20 });

      it(`returns the correct line-height and font-size`, () => {
        expect(baseline(16)).toEqual({
          'font-size': `1rem`,
          'line-height': `1.25rem`, // 1 line
        });

        expect(baseline(18)).toEqual({
          'font-size': `1.125rem`,
          'line-height': `1.25rem`, // 1 line
        });

        expect(baseline(8)).toEqual({
          'font-size': `0.5rem`,
          'line-height': `0.625rem`, // 0.5 lines
        });
      });
    });

    describe(`with custom 'renderUnit'`, () => {
      describe(`px`, () => {
        const baseline = rhythm.configure({ renderUnit: `px` });

        it(`returns the correct line-height and font-size`, () => {
          expect(baseline(16)).toEqual({
            'font-size': `16px`,
            'line-height': `20px`, // 1 line
          });

          expect(baseline(18)).toEqual({
            'font-size': `18px`,
            'line-height': `20px`, // 1 line
          });

          expect(baseline(8)).toEqual({
            'font-size': `8px`,
            'line-height': `10px`, // 0.5 lines
          });
        });
      });

      describe(`em`, () => {
        const baseline = rhythm.configure({ renderUnit: `em` });

        it(`returns the correct line-height and font-size`, () => {
          expect(baseline(16)).toEqual({
            'font-size': `1em`,
            'line-height': `1.25em`, // 1 line
          });

          expect(baseline(18)).toEqual({
            'font-size': `1.125em`,
            'line-height': `1.25em`, // 1 line
          });

          expect(baseline(8)).toEqual({
            'font-size': `0.5em`,
            'line-height': `0.625em`, // 0.5 lines
          });
        });
      });
    });

    describe(`with 'allowHalfLines' set to 'false'`, () => {
      const baseline = rhythm.configure({ allowHalfLines: false });

      it(`returns the correct line-height and font-size`, () => {
        expect(baseline(16)).toEqual({
          'font-size': `1rem`,
          'line-height': `1.25rem`, // 1 line
        });

        expect(baseline(18)).toEqual({
          'font-size': `1.125rem`,
          'line-height': `1.25rem`, // 1 line
        });

        expect(baseline(8)).toEqual({
          'font-size': `0.5rem`,
          'line-height': `1.25rem`, // 1 line
        });

        expect(baseline(20)).toEqual({
          'font-size': `1.25rem`,
          'line-height': `2.5rem`, // 2 lines
        });
      });
    });

    describe(`with custom 'minLeading'`, () => {
      const baseline = rhythm.configure({ minLeading: 6 });

      it(`returns the correct line-height and font-size`, () => {
        expect(baseline(16)).toEqual({
          'font-size': `1rem`,
          'line-height': `1.875rem`, // 1.5 lines
        });

        expect(baseline(8)).toEqual({
          'font-size': `0.5rem`,
          'line-height': `1.25rem`, // 1 line
        });

        expect(baseline(14)).toEqual({
          'font-size': `0.875rem`,
          'line-height': `1.25rem`, // Two lines
        });
      });
    });
  });
});
