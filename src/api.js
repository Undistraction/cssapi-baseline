import {
  reduce,
  compose,
  toPairs,
  find,
  propEq,
  assoc,
  partial,
  merge,
} from 'ramda';
import { outputWithUnit } from 'cssjs-units';
import { throwError, invalidAPIParamsMessage } from './errors';
import { linesForFontsize } from './math';
import validateAPIArgs from './validators/validateAPIArgs';
import numberOrPxNumberToNumber from './transformers/numberOrPxNumberToNumber';
import { isNotZero } from './utils';

export default config => (fontSize, lines) => {
  const {
    minLeading,
    allowHalfLines,
    baselineHeight,
    renderUnit,
    rootFontSize,
    baselineOffset,
    baselineOffsetStrategy,
  } = config;

  validateAPIArgs(fontSize, lines).orElse(value => {
    throwError(invalidAPIParamsMessage(value));
  });

  const unitlessFontSize = numberOrPxNumberToNumber(fontSize);

  const outputLines =
    lines ||
    linesForFontsize(
      minLeading,
      allowHalfLines,
      baselineHeight,
      unitlessFontSize
    );

  const outputWithChosenUnit = partial(outputWithUnit, [
    renderUnit,
    rootFontSize,
  ]);

  const outputLineHeight = outputLines * baselineHeight;

  const styles = {
    'font-size': outputWithChosenUnit(unitlessFontSize),
    'line-height': outputWithChosenUnit(outputLineHeight),
  };

  return isNotZero(baselineOffset)
    ? merge(
        styles,
        baselineOffsetStrategy(fontSize, baselineOffset, outputWithChosenUnit)
      )
    : styles;
};
