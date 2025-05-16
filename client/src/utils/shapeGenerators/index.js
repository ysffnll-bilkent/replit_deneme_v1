import { getPositionsCircle } from './circle';
import { getPositionsRope } from './rope';

export const generators = {
    circle: getPositionsCircle,
    rope: getPositionsRope,
    // More shapes can be added here in the future: grid, spiral, etc.
};