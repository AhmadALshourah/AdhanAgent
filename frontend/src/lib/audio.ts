/**
 * Gentle ascending bell sound using Web Audio API.
 * No external audio file needed — works offline.
 */
export function playAdhanBell(): void {
  try {
    const ctx = new AudioContext();

    // Three overlapping tones: root, fifth, octave
    const freqs = [440, 660, 880];
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.value = freq;

      const start = ctx.currentTime + i * 0.25;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.18 - i * 0.04, start + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 2.5);

      osc.start(start);
      osc.stop(start + 2.5);
    });
  } catch {
    /* AudioContext not supported or blocked */
  }
}
