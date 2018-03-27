import { map } from 'ramda'
import sinon from 'sinon'
import createBaseline from '../index'
import { notNumberOrUndefined } from './testHelpers/fixtures'

describe(`api`, () => {
  describe(`with defaults`, () => {
    const baseline = createBaseline()

    describe(`with no args`, () => {
      expect(() => baseline()).toThrowMultiline(`
        [cssapi-baseline] api() Arguments missing required key(s): ['fontSize']`)
    })

    describe(`params`, () => {
      describe(`'fontSize'`, () => {
        describe(`invalid value`, () => {
          it(`throws`, () => {
            map(invalidValue => {
              expect(() => baseline(invalidValue)).toThrowMultiline(`
                [cssapi-baseline] api() Arguments included invalid value(s)
                  – fontSize: Wasn't Valid Number or Wasn't number with unit: 'px'`)
            })(notNumberOrUndefined)
          })

          describe(`valid unitless value`, () => {
            it(`returns the correct 'lineHeight' and 'fontSize'`, () => {
              expect(baseline(16)).toEqual({
                fontSize: `1rem`,
                lineHeight: `1.25rem`,
              })

              expect(baseline(19)).toEqual({
                fontSize: `1.1875rem`,
                lineHeight: `1.875rem`,
              })

              expect(baseline(19)).toEqual({
                fontSize: `1.1875rem`,
                lineHeight: `1.875rem`,
              })

              expect(baseline(6)).toEqual({
                fontSize: `0.375rem`,
                lineHeight: `0.625rem`,
              })
            })
          })

          describe(`valid united value`, () => {
            it(`returns the correct 'lineHeight' and 'fontSize'`, () => {
              expect(baseline(`16px`)).toEqual({
                fontSize: `1rem`,
                lineHeight: `1.25rem`,
              })

              expect(baseline(`19px`)).toEqual({
                fontSize: `1.1875rem`,
                lineHeight: `1.875rem`,
              })

              expect(baseline(`19px`)).toEqual({
                fontSize: `1.1875rem`,
                lineHeight: `1.875rem`,
              })

              expect(baseline(`6px`)).toEqual({
                fontSize: `0.375rem`,
                lineHeight: `0.625rem`,
              })
            })
          })
        })
      })

      describe(`'lines'`, () => {
        describe(`invalid value`, () => {
          map(invalidValue => {
            expect(() => baseline(16, invalidValue)).toThrowMultiline(`
            [cssapi-baseline] api() Arguments included invalid value(s)
              – lines: Wasn't Valid Number`)
          })(notNumberOrUndefined)
        })

        describe(`valid value`, () => {
          it(`returns the correct 'lineHeight' and 'fontSize'`, () => {
            expect(baseline(16, 3)).toEqual({
              fontSize: `1rem`,
              lineHeight: `3.75rem`,
            })

            expect(baseline(8, 1.5)).toEqual({
              fontSize: `0.5rem`,
              lineHeight: `1.875rem`,
            })
          })
        })
      })
    })
  })

  describe(`with custom config values`, () => {
    describe(`params`, () => {
      describe(`'rootFontSize'`, () => {
        const baseline = createBaseline({ rootFontSize: 10 })

        it(`returns the correct 'lineHeight' and 'fontSize'`, () => {
          expect(baseline(10)).toEqual({
            fontSize: `1rem`,
            lineHeight: `2rem`, // 1 line
          })

          expect(baseline(8)).toEqual({
            fontSize: `0.8rem`,
            lineHeight: `1rem`, // 0.5 lines
          })

          expect(baseline(18)).toEqual({
            fontSize: `1.8rem`,
            lineHeight: `2rem`, // 1 line
          })

          expect(baseline(20)).toEqual({
            fontSize: `2rem`,
            lineHeight: `3rem`,
          })
        })
      })

      describe(`'baselineHeight'`, () => {
        const baseline = createBaseline({ baselineHeight: 20 })

        it(`returns the correct 'lineHeight' and 'fontSize'`, () => {
          expect(baseline(16)).toEqual({
            fontSize: `1rem`,
            lineHeight: `1.25rem`, // 1 line
          })

          expect(baseline(18)).toEqual({
            fontSize: `1.125rem`,
            lineHeight: `1.25rem`, // 1 line
          })

          expect(baseline(8)).toEqual({
            fontSize: `0.5rem`,
            lineHeight: `0.625rem`, // 0.5 lines
          })
        })
      })

      describe(`'renderUnit'`, () => {
        describe(`px`, () => {
          const baseline = createBaseline({ renderUnit: `px` })

          it(`returns the correct 'lineHeight' and 'fontSize'`, () => {
            expect(baseline(16)).toEqual({
              fontSize: `16px`,
              lineHeight: `20px`, // 1 line
            })

            expect(baseline(18)).toEqual({
              fontSize: `18px`,
              lineHeight: `20px`, // 1 line
            })

            expect(baseline(8)).toEqual({
              fontSize: `8px`,
              lineHeight: `10px`, // 0.5 lines
            })
          })
        })

        describe(`em`, () => {
          const baseline = createBaseline({ renderUnit: `em` })

          it(`returns the correct 'lineHeight' and 'fontSize'`, () => {
            expect(baseline(16)).toEqual({
              fontSize: `1em`,
              lineHeight: `1.25em`, // 1 line
            })

            expect(baseline(18)).toEqual({
              fontSize: `1.125em`,
              lineHeight: `1.25em`, // 1 line
            })

            expect(baseline(8)).toEqual({
              fontSize: `0.5em`,
              lineHeight: `0.625em`, // 0.5 lines
            })
          })
        })
      })

      describe(`'allowHalfLines' set to 'false'`, () => {
        const baseline = createBaseline({ allowHalfLines: false })

        it(`returns the correct 'lineHeight' and 'fontSize'`, () => {
          expect(baseline(16)).toEqual({
            fontSize: `1rem`,
            lineHeight: `1.25rem`, // 1 line
          })

          expect(baseline(18)).toEqual({
            fontSize: `1.125rem`,
            lineHeight: `1.25rem`, // 1 line
          })

          expect(baseline(8)).toEqual({
            fontSize: `0.5rem`,
            lineHeight: `1.25rem`, // 1 line
          })

          expect(baseline(20)).toEqual({
            fontSize: `1.25rem`,
            lineHeight: `2.5rem`, // 2 lines
          })
        })
      })

      describe(`'minLeading'`, () => {
        const baseline = createBaseline({ minLeading: 6 })

        it(`returns the correct 'lineHeight' and 'fontSize'`, () => {
          expect(baseline(16)).toEqual({
            fontSize: `1rem`,
            lineHeight: `1.875rem`, // 1.5 lines
          })

          expect(baseline(8)).toEqual({
            fontSize: `0.5rem`,
            lineHeight: `1.25rem`, // 1 line
          })

          expect(baseline(14)).toEqual({
            fontSize: `0.875rem`,
            lineHeight: `1.25rem`, // Two lines
          })
        })
      })

      describe(`'baselineOffset'`, () => {
        const baseline = createBaseline({ baselineOffset: 2 })

        describe(`using position`, () => {
          it(`returns the correct 'lineHeight', 'fontSize', position and top`, () => {
            expect(baseline(16)).toEqual({
              fontSize: `1rem`,
              lineHeight: `1.25rem`, // 1.5 lines
              position: `relative`,
              top: `0.125rem`, // 2 at 16
            })

            expect(baseline(8)).toEqual({
              fontSize: `0.5rem`,
              lineHeight: `0.625rem`, // 1 line
              position: `relative`,
              top: `0.0625rem`, // 1 at 16
            })

            expect(baseline(32)).toEqual({
              fontSize: `2rem`,
              lineHeight: `2.5rem`, // Two lines
              position: `relative`,
              top: `0.25rem`, // 4 at 32
            })
          })
        })
      })

      describe(`'baselineOffsetStrategy'`, () => {
        const baselineOffsetStrategy = sinon.stub().returns({ a: `b` })
        const baseline = createBaseline({
          baselineOffset: 2,
          baselineOffsetStrategy,
        })

        describe(`using position`, () => {
          it(`returns the correct 'lineHeight', 'fontSize', position and top`, () => {
            expect(baseline(16)).toEqual({
              fontSize: `1rem`,
              lineHeight: `1.25rem`, // 1.5 lines
              a: `b`,
            })
            expect(baselineOffsetStrategy.calledOnce).toBeTruthy()
          })
        })
      })
    })
  })
})
