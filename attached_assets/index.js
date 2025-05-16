import { getPositionsCircle } from './circle';
import { getPositionsRope } from './rope';

export const generators = {
    circle: getPositionsCircle,
    rope: getPositionsRope,
    // ileride ekle: grid, spiral, vb.
};
