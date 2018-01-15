import { baselineOffsetAtFontSize } from '../math';

export default (fontSize, baselineOffset, toRenderUnit) => ({
  position: `relative`,
  top: toRenderUnit(baselineOffsetAtFontSize(fontSize, baselineOffset)),
});
