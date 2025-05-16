/**
 * Generates positions for stones around a circle with zero gaps between them
 * @param {{ radii: number[] }} params
 * @returns {[number, number, number][]}
 */
export function getPositionsCircle({ radii }) {
    const N = radii.length;
    const alpha = Math.PI / N;

    // Find the minimum radius
    const minR = Math.max(...radii.map((r, i) => {
        const rNext = radii[(i + 1) % N];
        return (r + rNext) / (2 * Math.sin(alpha));
    }));
    const R = minR;

    // Calculate the angle array
    const angles = radii.reduce((acc, r_i, i) => {
        if (i === 0) return [0];
        const prevAngles = acc;
        const prev = prevAngles[prevAngles.length - 1];
        const rPrev = radii[i - 1];
        const delta = 2 * Math.asin((rPrev + r_i) / (2 * R));
        return [...prevAngles, prev + delta];
    }, []);

    // Generate positions
    return angles.map(theta => [
        R * Math.cos(theta),
        R * Math.sin(theta),
        0
    ]);
}