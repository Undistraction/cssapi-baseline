import { isFunction } from 'ramda-adjunct';
import sinon from 'sinon';

import baseline from '../index';

console.log(`BASELINE`, baseline);

describe.only(`baseline`, () => {
  describe(`configure()`, () => {
    describe(`with no arguments`, () => {
      it(`doesn't throw`, () => {
        expect(() => baseline.configure()).not.toThrow();
      });

      it(`returns a function`, () => {
        expect(isFunction(baseline.configure())).toBeTruthy();
      });
    });

    describe(`with an invalid argument`, () => {
      it(`throws`, () => {
        const value = `x`;
        expect(() => baseline.configure(value)).toThrow(
          `The config object was invalid: Wasn't type: 'Object'`
        );
      });
    });

    describe(`with invalid config param names`, () => {
      it(`throws`, () => {
        const value = { a: 1, b: 2 };
        expect(() => baseline.configure(value)).toThrow(
          `The config object was invalid: Object Invalid: Object included invalid key(s): '[a, b]'`
        );
      });
    });

    describe(`with invalid config param keys`, () => {
      it(`throws`, () => {
        const value = { rootFontSize: `x`, baselineHeight: `100%` };
        expect(() => baseline.configure(value)).toThrow(
          `The config object was invalid: Object Invalid: Object included invalid values(s): Key 'rootFontSize': Wasn't a valid Number and Wasn't number with unit: 'px', Key 'baselineHeight': Wasn't a valid Number and Wasn't number with unit: 'px'`
        );
      });
    });
  });

  describe(`api`, () => {
    describe(`with defaults`, () => {
      const bl = baseline.configure();

      describe(`with param 'font-size'`, () => {
        describe(`invalid value`, () => {
          it(`throws`, () => {
            expect(() => bl(`x`)).toThrowError(
              `The values supplied were invalid: Wasn't a valid Number and Wasn't number with unit: 'px'`
            );
          });

          describe(`valid unitless value`, () => {
            it(`returns the correct line-height and font-size`, () => {
              expect(bl(16)).toEqual({
                'font-size': `1rem`,
                'line-height': `1.25rem`,
              });

              expect(bl(19)).toEqual({
                'font-size': `1.1875rem`,
                'line-height': `1.875rem`,
              });

              expect(bl(19)).toEqual({
                'font-size': `1.1875rem`,
                'line-height': `1.875rem`,
              });

              expect(bl(6)).toEqual({
                'font-size': `0.375rem`,
                'line-height': `0.625rem`,
              });
            });
          });

          describe(`valid united value`, () => {
            it(`returns the correct line-height and font-size`, () => {
              expect(bl(`16px`)).toEqual({
                'font-size': `1rem`,
                'line-height': `1.25rem`,
              });

              expect(bl(`19px`)).toEqual({
                'font-size': `1.1875rem`,
                'line-height': `1.875rem`,
              });

              expect(bl(`19px`)).toEqual({
                'font-size': `1.1875rem`,
                'line-height': `1.875rem`,
              });

              expect(bl(`6px`)).toEqual({
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
            expect(() => bl(`x`)).toThrowError(
              `The values supplied were invalid: Wasn't a valid Number and Wasn't number with unit: 'px'`
            );
          });
        });

        describe(`valid value`, () => {
          it(`returns the correct line-height and font-size`, () => {
            expect(bl(16, 3)).toEqual({
              'font-size': `1rem`,
              'line-height': `3.75rem`,
            });

            expect(bl(8, 1.5)).toEqual({
              'font-size': `0.5rem`,
              'line-height': `1.875rem`,
            });
          });
        });
      });
    });

    describe(`with custom config values`, () => {
      describe(`'rootFontSize'`, () => {
        const bl = baseline.configure({ rootFontSize: 10 });

        it(`returns the correct line-height and font-size`, () => {
          expect(bl(10)).toEqual({
            'font-size': `1rem`,
            'line-height': `2rem`, // 1 line
          });

          expect(bl(8)).toEqual({
            'font-size': `0.8rem`,
            'line-height': `1rem`, // 0.5 lines
          });

          expect(bl(18)).toEqual({
            'font-size': `1.8rem`,
            'line-height': `2rem`, // 1 line
          });

          expect(bl(20)).toEqual({
            'font-size': `2rem`,
            'line-height': `3rem`,
          });
        });
      });

      describe(`'baselineHeight'`, () => {
        const bl = baseline.configure({ baselineHeight: 20 });

        it(`returns the correct line-height and font-size`, () => {
          expect(bl(16)).toEqual({
            'font-size': `1rem`,
            'line-height': `1.25rem`, // 1 line
          });

          expect(bl(18)).toEqual({
            'font-size': `1.125rem`,
            'line-height': `1.25rem`, // 1 line
          });

          expect(bl(8)).toEqual({
            'font-size': `0.5rem`,
            'line-height': `0.625rem`, // 0.5 lines
          });
        });
      });

      describe(`'renderUnit'`, () => {
        describe(`px`, () => {
          const bl = baseline.configure({ renderUnit: `px` });

          it(`returns the correct line-height and font-size`, () => {
            expect(bl(16)).toEqual({
              'font-size': `16px`,
              'line-height': `20px`, // 1 line
            });

            expect(bl(18)).toEqual({
              'font-size': `18px`,
              'line-height': `20px`, // 1 line
            });

            expect(bl(8)).toEqual({
              'font-size': `8px`,
              'line-height': `10px`, // 0.5 lines
            });
          });
        });

        describe(`em`, () => {
          const bl = baseline.configure({ renderUnit: `em` });

          it(`returns the correct line-height and font-size`, () => {
            expect(bl(16)).toEqual({
              'font-size': `1em`,
              'line-height': `1.25em`, // 1 line
            });

            expect(bl(18)).toEqual({
              'font-size': `1.125em`,
              'line-height': `1.25em`, // 1 line
            });

            expect(bl(8)).toEqual({
              'font-size': `0.5em`,
              'line-height': `0.625em`, // 0.5 lines
            });
          });
        });
      });

      describe(`'allowHalfLines' set to 'false'`, () => {
        const bl = baseline.configure({ allowHalfLines: false });

        it(`returns the correct line-height and font-size`, () => {
          expect(bl(16)).toEqual({
            'font-size': `1rem`,
            'line-height': `1.25rem`, // 1 line
          });

          expect(bl(18)).toEqual({
            'font-size': `1.125rem`,
            'line-height': `1.25rem`, // 1 line
          });

          expect(bl(8)).toEqual({
            'font-size': `0.5rem`,
            'line-height': `1.25rem`, // 1 line
          });

          expect(bl(20)).toEqual({
            'font-size': `1.25rem`,
            'line-height': `2.5rem`, // 2 lines
          });
        });
      });

      describe(`'minLeading'`, () => {
        const bl = baseline.configure({ minLeading: 6 });

        it(`returns the correct line-height and font-size`, () => {
          expect(bl(16)).toEqual({
            'font-size': `1rem`,
            'line-height': `1.875rem`, // 1.5 lines
          });

          expect(bl(8)).toEqual({
            'font-size': `0.5rem`,
            'line-height': `1.25rem`, // 1 line
          });

          expect(bl(14)).toEqual({
            'font-size': `0.875rem`,
            'line-height': `1.25rem`, // Two lines
          });
        });
      });

      describe(`'baselineOffset'`, () => {
        const bl = baseline.configure({ baselineOffset: 2 });

        describe(`using position`, () => {
          it(`returns the correct line-height, font-size, position and top`, () => {
            expect(bl(16)).toEqual({
              'font-size': `1rem`,
              'line-height': `1.25rem`, // 1.5 lines
              position: `relative`,
              top: `0.125rem`, // 2 at 16
            });

            expect(bl(8)).toEqual({
              'font-size': `0.5rem`,
              'line-height': `0.625rem`, // 1 line
              position: `relative`,
              top: `0.0625rem`, // 1 at 16
            });

            expect(bl(32)).toEqual({
              'font-size': `2rem`,
              'line-height': `2.5rem`, // Two lines
              position: `relative`,
              top: `0.25rem`, // 4 at 32
            });
          });
        });
      });

      describe(`'baselineOffsetStrategy'`, () => {
        const baselineOffsetStrategy = sinon.stub().returns({ a: `b` });
        const bl = baseline.configure({
          baselineOffset: 2,
          baselineOffsetStrategy,
        });

        describe(`using position`, () => {
          it(`returns the correct line-height, font-size, position and top`, () => {
            expect(bl(16)).toEqual({
              'font-size': `1rem`,
              'line-height': `1.25rem`, // 1.5 lines
              a: `b`,
            });
            expect(baselineOffsetStrategy.calledOnce).toBeTruthy();
          });
        });
      });
    });
  });
});
