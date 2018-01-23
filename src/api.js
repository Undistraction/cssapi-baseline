import { partial, merge, defaultTo, multiply } from 'ramda';
import { outputWithUnit } from 'cssjs-units';
import { invalidAPIParamsMessage, throwAPIError } from './errors';
import { linesForFontsize } from './math';
import validateAPIArgs from './validators/validateAPIArgs';
import numberOrPxNumberToNumber from './transformers/numberOrPxNumberToNumber';
import { isNotZero } from './utils';

export default config => {
  const {
    minLeading,
    allowHalfLines,
    baselineHeight,
    renderUnit,
    rootFontSize,
    baselineOffset,
    baselineOffsetStrategy,
  } = config;

  return (fontSize, lines) => {
    validateAPIArgs(fontSize, lines).orElse(value => {
      throwAPIError(invalidAPIParamsMessage(value));
    });

    const unitlessFontSize = numberOrPxNumberToNumber(fontSize);

    const outputLines = defaultTo(
      linesForFontsize(
        minLeading,
        allowHalfLines,
        baselineHeight,
        unitlessFontSize
      )
    )(lines);

    const outputWithChosenUnit = partial(outputWithUnit, [
      renderUnit,
      rootFontSize,
    ]);

    const outputLineHeight = multiply(outputLines, baselineHeight);

    const styles = {
      fontSize: outputWithChosenUnit(unitlessFontSize),
      lineHeight: outputWithChosenUnit(outputLineHeight),
    };

    return isNotZero(baselineOffset)
      ? merge(
          styles,
          baselineOffsetStrategy(fontSize, baselineOffset, outputWithChosenUnit)
        )
      : styles;
  };
};
