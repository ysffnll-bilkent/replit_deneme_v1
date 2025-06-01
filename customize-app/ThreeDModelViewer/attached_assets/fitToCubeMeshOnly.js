import * as THREE from 'three';

/**
 * Her GLB'yi kenarı `target` birim olan küpe sığdırır.
 * Yalnızca gerçek Mesh'lerin bbox'ı alınır (Empty düğümler hariç).
 * Pivotu merkeze çeker, worldMatrix günceller.
 *
 * Neden: GLB dosyası hangi ölçekte gelirse gelsin,
 * tüm taş/pendant modelleri sahnede aynı boyutta görünmeli.
 * Sadece gerçek mesh'lerin bbox'ı alınır, pivot merkeze çekilir, uniform scale uygulanır.
 *
 * @param {THREE.Object3D} object - Modelin kök objesi (scene veya group)
 * @param {number} target - Küp kenar uzunluğu (default: 0.3)
 */
export function fitToCubeMeshOnly(object, target = 0.3) {
    // 1) World matrislerini güncelle
    object.updateMatrixWorld(true);

    // 2) Sadece gerçek Mesh'lerden bbox hesapla
    const bbox = new THREE.Box3();
    object.traverse(child => {
        if (child.isMesh) {
            child.geometry.computeBoundingBox();
            const childBox = child.geometry.boundingBox.clone().applyMatrix4(child.matrixWorld);
            bbox.union(childBox);
        }
    });

    // 3) Ölçek katsayısı
    const size = new THREE.Vector3();
    bbox.getSize(size);
    const scale = target / Math.max(size.x, size.y, size.z);

    // 4) Uniform scale uygula
    object.scale.setScalar(scale);
    object.updateMatrixWorld(true);

    // 5) Pivotu merkeze çek
    const center = new THREE.Vector3();
    bbox.getCenter(center);
    object.position.sub(center.multiplyScalar(scale));
} 