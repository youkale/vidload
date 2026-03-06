'use client';

import React, { useEffect, useRef } from 'react';

interface AudioWaveformProps {
  audioBuffer?: AudioBuffer;
  color?: string;
  backgroundColor?: string;
  height?: number;
  showAxis?: boolean;
}

export default function AudioWaveform({
  audioBuffer,
  color = '#3b82f6',
  backgroundColor = '#1f2937',
  height = 100,
  showAxis = true
}: AudioWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!audioBuffer || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width } = canvas;
    const data = audioBuffer.getChannelData(0);
    const step = Math.ceil(data.length / width);
    const amp = height / 2;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    if (showAxis) {
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, amp);
      ctx.lineTo(width, amp);
      ctx.stroke();
    }

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
  }, [audioBuffer, color, backgroundColor, height, showAxis]);

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

export async function createAudioBufferFromFile(
  file: File
): Promise<AudioBuffer | null> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    audioContext.close();
    return audioBuffer;
  } catch (error) {
    console.error('Error creating audio buffer:', error);
    return null;
  }
}

export async function createAudioBufferFromUrl(
  url: string
): Promise<AudioBuffer | null> {
  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    audioContext.close();
    return audioBuffer;
  } catch (error) {
    console.error('Error creating audio buffer from URL:', error);
    return null;
  }
}
