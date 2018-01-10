import { reduce, compose, toPairs, find, propEq, assoc } from 'ramda';
import { outputWithUnit } from 'js-css-units';
import { CONFIG } from './const';
import { throwError, invalidAPIParamsMessage } from './errors';
import { linesForFontsize } from './math';
import validateAPIArgs from './validators/validateAPIArgs';
import numberOrPxNumberToNumber from './transformers/numberOrPxNumberToNumber';

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
    validateAPIArgs(fontSize, lines).orElse(value => {
      throwError(invalidAPIParamsMessage(value));
    });

    const unitlessFontSize = numberOrPxNumberToNumber(fontSize);

    const outputLines =
      lines ||
      linesForFontsize(
        transformedConfig.minLeading,
        transformedConfig.allowHalfLines,
        transformedConfig.baselineHeight,
        unitlessFontSize
      );

    const outputLineHeight = outputLines * transformedConfig.baselineHeight;
    return {
      'font-size': outputWithUnit(
        transformedConfig.renderUnit,
        transformedConfig.rootFontSize,
        unitlessFontSize
      ),
      'line-height': outputWithUnit(
        transformedConfig.renderUnit,
        transformedConfig.rootFontSize,
        outputLineHeight
      ),
    };
  };
};
