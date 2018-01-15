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
import { CONFIG } from './constraints';

const transformConfig = (newConfig, [name, value]) => {
  const configItem = find(propEq(`name`, name), CONFIG);
  const transformedValue = configItem.transformer(value);
  return assoc(name, transformedValue, newConfig);
};

export default config => {
  const transformedConfig = compose(reduce(transformConfig, {}), toPairs)(
    config
  );

  return (fontSize, lines) => {
    const {
      minLeading,
      allowHalfLines,
      baselineHeight,
      renderUnit,
      rootFontSize,
      baselineOffset,
      baselineOffsetStrategy,
    } = transformedConfig;

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
};
