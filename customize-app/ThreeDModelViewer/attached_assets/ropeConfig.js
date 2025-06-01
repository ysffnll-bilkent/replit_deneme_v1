// Dynamic Rope (Physics Rope) için tüm fizik ve görsel parametreler burada merkezi olarak yönetilir.
// UI paneli eklemek isterseniz bu dosyadaki değerleri güncellemek yeterli olur.

export const ROPE_CONFIG = {
    // Physics
    stiffness: 250,      // Segmentler arası yay sertliği (daha yüksek = daha az esneklik)
    damping: 0.95,       // Segmentler arası sönümleme (daha yüksek = daha az titreşim)
    segCount: 28,        // Segment sayısı (daha fazla = daha pürüzsüz ip, daha az salınım)
    linDamp: 0.93,       // Her segmentin linear damping'i (hareketi yavaşlatır)
    angDamp: 0.93,       // Her segmentin açısal damping'i (dönmeyi yavaşlatır)
    gravity: -9.8,       // Sahne yerçekimi

    // Solver
    solverIterations: 20, // Cannon solver'ın çözüm turu (daha fazla = daha stabil)
    solverTolerance: 0.0005, // Cannon solver toleransı (daha hassas)
    fixedTimeStep: 1 / 120,   // Physics world step time (daha küçük = daha hassas)
    maxSubSteps: 3,         // Physics world max sub steps

    // Segment uyku limiti
    sleepSpeedLimit: 0.03, // Segmentler çok küçük hızda uykuya geçsin (titreşim önlenir)

    // Görsel
    visualSampleCount: 48, // TubeGeometry için CatmullRomCurve3 sample sayısı (daha yumuşak çizgi)
}; 