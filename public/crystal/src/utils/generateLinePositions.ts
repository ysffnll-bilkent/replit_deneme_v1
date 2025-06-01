import * as THREE from "three";

export interface LinePosition {
  x: number;
  y: number;
  z: number;
  occupied: boolean;
  index: number;
}

/**
 * Düz ip üzerinde yan yana pozisyonlar üretir
 * @param length İpin toplam uzunluğu
 * @param totalSlots Toplam slot sayısı
 * @param stoneSize Taş boyutu (çakışmayı önlemek için)
 * @returns LinePosition dizisi
 */
export function generateLinePositions(
  length: number, 
  totalSlots: number = 20,
  stoneSize: number = 0.3
): LinePosition[] {
  const positions: LinePosition[] = [];
  
  // Slot sayısına göre pozisyon hesapla
  for (let i = 0; i < totalSlots; i++) {
    // İp boyunca eşit aralıklı dağıtım
    const t = totalSlots === 1 ? 0.5 : i / (totalSlots - 1);
    const x = (t - 0.5) * length;
    const y = 0; // İp y ekseni üzerinde düz
    const z = 0;
    
    positions.push({
      x,
      y,
      z,
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
export function findNearestEmptyLinePosition(
  positions: LinePosition[], 
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
export function occupyLinePosition(positions: LinePosition[], index: number): void {
  if (index >= 0 && index < positions.length) {
    positions[index].occupied = true;
  }
}

/**
 * Pozisyonu boş olarak işaretle
 * @param positions Pozisyon dizisi
 * @param index Boşaltılacak pozisyon indeksi
 */
export function freeLinePosition(positions: LinePosition[], index: number): void {
  if (index >= 0 && index < positions.length) {
    positions[index].occupied = false;
  }
}