import * as THREE from "three";

/**
 * fitToBox
 * Bir THREE.Object3D modelini verilen kutuya (boxSize) fit edecek scale ve position değerini hesaplar.
 * @param {THREE.Object3D} object - Modelin kök objesi (scene)
 * @param {number} boxSize - Fit edilecek kutunun kenar uzunluğu (ör: 2)
 * @returns {{scale: number, position: [number, number, number]}}
 */
export function fitToBox(object, boxSize = 2) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    box.getSize(size);
    const scale = boxSize / Math.max(size.x, size.y, size.z);
    const center = new THREE.Vector3();
    box.getCenter(center);
    const position = [-center.x * scale, -center.y * scale, -center.z * scale];
    return { scale, position };
} 