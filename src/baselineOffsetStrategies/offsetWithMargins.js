import { baselineOffsetAtFontSize } from '../math';

export default (fontSize, baselineOffset, toRenderUnit) => {
  const offset = toRenderUnit(
    baselineOffsetAtFontSize(fontSize, baselineOffset)
  );
  return {
    'margin-top': offset,
    'margin-bottom': `-${offset}`,
  };
};
