/**
 * Üç destek sopasının pozisyonlarını ikizkenar üçgen şeklinde hesaplar
 * @param baseWidth Üçgenin taban genişliği (X ekseni)
 * @param height Üçgenin tepe noktasının Y eksenindeki yüksekliği
 * @returns Üç destek sopasının pozisyonları
 */
export function generateTriangleSupports(
  baseWidth: number = 3, 
  height: number = 2
): Array<{ x: number; y: number; z: number; name: string }> {
  return [
    {
      x: -baseWidth / 2,
      y: 0,
      z: 0,
      name: "leftSupport"
    },
    {
      x: baseWidth / 2,
      y: 0,
      z: 0,
      name: "rightSupport"
    },
    {
      x: 0,
      y: height,
      z: 0,
      name: "topSupport"
    }
  ];
}

/**
 * Dinamik ipin ana pozisyonlarını hesaplar (destekler arası)
 * @param supports Destek pozisyonları
 * @param segments İp segment sayısı
 * @returns İp üzerindeki pozisyon noktaları
 */
export function generateRopePositions(
  supports: Array<{ x: number; y: number; z: number }>,
  segments: number = 20
): Array<{ x: number; y: number; z: number; occupied: boolean; index: number }> {
  const positions: Array<{ x: number; y: number; z: number; occupied: boolean; index: number }> = [];
  
  if (supports.length < 3) return positions;
  
  const [left, right, top] = supports;
  
  // Sol destek → Tepe destek arası (segment / 2)
  for (let i = 0; i < segments / 2; i++) {
    const t = i / (segments / 2 - 1);
    const x = left.x + (top.x - left.x) * t;
    const y = left.y + (top.y - left.y) * t;
    const z = left.z + (top.z - left.z) * t;
    
    positions.push({ x, y, z, occupied: false, index: i });
  }
  
  // Tepe destek → Sağ destek arası (segment / 2)
  for (let i = 0; i < segments / 2; i++) {
    const t = i / (segments / 2 - 1);
    const x = top.x + (right.x - top.x) * t;
    const y = top.y + (right.y - top.y) * t;
    const z = top.z + (right.z - top.z) * t;
    
    positions.push({ x, y, z, occupied: false, index: segments / 2 + i });
  }
  
  return positions;
}

/**
 * Bırakılan noktaya en yakın boş pozisyonu bulur
 * @param positions İp pozisyonları
 * @param dropPoint Bırakılan nokta [x, y, z]
 * @returns En yakın boş pozisyonun indeksi, yoksa -1
 */
export function findNearestEmptyRopePosition(
  positions: Array<{ x: number; y: number; z: number; occupied: boolean; index: number }>, 
  dropPoint: [number, number, number]
): number {
  let nearestIndex = -1;
  let nearestDistance = Infinity;
  
  const [dropX, dropY, dropZ] = dropPoint;
  
  for (const position of positions) {
    if (position.occupied) continue;
    
    const distance = Math.sqrt(
      Math.pow(position.x - dropX, 2) +
      Math.pow(position.y - dropY, 2) +
      Math.pow(position.z - dropZ, 2)
    );
    
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestIndex = position.index;
    }
  }
  
  return nearestIndex;
}

/**
 * Uç model pozisyonlarını hesaplar (desteklerin taban ortası)
 * @param supports Destek pozisyonları
 * @returns Uç modellerin yerleştirileceği pozisyonlar
 */
export function generateEndModelPositions(
  supports: Array<{ x: number; y: number; z: number }>
): Array<{ x: number; y: number; z: number; name: string }> {
  if (supports.length < 3) return [];
  
  const [left, right] = supports;
  
  // Sol ve sağ desteklerin taban merkezine uç modeller
  return [
    {
      x: left.x,
      y: left.y - 0.1, // Hafif aşağıda
      z: left.z,
      name: "leftEnd"
    },
    {
      x: right.x,
      y: right.y - 0.1, // Hafif aşağıda
      z: right.z,
      name: "rightEnd"
    }
  ];
}