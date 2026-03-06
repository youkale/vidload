'use client';

import React, { useEffect, useRef } from 'react';

interface AudioSpectrumProps {
  audioBuffer?: AudioBuffer;
  color?: string;
  backgroundColor?: string;
  height?: number;
  barCount?: number;
  barWidth?: number;
  barGap?: number;
}

export default function AudioSpectrum({
  audioBuffer,
  color = '#3b82f6',
  backgroundColor = '#1f2937',
  height = 150,
  barCount = 64,
  barWidth = 4,
  barGap = 2
}: AudioSpectrumProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!audioBuffer || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width } = canvas;
    
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    const offlineContext = new OfflineAudioContext(
      audioBuffer.numberOfChannels,
      audioBuffer.length,
      audioBuffer.sampleRate
    );

    const source = offlineContext.createBufferSource();
    source.buffer = audioBuffer;

    const analyser = offlineContext.createAnalyser();
    analyser.fftSize = 2048;
    
    source.connect(analyser);
    analyser.connect(offlineContext.destination);
    source.start();

    const frequencyData = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(frequencyData);

    const totalBarWidth = barWidth + barGap;
    const startX = (width - (barCount * totalBarWidth)) / 2;

    for (let i = 0; i < barCount; i++) {
      const dataIndex = Math.floor((i / barCount) * frequencyData.length);
      const value = frequencyData[dataIndex];
      const barHeight = (value / 255) * height;

      const x = startX + i * totalBarWidth;
      const y = height - barHeight;

      const gradient = ctx.createLinearGradient(x, height, x, y);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, adjustColor(color, 50));

      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth, barHeight);
    }
  }, [audioBuffer, color, backgroundColor, height, barCount, barWidth, barGap]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={height}
      className="w-full rounded-lg"
      style={{ backgroundColor }}
    />
  );
}

function adjustColor(color: string, amount: number): string {
  const hex = color.replace('#', '');
  const r = Math.min(255, parseInt(hex.substring(0, 2), 16) + amount);
  const g = Math.min(255, parseInt(hex.substring(2, 4), 16) + amount);
  const b = Math.min(255, parseInt(hex.substring(4, 6), 16) + amount);

  return `rgb(${r}, ${g}, ${b})`;
}
