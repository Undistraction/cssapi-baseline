import { divide, flip } from 'ramda'
import { FONT_SIZE_FOR_OFFSET } from './const'

const divideBy2 = flip(divide)(2)

const wholeLinesForFontSize = (minLeading, fontSize, baselineHeight) => {
  const lines = Math.ceil(fontSize / baselineHeight)
  const linesWithLeading =
    lines * baselineHeight - fontSize >= minLeading ? lines : lines + 1
  return linesWithLeading
}

const halfLinesForFontSize = (minLeading, fontSize, baselineHeight) =>
  divideBy2(
    wholeLinesForFontSize(minLeading, fontSize, divideBy2(baselineHeight))
  )

export const linesForFontsize = (
  minLeading,
  allowHalfLines,
  baselineHeight,
  fontSize
) =>
  allowHalfLines
    ? halfLinesForFontSize(minLeading, fontSize, baselineHeight)
    : wholeLinesForFontSize(minLeading, fontSize, baselineHeight)

export const baselineOffsetAtFontSize = (fontSize, offset) =>
  fontSize / FONT_SIZE_FOR_OFFSET * offset
