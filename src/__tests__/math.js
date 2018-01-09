import { linesForFontsize } from '../math';

describe(`linesForFontsize()`, () => {
  describe(`using full lines`, () => {
    describe(`with no minLeading`, () => {
      it(`calculates the correct number of lines`, () => {
        const result1 = linesForFontsize(0, false, 20, 10);
        expect(result1).toEqual(1);
        const result2 = linesForFontsize(0, false, 20, 20);
        expect(result2).toEqual(1);
        const result3 = linesForFontsize(0, false, 20, 30);
        expect(result3).toEqual(2);
      });
    });

    describe(`with minLeading`, () => {
      it(`calculates the correct number of lines`, () => {
        const result1 = linesForFontsize(2, false, 20, 10);
        expect(result1).toEqual(1);
        const result2 = linesForFontsize(2, false, 20, 20);
        expect(result2).toEqual(2);
        const result3 = linesForFontsize(2, false, 20, 30);
        expect(result3).toEqual(2);
        const result4 = linesForFontsize(2, false, 21, 20);
        expect(result4).toEqual(2);
      });
    });
  });

  describe(`using half lines`, () => {
    describe(`with no minLeading`, () => {
      it(`calculates the correct number of lines`, () => {
        const result1 = linesForFontsize(0, true, 20, 10);
        expect(result1).toEqual(0.5);
        const result2 = linesForFontsize(0, true, 20, 20);
        expect(result2).toEqual(1);
        const result3 = linesForFontsize(0, true, 20, 30);
        expect(result3).toEqual(1.5);
        const result4 = linesForFontsize(2, true, 20, 21);
        expect(result4).toEqual(1.5);
      });
    });

    describe(`with minLeading`, () => {
      it(`calculates the correct number of lines`, () => {
        const result1 = linesForFontsize(2, true, 20, 10);
        expect(result1).toEqual(1);
        const result2 = linesForFontsize(2, true, 20, 20);
        expect(result2).toEqual(1.5);
        const result3 = linesForFontsize(2, true, 20, 30);
        expect(result3).toEqual(2);
        const result4 = linesForFontsize(2, true, 20, 21);
        expect(result4).toEqual(1.5);
      });
    });
  });
});
