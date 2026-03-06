import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';
import { AudioMetadata } from './types';
import { parseID3Tag, extractAlbumArt } from './id3';

let ffmpeg: FFmpeg | null = null;
let isFFmpegLoading = false;
let ffmpegLoadPromise: Promise<FFmpeg> | null = null;

async function initFFmpeg(): Promise<FFmpeg> {
  if (ffmpeg) return ffmpeg;
  
  if (isFFmpegLoading && ffmpegLoadPromise) {
    return ffmpegLoadPromise;
  }
  
  try {
    isFFmpegLoading = true;
    ffmpegLoadPromise = (async () => {
      const instance = new FFmpeg();
      
      instance.on('log', (event) => {
        console.log(`[FFmpeg ${event.type}]:`, event.message);
      });
      
      const hasSharedArrayBuffer = typeof SharedArrayBuffer !== 'undefined';
      
      if (hasSharedArrayBuffer) {
        try {
          const MT_CDN_BASE = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core-mt@0.12.6/dist/umd';
          const [coreBlob, wasmBlob, workerBlob] = await Promise.all([
            toBlobURL(`${MT_CDN_BASE}/ffmpeg-core.js`, 'text/javascript'),
            toBlobURL(`${MT_CDN_BASE}/ffmpeg-core.wasm`, 'application/wasm'),
            toBlobURL(`${MT_CDN_BASE}/ffmpeg-core.worker.js`, 'text/javascript')
          ]);
          
          await instance.load({
            coreURL: coreBlob,
            wasmURL: wasmBlob,
            workerURL: workerBlob,
          });
          
          ffmpeg = instance;
          return instance;
        } catch (error) {
          console.warn('Multi-threaded FFmpeg failed, falling back to single-threaded');
        }
      }
      
      const SINGLE_CDN_BASE = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/umd';
      const [coreBlob, wasmBlob] = await Promise.all([
        toBlobURL(`${SINGLE_CDN_BASE}/ffmpeg-core.js`, 'text/javascript'),
        toBlobURL(`${SINGLE_CDN_BASE}/ffmpeg-core.wasm`, 'application/wasm')
      ]);
      
      await instance.load({
        coreURL: coreBlob,
        wasmURL: wasmBlob,
      });
      
      ffmpeg = instance;
      return instance;
    })();
    
    return await ffmpegLoadPromise;
  } catch (error) {
    console.error('Error initializing FFmpeg:', error);
    isFFmpegLoading = false;
    ffmpegLoadPromise = null;
    throw error;
  } finally {
    isFFmpegLoading = false;
    ffmpegLoadPromise = null;
  }
}

export async function getAudioMetadata(input: string | File): Promise<AudioMetadata> {
  try {
    const instance = await initFFmpeg();
    
    let inputData: Uint8Array;
    let source: 'local' | 'url';
    let inputUrl: string | undefined;
    
    if (typeof input === 'string') {
      console.log('Fetching audio from URL:', input);
      const response = await fetch(input);
      if (!response.ok) {
        throw new Error(`Failed to fetch audio: ${response.statusText}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      inputData = new Uint8Array(arrayBuffer);
      source = 'url';
      inputUrl = input;
    } else {
      console.log('Processing local audio file:', input.name);
      const arrayBuffer = await input.arrayBuffer();
      inputData = new Uint8Array(arrayBuffer);
      source = 'local';
    }
    
    const id3Tag = parseID3Tag(inputData.buffer as ArrayBuffer);
    const albumArt = extractAlbumArt(inputData.buffer as ArrayBuffer);
    
    await instance.writeFile('input', inputData);
    
    console.log('Running FFmpeg to extract audio metadata...');
    await instance.exec(['-i', 'input', '-hide_banner']);
    
    let output = '';
    instance.on('log', (event) => {
      output += event.message + '\n';
    });
    
    await instance.exec(['-i', 'input', '-f', 'ffmetadata', '-']);
    
    const metadata = parseFFmpegAudioOutput(output, inputData.length, source, inputUrl);
    
    if (id3Tag.title) metadata.title = id3Tag.title;
    if (id3Tag.artist) metadata.artist = id3Tag.artist;
    if (id3Tag.album) metadata.album = id3Tag.album;
    if (id3Tag.year) metadata.year = id3Tag.year;
    if (id3Tag.genre) metadata.genre = id3Tag.genre;
    if (id3Tag.trackNumber) metadata.trackNumber = id3Tag.trackNumber;
    if (albumArt) metadata.albumArt = albumArt.data;
    
    await instance.deleteFile('input');
    
    return metadata;
  } catch (error) {
    console.error('Error in getAudioMetadata:', error);
    throw error;
  }
}

function parseFFmpegAudioOutput(
  output: string,
  fileSize: number,
  source: 'local' | 'url',
  url?: string
): AudioMetadata {
  const extract = (pattern: RegExp, defaultValue: string = 'N/A'): string => {
    const match = output.match(pattern);
    return match && match[1] ? match[1].trim() : defaultValue;
  };
  
  const duration = extract(/Duration:\s*([\d:.]+)/, 'N/A');
  const bitrate = extract(/bitrate:\s*(\d+\s*kb\/s)/i, 'N/A');
  const sampleRate = extract(/(\d+\s*Hz)/i, 'N/A');
  const channels = extract(/Audio:.*?(\d+(?:\.\d+)?\s*channels|\bmono\b|\bstereo\b)/i, 'N/A');
  const codec = extract(/Audio:\s*([\w\d]+)/i, 'N/A');
  const format = extract(/Input #0,\s*([^,\n]+)/, 'N/A');
  
  const size = formatFileSize(fileSize);
  
  const bitDepth = extract(/(\d+\s*bits)/i);
  const compressionRatio = calculateCompressionRatio(bitrate, sampleRate, channels);
  
  return {
    duration,
    bitrate,
    sampleRate,
    channels,
    codec,
    format,
    size,
    source,
    url,
    bitDepth: bitDepth !== 'N/A' ? bitDepth : undefined,
    compressionRatio
  };
}

function formatFileSize(bytes: number): string {
  if (bytes >= 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GiB`;
  } else if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MiB`;
  } else if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(2)} KiB`;
  } else {
    return `${bytes} B`;
  }
}

function calculateCompressionRatio(bitrate: string, sampleRate: string, channels: string): string | undefined {
  try {
    const bitrateMatch = bitrate.match(/(\d+)/);
    const sampleRateMatch = sampleRate.match(/(\d+)/);
    const channelsMatch = channels.match(/(\d+)/);
    
    if (!bitrateMatch || !sampleRateMatch || !channelsMatch) {
      return undefined;
    }
    
    const bitrateKbps = parseInt(bitrateMatch[1]);
    const sampleRateHz = parseInt(sampleRateMatch[1]);
    const numChannels = parseInt(channelsMatch[1]) || (channels.includes('stereo') ? 2 : 1);
    
    const uncompressedBitrate = (sampleRateHz * 16 * numChannels) / 1000;
    const ratio = uncompressedBitrate / bitrateKbps;
    
    return `${ratio.toFixed(2)}:1`;
  } catch {
    return undefined;
  }
}

export async function convertAudio(
  input: File | Uint8Array,
  outputFormat: string,
  options: {
    bitrate?: string;
    sampleRate?: string;
    channels?: number;
  } = {}
): Promise<Uint8Array> {
  try {
    const instance = await initFFmpeg();
    
    let inputData: Uint8Array;
    if (input instanceof File) {
      const arrayBuffer = await input.arrayBuffer();
      inputData = new Uint8Array(arrayBuffer);
    } else {
      inputData = input;
    }
    
    await instance.writeFile('input', inputData);
    
    const args = ['-i', 'input'];
    
    if (options.bitrate) {
      args.push('-b:a', options.bitrate);
    }
    
    if (options.sampleRate) {
      args.push('-ar', options.sampleRate);
    }
    
    if (options.channels) {
      args.push('-ac', options.channels.toString());
    }
    
    const outputFilename = `output.${outputFormat}`;
    args.push(outputFilename);
    
    console.log('Converting audio with args:', args);
    await instance.exec(args);
    
    const outputData = await instance.readFile(outputFilename);
    
    await instance.deleteFile('input');
    await instance.deleteFile(outputFilename);
    
    return outputData as Uint8Array;
  } catch (error) {
    console.error('Error converting audio:', error);
    throw error;
  }
}
