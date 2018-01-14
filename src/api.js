import {
  reduce,
  compose,
  toPairs,
  find,
  propEq,
  assoc,
  gt,
  curry,
  partial,
} from 'ramda';
import { outputWithUnit } from 'cssjs-units';
import { CONFIG } from './const';
import { throwError, invalidAPIParamsMessage } from './errors';
import { linesForFontsize } from './math';
import validateAPIArgs from './validators/validateAPIArgs';
import numberOrPxNumberToNumber from './transformers/numberOrPxNumberToNumber';
import { isNotZero } from './utils';

const FONT_SIZE_FOR_OFFSET = 16;

const transformConfig = (newConfig, [name, value]) => {
  const configItem = find(propEq(`name`, name), CONFIG);
  const transformedValue = configItem.transformer(value);
  return assoc(name, transformedValue, newConfig);
};

export default config => {
  const {
    minLeading,
    allowHalfLines,
    baselineHeight,
    renderUnit,
    rootFontSize,
    baselineOffset,
  } = compose(reduce(transformConfig, {}), toPairs)(config);

  return (fontSize, lines) => {
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

    const result = {
      'font-size': outputWithChosenUnit(unitlessFontSize),
      'line-height': outputWithChosenUnit(outputLineHeight),
    };

    if (isNotZero(baselineOffset)) {
      const offsetAtFontSize = fontSize / FONT_SIZE_FOR_OFFSET * baselineOffset;
      result.position = `relative`;
      result.top = outputWithChosenUnit(offsetAtFontSize);
    }

    return result;
  };
};
