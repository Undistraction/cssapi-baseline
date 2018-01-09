const linesForFontSizeAct = (minLeading, lineHeight, fontSize) => {
  const lines = Math.ceil(fontSize / lineHeight);
  const linesWithLeading =
    lines * lineHeight - fontSize >= minLeading ? lines : lines + 1;
  return linesWithLeading;
};

// eslint-disable-next-line import/prefer-default-export
export const linesForFontsize = (
  minLeading,
  allowHalfLines,
  baselineHeight,
  fontSize
) =>
  allowHalfLines
    ? linesForFontSizeAct(minLeading, baselineHeight * 0.5, fontSize) * 0.5
    : linesForFontSizeAct(minLeading, baselineHeight, fontSize);
