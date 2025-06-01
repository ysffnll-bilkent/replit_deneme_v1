/**
 * İki nokta arasında hafif sarkmış rope segment pozisyonlarını hesaplar
 * @param start Başlangıç noktası [x, y, z]
 * @param end Bitiş noktası [x, y, z]
 * @param segmentCount Segment sayısı
 * @returns Segment pozisyonları dizisi
 */
export function generateRopeSegments(
  start: [number, number, number],
  end: [number, number, number],
  segmentCount: number
): Array<{ position: [number, number, number]; index: number }> {
  const segments: Array<{ position: [number, number, number]; index: number }> = [];
  const [sx, sy, sz] = start;
  const [ex, ey, ez] = end;
  
  // İki nokta arası mesafe
  const distance = Math.sqrt(
    Math.pow(ex - sx, 2) + 
    Math.pow(ey - sy, 2) + 
    Math.pow(ez - sz, 2)
  );
  
  // Sarkma miktarı (mesafeye orantılı)
  const sagAmount = distance * 0.1; // %10 sarkma
  
  for (let i = 0; i <= segmentCount; i++) {
    const t = i / segmentCount;
    
    // Doğrusal interpolasyon
    const x = sx + (ex - sx) * t;
    const y = sy + (ey - sy) * t;
    const z = sz + (ez - sz) * t;
    
    // Sarkma efekti (sin eğrisi ile)
    const sagOffset = Math.sin(Math.PI * t) * sagAmount;
    const finalY = y - sagOffset;
    
    segments.push({ 
      position: [x, finalY, z],
      index: i
    });
  }
  
  return segments;
}

/**
 * İp üzerindeki en yakın segment indeksini bulur
 * @param segments Segment dizisi
 * @param worldPosition Dünya koordinatı [x, y, z]
 * @returns En yakın segment indeksi
 */
export function findNearestSegment(
  segments: Array<{ position: [number, number, number]; index: number }>,
  worldPosition: [number, number, number]
): number {
  let nearestIndex = 0;
  let nearestDistance = Infinity;
  
  const [wx, wy, wz] = worldPosition;
  
  segments.forEach((segment, index) => {
    const [sx, sy, sz] = segment.position;
    const distance = Math.sqrt(
      Math.pow(sx - wx, 2) + 
      Math.pow(sy - wy, 2) + 
      Math.pow(sz - wz, 2)
    );
    
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestIndex = index;
    }
  });
  
  return nearestIndex;
}