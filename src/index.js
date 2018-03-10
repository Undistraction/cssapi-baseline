import baseline from './baseline'

export default baseline

export {
  default as offsetWithMargins,
} from './baselineOffsetStrategies/offsetWithMargins'

export {
  default as offsetWithPosition,
} from './baselineOffsetStrategies/offsetWithPosition'

export {
  default as offsetWithTransform,
} from './baselineOffsetStrategies/offsetWithTransform'
