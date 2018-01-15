import sinon from 'sinon';
import { offsetWithTransform } from '../../index';

describe(`offsetWithTransform`, () => {
  it(`returns an object with transform: translate`, () => {
    const toRenderUnit = sinon.stub().returns(`1rem`);
    const result = offsetWithTransform(16, 2, toRenderUnit);
    expect(result).toEqual({
      transform: `translate(0, 1rem)`,
    });
    expect(toRenderUnit.calledWith(2)).toBeTruthy();
  });
});
