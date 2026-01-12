import React from "react";

export function useTimerKuis(
    questionId: string,
    initialSeconds: number,
    shouldStop: boolean, // ✨ Parameter baru untuk stop timer
    onTimeUp?: (waktuPengerjaanDetik: number) => void
) {
    const [timeLeft, setTimeLeft] = React.useState(initialSeconds);
    const [waktuPengerjaanDetik, setWaktuPengerjaanDetik] = React.useState(0);

    // Kita simpan timestamp mulai agar perhitungan akurat (tidak drift)
    const startTimeRef = React.useRef<number>(Date.now());
    // Ref untuk menyimpan sisa waktu saat di-pause/stop
    const savedElapsedRef = React.useRef<number>(0);
    const hasSubmittedRef = React.useRef(false);

    // 🔁 RESET SAAT GANTI SOAL
    React.useEffect(() => {
        setTimeLeft(initialSeconds);
        setWaktuPengerjaanDetik(0);
        startTimeRef.current = Date.now();
        savedElapsedRef.current = 0;
        hasSubmittedRef.current = false;
    }, [questionId, initialSeconds]);

    // ⏱️ LOGIC TIMER (Single Interval)
    React.useEffect(() => {
        // Jika harus berhenti (misal lagi submit), jangan jalankan interval
        if (shouldStop || hasSubmittedRef.current) return;

        // Reset start time based on current execution to handle resuming correctly (optional logic)
        // Tapi untuk kuis biasanya "Stop" = "Freeze".
        // Logic di bawah menggunakan selisih waktu real-time.

        const interval = setInterval(() => {
            const now = Date.now();
            // Hitung berapa detik berlalu sejak soal dimulai
            const totalElapsed = Math.floor((now - startTimeRef.current) / 1000);

            // Hitung sisa waktu
            const currentRemaining = initialSeconds - totalElapsed;
            const currentElapsed = totalElapsed;

            if (currentRemaining <= 0) {
                // WAKTU HABIS
                setTimeLeft(0);
                setWaktuPengerjaanDetik(initialSeconds); // Elapsed mentok di max waktu
                clearInterval(interval);

                if (!hasSubmittedRef.current && onTimeUp) {
                    hasSubmittedRef.current = true;
                    onTimeUp(initialSeconds);
                }
            } else {
                // WAKTU BERJALAN
                setTimeLeft(currentRemaining);
                setWaktuPengerjaanDetik(currentElapsed);
            }
        }, 1000); // Check setiap 1 detik

        // Cleanup
        return () => clearInterval(interval);
    }, [initialSeconds, shouldStop, onTimeUp, questionId]); // Dependency updated

    return {
        timeLeft,
        waktuPengerjaanDetik,
    };
}