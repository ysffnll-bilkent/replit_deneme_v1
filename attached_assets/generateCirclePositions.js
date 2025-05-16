// generateCirclePositions.js
// Places objects around a circle with zero-edge-gap using per-object radii
export default function generateCirclePositions(radii) {
  const N = radii.length;
  // Binary search for R such that sum of angles = 2π
  const angleSum = (R) => radii.reduce((sum, r_i, i) => {
    const r_j = radii[(i + 1) % N];
    const ratio = (r_i + r_j) / (2 * R);
    return sum + 2 * Math.asin(Math.min(Math.max(ratio, -1), 1));
  }, 0);
  // R must be >= max(r_i + r_{i+1})/2
  const minR = Math.max(...radii.map((r, i) => (r + radii[(i + 1) % N]) / 2));
  let low = minR, high = minR * 10 + 100;
  for (let iter = 0; iter < 50; iter++) {
    const mid = (low + high) / 2;
    if (angleSum(mid) > 2 * Math.PI) low = mid;
    else high = mid;
  }
  const R = (low + high) / 2;
  // Compute cumulative angles
  const angles = [0];
  for (let i = 1; i < N; i++) {
    const prev = angles[i - 1];
    const r_prev = radii[i - 1];
    const r_cur = radii[i];
    const delta = 2 * Math.asin((r_prev + r_cur) / (2 * R));
    angles.push(prev + delta);
  }
  return angles.map(theta => [R * Math.cos(theta), R * Math.sin(theta), 0]);
}