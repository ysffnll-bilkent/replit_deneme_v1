/**
 * Daire üzerinde sıfır boşluklu yerleşim pozisyonları üretir.
 * @param {{ radii: number[] }} params
 * @returns {[number, number, number][]}
 */
export function getPositionsCircle({ radii }) {
    const N = radii.length;
    const alpha = Math.PI / N;

    // Minimum yarıçapı bul
    const minR = Math.max(...radii.map((r, i) => {
        const rNext = radii[(i + 1) % N];
        return (r + rNext) / (2 * Math.sin(alpha));
    }));
    const R = minR;

    // Açı dizisini hesapla
    const angles = radii.reduce((acc, r_i, i) => {
        if (i === 0) return [0];
        const prevAngles = acc;
        const prev = prevAngles[prevAngles.length - 1];
        const rPrev = radii[i - 1];
        const delta = 2 * Math.asin((rPrev + r_i) / (2 * R));
        return [...prevAngles, prev + delta];
    }, []);

    // Pozisyonları üret
    return angles.map(theta => [
        R * Math.cos(theta),
        R * Math.sin(theta),
        0
    ]);
}
