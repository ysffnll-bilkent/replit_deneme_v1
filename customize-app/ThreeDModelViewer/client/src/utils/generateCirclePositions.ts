import * as THREE from "three";

export interface CirclePosition {
  x: number;
  y: number;
  z: number;
  angle: number;
  occupied: boolean;
  index: number;
}

/**
 * Çember üzerinde eşit açı aralıklı pozisyonlar üretir
 * @param radius Çemberin yarıçapı
 * @param maxPositions Maksimum pozisyon sayısı
 * @returns CirclePosition dizisi
 */
export function generateCirclePositions(radius: number, maxPositions: number = 32): CirclePosition[] {
  const positions: CirclePosition[] = [];
  
  for (let i = 0; i < maxPositions; i++) {
    const angle = (i / maxPositions) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const z = 0;
    
    positions.push({
      x,
      y,
      z,
      angle,
      occupied: false,
      index: i
    });
  }
  
  return positions;
}

/**
 * Bırakılan noktaya en yakın boş pozisyonu bulur
 * @param positions Pozisyon dizisi
 * @param dropPoint Bırakılan nokta [x, y, z]
 * @returns En yakın boş pozisyonun indeksi, yoksa -1
 */
export function findNearestEmptyPosition(
  positions: CirclePosition[], 
  dropPoint: [number, number, number]
): number {
  let nearestIndex = -1;
  let nearestDistance = Infinity;
  
  const dropVector = new THREE.Vector3(dropPoint[0], dropPoint[1], dropPoint[2]);
  
  for (let i = 0; i < positions.length; i++) {
    const position = positions[i];
    
    // Sadece boş pozisyonları kontrol et
    if (position.occupied) continue;
    
    const posVector = new THREE.Vector3(position.x, position.y, position.z);
    const distance = dropVector.distanceTo(posVector);
    
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestIndex = i;
    }
  }
  
  return nearestIndex;
}

/**
 * Pozisyonu işgal edilmiş olarak işaretle
 * @param positions Pozisyon dizisi
 * @param index İşaretlenecek pozisyon indeksi
 */
export function occupyPosition(positions: CirclePosition[], index: number): void {
  if (index >= 0 && index < positions.length) {
    positions[index].occupied = true;
  }
}

/**
 * Pozisyonu boş olarak işaretle
 * @param positions Pozisyon dizisi
 * @param index Boşaltılacak pozisyon indeksi
 */
export function freePosition(positions: CirclePosition[], index: number): void {
  if (index >= 0 && index < positions.length) {
    positions[index].occupied = false;
  }
}