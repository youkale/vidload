import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';
import { FFmpegPerformanceMonitor } from './performance';

// Add proper type definitions
interface FFmpegLogMessage {
  type: string;
  message: string;
}

interface FFmpegProgressMessage {
  ratio: number;
}

let ffmpeg: FFmpeg | null = null;
let isFFmpegLoading = false;
let ffmpegLoadPromise: Promise<FFmpeg> | null = null;

export async function initFFmpeg() {
  // Return existing instance if available
  if (ffmpeg) return ffmpeg;

  // Return existing promise if FFmpeg is currently loading
  if (isFFmpegLoading && ffmpegLoadPromise) {
    return ffmpegLoadPromise;
  }

  try {
    isFFmpegLoading = true;
    ffmpegLoadPromise = (async () => {
      const instance = new FFmpeg();

      // Set up logging before loading
      instance.on('log', (event) => {
        console.log(`[FFmpeg ${event.type}]:`, event.message);
      });

      // Check for multi-threading support
      if (typeof SharedArrayBuffer === 'undefined') {
        console.warn('SharedArrayBuffer is not available. Multi-threading will be disabled.');
        console.warn('To enable multi-threading, ensure HTTPS and proper headers are set.');
      } else {
        console.log('SharedArrayBuffer is available. Multi-threading enabled.');
      }

      // Use jsDelivr CDN for multi-threaded version
      const CDN_BASE = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core-mt@0.12.6/dist/umd';

      console.log('Loading FFmpeg multi-threaded version from jsDelivr CDN...');

      const coreURL = `${CDN_BASE}/ffmpeg-core.js`;
      const wasmURL = `${CDN_BASE}/ffmpeg-core.wasm`;
      const workerURL = `${CDN_BASE}/ffmpeg-core.worker.js`;

      console.log('Loading multi-threaded FFmpeg with URLs:', { coreURL, wasmURL, workerURL });

      // Load FFmpeg with multi-threading support and comprehensive fallback
      try {
        // First attempt: Use toBlobURL for better cross-origin compatibility
        console.log('Attempting multi-threaded FFmpeg load with blob URLs...');
        const coreBlob = await toBlobURL(coreURL, 'text/javascript');
        const wasmBlob = await toBlobURL(wasmURL, 'application/wasm');
        const workerBlob = await toBlobURL(workerURL, 'text/javascript');

        await instance.load({
          coreURL: coreBlob,
          wasmURL: wasmBlob,
          workerURL: workerBlob,
        });
        console.log('✅ Multi-threaded FFmpeg loaded successfully with blob URLs');
      } catch (multiThreadError) {
        console.warn('❌ Multi-threaded blob version failed:', multiThreadError);

        try {
          // Second attempt: Single-threaded with blob URLs
          console.log('Attempting single-threaded FFmpeg load with blob URLs...');
          const coreBlob = await toBlobURL(coreURL, 'text/javascript');
          const wasmBlob = await toBlobURL(wasmURL, 'application/wasm');

          await instance.load({
            coreURL: coreBlob,
            wasmURL: wasmBlob,
          });
          console.log('✅ Single-threaded FFmpeg loaded successfully with blob URLs');
        } catch (singleThreadError) {
          console.warn('❌ Single-threaded blob version failed:', singleThreadError);

          // Third attempt: Direct CDN URLs (fallback)
          console.log('Attempting direct CDN load...');
          try {
            await instance.load({
              coreURL,
              wasmURL,
            });
            console.log('✅ Direct CDN FFmpeg loaded successfully');
          } catch (directError) {
            console.error('❌ All FFmpeg loading methods failed:', directError);
            throw new Error('Unable to load FFmpeg. Please check your internet connection and try again.');
          }
        }
      }

      console.log('FFmpeg multi-threaded version loaded successfully');

      // Log system capabilities and performance information
      FFmpegPerformanceMonitor.logSystemCapabilities();

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

export interface VideoMetadata {
  bitrate: string;
  codec: string;
  frameRate: string;
  resolution: string;
  duration: string;
  size: string;
  format: string;
  audioCodec: string;
  audioChannels: string;
  audioSampleRate: string;
  colorSpace: string;
  pixelFormat: string;
  aspectRatio: string;
  level: string;
  profile: string;
  startTime: string;
  container: string;
  source: 'local' | 'url';
  url?: string;
}

async function fetchPartialVideo(url: string, start = 0, end = 10 * 1024 * 1024): Promise<Uint8Array> {
  try {
    console.log(`Attempting to fetch video data from ${url}`);

    // First, get the file size
    let fileSize = 0;
    try {
      const headResponse = await fetch(url, { method: 'HEAD' });
      if (headResponse.ok) {
        const contentLength = headResponse.headers.get('content-length');
        if (contentLength) {
          fileSize = parseInt(contentLength, 10);
          console.log(`File size: ${fileSize} bytes`);
        }
      }
    } catch (error) {
      console.warn('Could not get file size:', error);
    }

    // Strategy 1: For large files, try downloading the end first (where moov atom usually is)
    if (fileSize > 20 * 1024 * 1024) { // If file is larger than 20MB
      try {
        console.log('Large file detected, trying to fetch the end first for moov atom...');

        // Download last 15MB (this usually contains moov atom for most videos)
        const endStart = Math.max(0, fileSize - 15 * 1024 * 1024);
        console.log(`Fetching end portion: bytes ${endStart}-${fileSize - 1}`);

        const endResponse = await fetch(url, {
          headers: { Range: `bytes=${endStart}-${fileSize - 1}` }
        });

        if (endResponse.ok) {
          const endData = new Uint8Array(await endResponse.arrayBuffer());
          console.log(`Successfully fetched ${endData.length} bytes from file end`);

          // More thorough check for moov atom in the entire end portion
          console.log('Checking entire end portion for moov atom...');

          let foundMoov = false;
          const chunkSize = 1024 * 1024; // 1MB chunks

          for (let i = 0; i < endData.length; i += chunkSize) {
            const chunkEnd = Math.min(i + chunkSize, endData.length);
            const chunk = endData.slice(i, chunkEnd);
            const chunkStr = new TextDecoder('latin1').decode(chunk);

            if (chunkStr.includes('moov')) {
              console.log(`Found moov atom at position ~${endStart + i} in end portion`);
              foundMoov = true;
              break;
            }
          }

          if (foundMoov) {
            console.log('Found moov atom in end portion. Calculating optimal continuous download...');

            // We found moov at position ~68281958 in a 69330534 byte file
            // We need to download from the beginning to past the moov atom to get a valid MP4
            // Download from beginning to the end of the file (or a reasonable portion that includes moov)

            // Calculate how much we need: from start to well past moov position
            const moovPosition = endStart + (endData.length * 0.8); // Rough estimate of moov position
            const safeEndPosition = Math.min(fileSize - 1, moovPosition + 5 * 1024 * 1024); // 5MB past moov

            console.log(`Downloading continuous chunk from beginning to past moov: bytes 0-${safeEndPosition} (${(safeEndPosition / 1024 / 1024).toFixed(1)}MB)`);

            try {
              const continuousResponse = await fetch(url, {
                headers: { Range: `bytes=0-${safeEndPosition}` }
              });

              if (continuousResponse.ok) {
                const continuousData = new Uint8Array(await continuousResponse.arrayBuffer());
                console.log(`Successfully fetched continuous ${continuousData.length} bytes from beginning to past moov`);

                // Verify this continuous chunk contains both ftyp (at beginning) and moov
                const startStr = new TextDecoder('latin1').decode(continuousData.slice(0, 1024));
                console.log('Checking for ftyp at beginning...');

                if (startStr.includes('ftyp')) {
                  console.log('✓ Found ftyp atom at beginning');

                  // Check for moov in the latter part
                  console.log('Checking for moov atom in continuous data...');
                  let foundMoovInContinuous = false;

                  // Check last 20MB of the continuous data for moov
                  const searchStart = Math.max(0, continuousData.length - 20 * 1024 * 1024);
                  for (let i = searchStart; i < continuousData.length; i += chunkSize) {
                    const chunkEnd = Math.min(i + chunkSize, continuousData.length);
                    const chunk = continuousData.slice(i, chunkEnd);
                    const chunkStr = new TextDecoder('latin1').decode(chunk);

                    if (chunkStr.includes('moov')) {
                      console.log(`✓ Found moov atom in continuous data at position ~${i}`);
                      foundMoovInContinuous = true;
                      break;
                    }
                  }

                  if (foundMoovInContinuous) {
                    console.log('✓ Using continuous chunk with both ftyp and moov atoms');
                    return continuousData;
                  } else {
                    console.log('✗ Continuous chunk missing moov atom, downloading more...');

                    // Download even more - all the way to the end
                    console.log(`Downloading from beginning to end of file: bytes 0-${fileSize - 1} (${(fileSize / 1024 / 1024).toFixed(1)}MB)`);

                    const fullResponse = await fetch(url, {
                      headers: { Range: `bytes=0-${fileSize - 1}` }
                    });

                    if (fullResponse.ok) {
                      const fullData = new Uint8Array(await fullResponse.arrayBuffer());
                      console.log(`✓ Downloaded complete file ${fullData.length} bytes`);
                      return fullData;
                    }
                  }
                } else {
                  console.log('✗ No ftyp atom found at beginning of continuous chunk');
                }
              } else {
                console.warn('Failed to fetch continuous portion');
              }
            } catch (error) {
              console.warn('Error fetching continuous portion:', error);
            }
          } else {
            console.log('No moov atom found in end portion, will try other strategies');
          }
        }
      } catch (error) {
        console.warn('End portion fetch failed:', error);
      }
    }

    // Strategy 2: Try downloading a larger beginning portion (30MB)
    if (fileSize > 30 * 1024 * 1024) {
      try {
        console.log('Trying larger beginning portion (30MB)...');
        const response = await fetch(url, {
          headers: { Range: `bytes=0-${30 * 1024 * 1024 - 1}` }
        });

        if (response.ok) {
          const buffer = await response.arrayBuffer();
          const data = new Uint8Array(buffer);
          console.log(`Successfully fetched ${data.length} bytes from beginning (30MB)`);

          // More thorough check for moov atom in the entire 30MB
          console.log('Checking entire 30MB data for moov atom...');

          // Convert to string in chunks to avoid memory issues
          let foundMoov = false;
          const chunkSize = 1024 * 1024; // 1MB chunks

          for (let i = 0; i < data.length; i += chunkSize) {
            const chunkEnd = Math.min(i + chunkSize, data.length);
            const chunk = data.slice(i, chunkEnd);
            const chunkStr = new TextDecoder('latin1').decode(chunk);

            if (chunkStr.includes('moov')) {
              console.log(`Found moov atom at position ~${i} in 30MB data`);
              foundMoov = true;
              break;
            }
          }

          if (foundMoov) {
            console.log('Using 30MB beginning portion with moov atom');
            return data;
          } else {
            console.log('No moov atom found in 30MB beginning portion');
          }
        }
      } catch (error) {
        console.warn('Large beginning portion fetch failed:', error);
      }
    }

    // Strategy 3: Try downloading middle portion of the file
    if (fileSize > 40 * 1024 * 1024) { // For very large files
      try {
        console.log('Trying middle portion of file for moov atom...');

        // Download middle 20MB
        const middleStart = Math.floor(fileSize / 2) - 10 * 1024 * 1024;
        const middleEnd = Math.floor(fileSize / 2) + 10 * 1024 * 1024;
        console.log(`Fetching middle portion: bytes ${middleStart}-${middleEnd - 1}`);

        const middleResponse = await fetch(url, {
          headers: { Range: `bytes=${middleStart}-${middleEnd - 1}` }
        });

        if (middleResponse.ok) {
          const middleData = new Uint8Array(await middleResponse.arrayBuffer());
          console.log(`Successfully fetched ${middleData.length} bytes from file middle`);

          // Check for moov atom in middle portion
          console.log('Checking middle portion for moov atom...');

          let foundMoov = false;
          const chunkSize = 1024 * 1024; // 1MB chunks

          for (let i = 0; i < middleData.length; i += chunkSize) {
            const chunkEnd = Math.min(i + chunkSize, middleData.length);
            const chunk = middleData.slice(i, chunkEnd);
            const chunkStr = new TextDecoder('latin1').decode(chunk);

            if (chunkStr.includes('moov')) {
              console.log(`Found moov atom at position ~${middleStart + i} in middle portion`);
              foundMoov = true;
              break;
            }
          }

          if (foundMoov) {
            console.log('Using middle portion with moov atom');
            return middleData;
          } else {
            console.log('No moov atom found in middle portion');
          }
        }
      } catch (error) {
        console.warn('Middle portion fetch failed:', error);
      }
    }

    // Strategy 4: Try range request for standard first part
    try {
      const rangeEnd = Math.min(end, fileSize > 0 ? fileSize - 1 : end);
      console.log(`Trying standard range request: bytes=${start}-${rangeEnd}`);

      const response = await fetch(url, {
        headers: { Range: `bytes=${start}-${rangeEnd}` }
      });

      console.log('Range request response:', {
        ok: response.ok,
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      });

      if (response.ok) {
        const buffer = await response.arrayBuffer();
        console.log(`Successfully fetched ${buffer.byteLength} bytes via standard range request`);
        return new Uint8Array(buffer);
      }
    } catch (error) {
      console.warn('Standard range request failed:', error);
    }

    // Strategy 5: Progressive download with moov detection
    console.log('All range requests failed, trying progressive download...');
    const fullResponse = await fetch(url);

    console.log('Full fetch response:', {
      ok: fullResponse.ok,
      status: fullResponse.status,
      statusText: fullResponse.statusText,
      headers: Object.fromEntries(fullResponse.headers.entries())
    });

    if (!fullResponse.ok) {
      throw new Error(`Failed to fetch video: ${fullResponse.statusText}`);
    }

    const reader = fullResponse.body?.getReader();
    if (!reader) {
      throw new Error('Cannot read response body');
    }

    // For files where moov is at the end, we need to download more
    // Based on the logs, the moov atom is around position 68MB in a 69MB file
    const targetSize = fileSize > 0 ? Math.min(fileSize, 50 * 1024 * 1024) : 50 * 1024 * 1024;
    console.log(`Downloading up to ${(targetSize / 1024 / 1024).toFixed(1)}MB for progressive analysis...`);

    const chunks: Uint8Array[] = [];
    let totalSize = 0;

    try {
      while (totalSize < targetSize) {
        const { done, value } = await reader.read();
        if (done) break;

        chunks.push(value);
        totalSize += value.length;

        // Check for moov atom every 10MB
        if (totalSize > 0 && totalSize % (10 * 1024 * 1024) < value.length) {
          console.log(`Downloaded ${totalSize} bytes (${(totalSize / 1024 / 1024).toFixed(1)}MB), checking for moov atom...`);

          // Combine chunks to check
          const combinedSoFar = new Uint8Array(totalSize);
          let offset = 0;
          for (const chunk of chunks) {
            combinedSoFar.set(chunk, offset);
            offset += chunk.length;
          }

          // Check for moov atom in the last 5MB of downloaded data
          const checkSize = Math.min(totalSize, 5 * 1024 * 1024);
          const checkStart = Math.max(0, totalSize - checkSize);
          const moovCheck = new TextDecoder('latin1').decode(
            combinedSoFar.slice(checkStart, totalSize)
          );

          if (moovCheck.includes('moov') && totalSize > 20 * 1024 * 1024) {
            console.log(`Found moov atom after downloading ${totalSize} bytes (${(totalSize / 1024 / 1024).toFixed(1)}MB), stopping`);
            break;
          }
        }
      }
    } finally {
      reader.releaseLock();
    }

    const result = new Uint8Array(totalSize);
    let offset = 0;
    for (const chunk of chunks) {
      result.set(chunk, offset);
      offset += chunk.length;
    }

    console.log(`Successfully fetched ${totalSize} bytes (${(totalSize / 1024 / 1024).toFixed(1)}MB) via progressive download`);
    return result;

  } catch (error) {
    console.error('Error in fetchPartialVideo:', error);
    throw error;
  }
}

function parseFFmpegOutput(output: string): Partial<VideoMetadata> {
  console.log('Raw FFmpeg output to parse:', output);

  // Helper function to extract value using regex
  const extract = (pattern: RegExp, defaultValue: string = 'N/A'): string => {
    try {
      const match = output.match(pattern);
      if (!match || !match[1]) {
        console.log(`No match found for pattern: ${pattern}`);
        return defaultValue;
      }
      const value = match[1].trim();
      console.log(`Matched ${pattern}: "${value}"`);
      return value;
    } catch (error) {
      console.warn(`Error extracting with pattern ${pattern}:`, error);
      return defaultValue;
    }
  };

  // Updated patterns for FFmpeg standard output
  const streamInfo = output.split('Stream #').filter(s => s.includes('Video:') || s.includes('Audio:'));
  console.log('Found stream info sections:', streamInfo);

  // Video stream patterns
  const videoStream = streamInfo.find(s => s.includes('Video:')) || '';
  const audioStream = streamInfo.find(s => s.includes('Audio:')) || '';

  // Extract video information
  const resolution = extract(/Video:.*?\b(\d{2,5}x\d{2,5})\b/i) ||
    extract(/\b(\d{2,5}\s*x\s*\d{2,5})\b/, 'N/A');

  const frameRate = extract(/\b(\d+(?:\.\d+)?\s*fps)\b/i) ||
    extract(/\b(\d+(?:\.\d+)?\s*tbr)\b/i) ||
    extract(/\b(\d+(?:\.\d+)?\s*tbn)\b/i, 'N/A');

  const videoBitrate = extract(/Video:.*?(\d+(?:\.\d+)?\s*kb\/s)/i) ||
    extract(/bitrate:\s*(\d+(?:\.\d+)?\s*kb\/s)/i, 'N/A');

  const videoCodec = extract(/Video:\s*([\w\d]+)/i, 'N/A');

  // Extract audio information
  const audioCodec = extract(/Audio:\s*([\w\d]+)/i, 'N/A');
  const audioChannels = extract(/Audio:.*?(\d+(?:\.\d+)?\s*channels|\bmono\b|\bstereo\b)/i) ||
    extract(/Audio:.*?(\d+\s*ch)/i, 'N/A');
  const audioSampleRate = extract(/(\d+\s*Hz)/i) ||
    extract(/Audio:.*?(\d+\s*Hz)/i, 'N/A');

  // Extract general information
  const duration = extract(/Duration:\s*([\d:.]+)/, 'N/A');
  const container = extract(/Input #0,\s*([^,\n]+)/, 'N/A');
  const size = extract(/\b(\d+(?:\.\d+)?\s*[KMG]iB)\b/i, 'N/A');

  // Additional video properties
  const colorSpace = extract(/\b(bt709|bt601|bt2020|smpte170m|smpte240m)\b/i, 'N/A');
  const pixelFormat = extract(/\b(yuv\d+p?|yuvj\d+p?|rgb\d+|bgr\d+)\b/i, 'N/A');
  const aspectRatio = extract(/DAR\s*(\d+:\d+)/i) ||
    extract(/\b(\d+:\d+)\b/, 'N/A');

  // Profile and level information
  const profile = extract(/\(([^)]+)\)/, 'N/A');
  const level = extract(/\b([\d.]+)\s*level\b/i, 'N/A');

  // Start time
  const startTime = extract(/start:\s*([\d.]+)/, '0');

  return {
    resolution,
    frameRate,
    bitrate: videoBitrate,
    codec: videoCodec,
    duration,
    size,
    format: container,
    audioCodec,
    audioChannels,
    audioSampleRate,
    colorSpace,
    pixelFormat,
    aspectRatio,
    level,
    profile,
    startTime,
    container
  };
}

export async function getVideoMetadata(input: string | File): Promise<VideoMetadata> {
  const monitor = new FFmpegPerformanceMonitor();

  try {
    const instance = await initFFmpeg();
    if (!instance) {
      throw new Error('Failed to initialize FFmpeg');
    }

    let inputData: Uint8Array;
    let source: 'local' | 'url';
    let inputUrl: string | undefined;

    if (typeof input === 'string') {
      // Handle URL input
      inputData = await fetchPartialVideo(input);
      source = 'url';
      inputUrl = input;
    } else {
      // Handle File input
      inputData = new Uint8Array(await input.arrayBuffer());
      source = 'local';
    }

    // Start performance monitoring
    monitor.startMonitoring(inputData.length);

    // Write input data to FFmpeg virtual filesystem
    const inputFileName = 'input.mp4';
    await instance.writeFile(inputFileName, inputData);

    let outputText = '';

    // Set up logging to capture output
    const logHandler = ({ message }: { message: string }) => {
      outputText += message + '\n';
      console.log('FFmpeg log:', message);
    };

    instance.on('log', logHandler);

    // Run FFmpeg command to extract metadata with multi-threading support
    // Using -i to read input and forcing format detection
    const probeCommand = [
      '-hide_banner',  // Remove FFmpeg compilation info from output
      '-threads', '0', // Auto-detect optimal thread count for multi-threading
      '-i', inputFileName,  // Input file
      '-f', 'null',  // Force format to null (we don't need output)
      '-'  // Output to stdout
    ];

    console.log('Running multi-threaded FFmpeg probe command:', probeCommand.join(' '));

    // Log threading status
    if (typeof SharedArrayBuffer !== 'undefined') {
      console.log('Multi-threading enabled for this operation');
    } else {
      console.log('Multi-threading not available, using single-threaded mode');
    }

    try {
      await instance.exec(probeCommand);
    } catch (execError) {
      console.warn('FFmpeg probe command warning:', execError);
      // Continue execution as some errors are expected during probing
    }

    // Remove the log handler
    instance.off('log', logHandler);

    console.log('Raw FFmpeg output:', outputText);

    if (!outputText || outputText.trim().length === 0) {
      throw new Error('No metadata output from FFmpeg');
    }

    // Parse the output
    const metadata = parseFFmpegOutput(outputText);

    // Clean up
    try {
      await instance.deleteFile(inputFileName);
    } catch (cleanupError) {
      console.warn('Cleanup warning:', cleanupError);
    }

    // End performance monitoring
    const performanceMetrics = monitor.endMonitoring();

    // Validate required fields
    if (!metadata.codec && !metadata.container) {
      throw new Error('Failed to extract basic video information');
    }

    return {
      ...metadata,
      source,
      url: inputUrl,
      // Ensure all required fields have default values
      bitrate: metadata.bitrate || 'N/A',
      codec: metadata.codec || 'N/A',
      frameRate: metadata.frameRate || 'N/A',
      resolution: metadata.resolution || 'N/A',
      duration: metadata.duration || 'N/A',
      size: metadata.size || 'N/A',
      format: metadata.format || 'N/A',
      audioCodec: metadata.audioCodec || 'N/A',
      audioChannels: metadata.audioChannels || 'N/A',
      audioSampleRate: metadata.audioSampleRate || 'N/A',
      colorSpace: metadata.colorSpace || 'N/A',
      pixelFormat: metadata.pixelFormat || 'N/A',
      aspectRatio: metadata.aspectRatio || 'N/A',
      level: metadata.level || 'N/A',
      profile: metadata.profile || 'N/A',
      startTime: metadata.startTime || '0',
      container: metadata.container || 'N/A'
    };
  } catch (error) {
    console.error('Error in getVideoMetadata:', error);
    throw new Error(`Failed to extract video metadata: ${error instanceof Error ? error.message : String(error)}`);
  }
}
