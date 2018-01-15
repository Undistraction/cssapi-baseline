import sinon from 'sinon';
import { offsetWithMargins } from '../../index';

describe(`offsetWithMargins`, () => {
  it(`returns an object with postive top and negative bottom margins`, () => {
    const toRenderUnit = sinon.stub().returns(`1rem`);
    const result = offsetWithMargins(16, 2, toRenderUnit);
    expect(result).toEqual({
      'margin-top': `1rem`,
      'margin-bottom': `-1rem`,
    });
    expect(toRenderUnit.calledWith(2)).toBeTruthy();
  });
});
