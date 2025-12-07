// Simple Web Audio API synthesizer for modern UI sounds
// No external assets required

let audioCtx: AudioContext | null = null;

const getContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
};

const playTone = (freq: number, type: OscillatorType, duration: number, startTime: number, vol: number = 0.1) => {
  const ctx = getContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);

  gain.gain.setValueAtTime(vol, startTime);
  gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration);
};

export const playClick = () => {
  const ctx = getContext();
  if (ctx.state === 'suspended') ctx.resume();
  // High tech blip
  const t = ctx.currentTime;
  playTone(800, 'sine', 0.1, t, 0.05);
  playTone(1200, 'sine', 0.05, t + 0.02, 0.03);
};

export const playHover = () => {
  // Very subtle tick
  const ctx = getContext();
  if (ctx.state === 'suspended') ctx.resume();
  playTone(400, 'triangle', 0.05, ctx.currentTime, 0.02);
};

export const playSuccess = () => {
  const ctx = getContext();
  if (ctx.state === 'suspended') ctx.resume();
  // Ethereal major chord arpeggio
  const t = ctx.currentTime;
  playTone(440, 'sine', 0.6, t, 0.1);       // A4
  playTone(554.37, 'sine', 0.6, t + 0.1, 0.1); // C#5
  playTone(659.25, 'sine', 0.8, t + 0.2, 0.1); // E5
  playTone(880, 'sine', 1.0, t + 0.3, 0.05);   // A5
};

export const playError = () => {
  const ctx = getContext();
  if (ctx.state === 'suspended') ctx.resume();
  // Low dissonance
  const t = ctx.currentTime;
  playTone(150, 'sawtooth', 0.3, t, 0.1);
  playTone(145, 'sawtooth', 0.3, t, 0.1);
};

export const playOpen = () => {
  const ctx = getContext();
  if (ctx.state === 'suspended') ctx.resume();
  // Sci-fi swish up
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.frequency.setValueAtTime(200, t);
  osc.frequency.exponentialRampToValueAtTime(600, t + 0.3);
  
  gain.gain.setValueAtTime(0.1, t);
  gain.gain.linearRampToValueAtTime(0, t + 0.3);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start(t);
  osc.stop(t + 0.3);
};

export const playClose = () => {
  const ctx = getContext();
  if (ctx.state === 'suspended') ctx.resume();
  // Sci-fi swish down
  const t = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.frequency.setValueAtTime(600, t);
  osc.frequency.exponentialRampToValueAtTime(200, t + 0.2);
  
  gain.gain.setValueAtTime(0.1, t);
  gain.gain.linearRampToValueAtTime(0, t + 0.2);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start(t);
  osc.stop(t + 0.2);
};
