import { isObject } from 'ramda-adjunct'
import createBaseline from '../index'

describe(`configure()`, () => {
  describe(`with no arguments`, () => {
    it(`doesn't throw`, () => {
      expect(() => createBaseline()).not.toThrow()
    })

    it(`returns an object`, () => {
      expect(isObject(createBaseline())).toBeTruthy()
    })
  })

  describe(`with an invalid argument`, () => {
    it(`throws`, () => {
      const value = `x`
      expect(() => createBaseline(value)).toThrowMultiline(`
        [cssapi-baseline] configure() Arguments included invalid value(s)
          – config: Wasn't Plain Object`)
    })
  })

  describe(`with invalid config param names`, () => {
    it(`throws`, () => {
      const value = { a: 1, b: 2 }

      expect(() => createBaseline(value)).toThrowMultiline(`
      [cssapi-baseline] configure() Arguments included invalid value(s)
        – config: Object included key(s) not on whitelist: ['rootFontSize', 'baselineHeight', 'renderUnit', 'allowHalfLines', 'minLeading', 'baselineOffset', 'baselineOffsetStrategy']`)
    })
  })

  describe(`with invalid config param keys`, () => {
    it(`throws`, () => {
      const value = { rootFontSize: `x`, baselineHeight: `100%` }
      expect(() => createBaseline(value)).toThrowMultiline(`
        [cssapi-baseline] configure() Arguments included invalid value(s)
          – config: Object included invalid value(s)
            – rootFontSize: Wasn't Valid Number or Wasn't number with unit: 'px'
            – baselineHeight: Wasn't Valid Number or Wasn't number with unit: 'px'`)
    })
  })
})
