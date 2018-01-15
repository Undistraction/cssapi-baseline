import { baselineOffsetAtFontSize } from '../math';

export default (fontSize, baselineOffset, toRenderUnit) => ({
  transform: `translate(0, ${toRenderUnit(
    baselineOffsetAtFontSize(fontSize, baselineOffset)
  )})`,
});
