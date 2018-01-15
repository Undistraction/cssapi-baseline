import sinon from 'sinon';
import { offsetWithPosition } from '../../index';

describe(`offsetWithPosition`, () => {
  it(`returns an object with position of relative and an offset top`, () => {
    const toRenderUnit = sinon.stub().returns(`1rem`);
    const result = offsetWithPosition(16, 2, toRenderUnit);
    expect(result).toEqual({
      position: `relative`,
      top: `1rem`,
    });
    expect(toRenderUnit.calledWith(2)).toBeTruthy();
  });
});
