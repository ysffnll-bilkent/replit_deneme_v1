import * as THREE from "three";

/**
 * fitToCube (mesh-only)
 * Bir THREE.Object3D modelini, sadece gerçek mesh'leri hesaba katarak
 * verilen targetSize kenar uzunluğunda birim küpe orantılı şekilde sığdırır.
 * Modelin scale'ını ayarlar ve merkezi orijine taşır.
 *
 * @param {THREE.Object3D} object - Modelin kök objesi (scene veya group)
 * @param {number} targetSize - Küpün kenar uzunluğu (default: 0.3)
 */
export function fitToCube(object, targetSize = 0.3) {
    // 1) World matrixleri güncelle
    object.updateMatrixWorld(true);

    // 2) Yalnızca gerçek Mesh'lerden bbox hesapla
    const bbox = new THREE.Box3();
    object.traverse((child) => {
        if (child.isMesh) {
            child.geometry.computeBoundingBox();
            const childBox = child.geometry.boundingBox.clone().applyMatrix4(child.matrixWorld);
            bbox.union(childBox);
        }
    });

    // 3) Ölçeği hesapla
    const size = new THREE.Vector3();
    bbox.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = targetSize / maxDim;

    object.scale.setScalar(scale);
    object.updateMatrixWorld(true);

    // 4) Objeyi origin'e merkezle
    // (güncel bbox ile merkez al)
    const center = new THREE.Vector3();
    bbox.getCenter(center);
    object.position.sub(center.multiplyScalar(1 / scale));
} 