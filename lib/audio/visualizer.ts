export class AudioVisualizer {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private source: MediaElementAudioSourceNode | null = null;
  private animationId: number | null = null;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private isInitialized = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
  }

  async init(audioElement: HTMLAudioElement): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 2048;
      this.analyser.smoothingTimeConstant = 0.8;

      this.source = this.audioContext.createMediaElementSource(audioElement);
      this.source.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);

      this.isInitialized = true;
      console.log('Audio visualizer initialized');
    } catch (error) {
      console.error('Error initializing audio visualizer:', error);
      throw error;
    }
  }

  drawWaveform(color: string = '#3b82f6', backgroundColor: string = '#1f2937'): void {
    if (!this.analyser) {
      console.warn('Analyzer not initialized');
      return;
    }

    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteTimeDomainData(dataArray);

    const { width, height } = this.canvas;
    this.ctx.fillStyle = backgroundColor;
    this.ctx.fillRect(0, 0, width, height);

    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = color;
    this.ctx.beginPath();

    const sliceWidth = width / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = (v * height) / 2;

      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    this.ctx.lineTo(width, height / 2);
    this.ctx.stroke();
  }

  drawSpectrum(color: string = '#3b82f6', backgroundColor: string = '#1f2937'): void {
    if (!this.analyser) {
      console.warn('Analyzer not initialized');
      return;
    }

    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteFrequencyData(dataArray);

    const { width, height } = this.canvas;
    this.ctx.fillStyle = backgroundColor;
    this.ctx.fillRect(0, 0, width, height);

    const barWidth = (width / bufferLength) * 2.5;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const barHeight = (dataArray[i] / 255) * height;

      const gradient = this.ctx.createLinearGradient(0, height, 0, height - barHeight);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, this.adjustColor(color, 50));

      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(x, height - barHeight, barWidth - 1, barHeight);

      x += barWidth;
    }
  }

  drawCircularSpectrum(color: string = '#3b82f6', backgroundColor: string = '#1f2937'): void {
    if (!this.analyser) {
      console.warn('Analyzer not initialized');
      return;
    }

    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteFrequencyData(dataArray);

    const { width, height } = this.canvas;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 3;

    this.ctx.fillStyle = backgroundColor;
    this.ctx.fillRect(0, 0, width, height);

    const barCount = 180;
    const angleStep = (Math.PI * 2) / barCount;

    for (let i = 0; i < barCount; i++) {
      const dataIndex = Math.floor((i / barCount) * bufferLength);
      const barHeight = (dataArray[dataIndex] / 255) * radius;

      const angle = i * angleStep - Math.PI / 2;
      const x1 = centerX + Math.cos(angle) * radius;
      const y1 = centerY + Math.sin(angle) * radius;
      const x2 = centerX + Math.cos(angle) * (radius + barHeight);
      const y2 = centerY + Math.sin(angle) * (radius + barHeight);

      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
    }
  }

  startVisualization(
    type: 'waveform' | 'spectrum' | 'circular' = 'spectrum',
    color: string = '#3b82f6',
    backgroundColor: string = '#1f2937'
  ): void {
    const draw = () => {
      switch (type) {
        case 'waveform':
          this.drawWaveform(color, backgroundColor);
          break;
        case 'spectrum':
          this.drawSpectrum(color, backgroundColor);
          break;
        case 'circular':
          this.drawCircularSpectrum(color, backgroundColor);
          break;
      }

      this.animationId = requestAnimationFrame(draw);
    };

    draw();
  }

  stopVisualization(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  resume(): void {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  suspend(): void {
    if (this.audioContext && this.audioContext.state === 'running') {
      this.audioContext.suspend();
    }
  }

  destroy(): void {
    this.stopVisualization();

    if (this.source) {
      this.source.disconnect();
      this.source = null;
    }

    if (this.analyser) {
      this.analyser.disconnect();
      this.analyser = null;
    }

    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }

    this.isInitialized = false;
  }

  private adjustColor(color: string, amount: number): string {
    const hex = color.replace('#', '');
    const r = Math.min(255, parseInt(hex.substring(0, 2), 16) + amount);
    const g = Math.min(255, parseInt(hex.substring(2, 4), 16) + amount);
    const b = Math.min(255, parseInt(hex.substring(4, 6), 16) + amount);

    return `rgb(${r}, ${g}, ${b})`;
  }
}

export function drawStaticWaveform(
  canvas: HTMLCanvasElement,
  audioBuffer: AudioBuffer,
  color: string = '#3b82f6',
  backgroundColor: string = '#1f2937'
): void {
  const ctx = canvas.getContext('2d')!;
  const { width, height } = canvas;

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);

  const data = audioBuffer.getChannelData(0);
  const step = Math.ceil(data.length / width);
  const amp = height / 2;

  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.beginPath();

  for (let i = 0; i < width; i++) {
    const min = Math.min(...data.slice(i * step, (i + 1) * step));
    const max = Math.max(...data.slice(i * step, (i + 1) * step));

    ctx.moveTo(i, amp + min * amp);
    ctx.lineTo(i, amp + max * amp);
  }

  ctx.stroke();
}
