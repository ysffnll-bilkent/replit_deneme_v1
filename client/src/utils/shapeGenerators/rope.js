/**
 * Generates positions for stones along a rope (linear control points) with zero gaps
 * @param {{
 *   radii: number[],
 *   controlPoints?: [number, number][]   // [[x0,y0], [x1,y1]] format
 * }} params
 * @returns {[number, number, number][]}
 */
export function getPositionsRope({ radii, controlPoints = [[-1, 0], [1, 0]] }) {
    const N = radii.length;
    // Simple linear interpolation
    return Array.from({ length: N }, (_, i) => {
        const t = N > 1 ? i / (N - 1) : 0;
        const [x0, y0] = controlPoints[0];
        const [x1, y1] = controlPoints[1];
        return [
            x0 + (x1 - x0) * t,
            y0 + (y1 - y0) * t,
            0
        ];
    });
}