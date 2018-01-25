import { partial, merge, defaultTo, multiply, compose } from 'ramda';
import { outputWithUnit } from 'cssapi-units';
import { invalidAPIParamsMessage, throwAPIError } from './errors';
import { linesForFontsize } from './math';
import validateAPIArgs from './validators/validateAPIArgs';
import numberOrPxNumberToNumber from './transformers/numberOrPxNumberToNumber';
import { isNotZero, withoutUndefined } from './utils';

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
    validateAPIArgs(withoutUndefined({ fontSize, lines })).orElse(
      compose(throwAPIError, invalidAPIParamsMessage)
    );

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
