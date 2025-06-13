export interface HLSSegment {
  duration: number;
  filename: string;
}

export interface HLSVariantPlaylist {
  uri: string;
  bandwidth?: number;
  resolution?: string;
  frameRate?: string;
  codecs?: string;
}

export interface HLSManifestTags {
  version?: number;
  targetDuration?: number;
  mediaSequence?: number;
  discontinuitySequence?: number;
  endList?: boolean;
  playlistType?: string;
  iFramesOnly?: boolean;
  independentSegments?: boolean;
  allowCache?: boolean;
}

export interface HLSStreamInfo {
  bandwidths: string[];
  resolutions: string[];
  codecs: string[];
  frameRates: string[];
  audioCodecs: string[];
  averageBandwidth?: string;
  subtitles: string[];
  closedCaptions: boolean;
  isLive: boolean;
  targetDuration?: number;
  playlistType?: string;
  segments?: HLSSegment[];
  totalDuration?: number;
  averageSegmentDuration?: number;
  variantPlaylists?: HLSVariantPlaylist[];
  manifestTags: HLSManifestTags;
}

export async function parseM3U8(url: string): Promise<HLSStreamInfo> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch M3U8: ${response.statusText}`);
    }

    const manifest = await response.text();
    const lines = manifest.split('\n');

    const info: HLSStreamInfo = {
      bandwidths: [],
      resolutions: [],
      codecs: [],
      frameRates: [],
      audioCodecs: [],
      subtitles: [],
      closedCaptions: false,
      isLive: true,
      segments: [],
      variantPlaylists: [],
      manifestTags: {}
    };

    let targetDuration: number | undefined;
    let playlistType: string | undefined;
    let currentSegmentDuration: number | undefined;
    let totalDuration = 0;
    let currentVariantPlaylist: HLSVariantPlaylist | undefined;

    for (const line of lines) {
      const trimmedLine = line.trim();

      // Parse manifest tags
      if (trimmedLine.startsWith('#EXT-X-VERSION:')) {
        info.manifestTags.version = parseInt(trimmedLine.substring(15));
      }
      else if (trimmedLine.startsWith('#EXT-X-TARGETDURATION:')) {
        targetDuration = parseFloat(trimmedLine.substring(22));
        info.targetDuration = targetDuration;
        info.manifestTags.targetDuration = targetDuration;
      }
      else if (trimmedLine.startsWith('#EXT-X-MEDIA-SEQUENCE:')) {
        info.manifestTags.mediaSequence = parseInt(trimmedLine.substring(22));
      }
      else if (trimmedLine.startsWith('#EXT-X-DISCONTINUITY-SEQUENCE:')) {
        info.manifestTags.discontinuitySequence = parseInt(trimmedLine.substring(29));
      }
      else if (trimmedLine === '#EXT-X-ENDLIST') {
        info.manifestTags.endList = true;
        info.isLive = false;
      }
      else if (trimmedLine.startsWith('#EXT-X-PLAYLIST-TYPE:')) {
        playlistType = trimmedLine.substring(21).trim();
        info.isLive = playlistType !== 'VOD';
        info.playlistType = playlistType;
        info.manifestTags.playlistType = playlistType;
      }
      else if (trimmedLine === '#EXT-X-I-FRAMES-ONLY') {
        info.manifestTags.iFramesOnly = true;
      }
      else if (trimmedLine === '#EXT-X-INDEPENDENT-SEGMENTS') {
        info.manifestTags.independentSegments = true;
      }
      else if (trimmedLine === '#EXT-X-ALLOW-CACHE:YES') {
        info.manifestTags.allowCache = true;
      }
      else if (trimmedLine === '#EXT-X-ALLOW-CACHE:NO') {
        info.manifestTags.allowCache = false;
      }

      // Parse segment duration
      else if (trimmedLine.startsWith('#EXTINF:')) {
        currentSegmentDuration = parseFloat(trimmedLine.substring(8).split(',')[0]);
        totalDuration += currentSegmentDuration;
      }

      // Parse segment filename
      else if (!trimmedLine.startsWith('#') && currentSegmentDuration !== undefined) {
        info.segments?.push({
          duration: currentSegmentDuration,
          filename: trimmedLine
        });
        currentSegmentDuration = undefined;
      }

      // Parse stream info
      else if (trimmedLine.startsWith('#EXT-X-STREAM-INF:')) {
        const attributes = parseAttributes(trimmedLine.substring(18));
        currentVariantPlaylist = {
          uri: '', // Will be set in the next non-comment line
          bandwidth: attributes.BANDWIDTH ? parseInt(attributes.BANDWIDTH) : undefined,
          resolution: attributes.RESOLUTION,
          frameRate: attributes['FRAME-RATE'],
          codecs: attributes.CODECS
        };

        if (attributes.BANDWIDTH) {
          const bandwidth = formatBandwidth(parseInt(attributes.BANDWIDTH));
          info.bandwidths.push(bandwidth);
        }

        if (attributes.RESOLUTION) {
          info.resolutions.push(attributes.RESOLUTION);
        }

        if (attributes.CODECS) {
          const codecs = attributes.CODECS.split(',').map((c: string) => c.trim().replace(/"/g, ''));
          const videoCodec = codecs.find((c: string) => c.startsWith('avc1') || c.startsWith('hvc1') || c.startsWith('vp9'));
          const audioCodec = codecs.find((c: string) => c.startsWith('mp4a') || c.startsWith('ac-3') || c.startsWith('ec-3'));

          if (videoCodec) info.codecs.push(videoCodec);
          if (audioCodec && !info.audioCodecs.includes(audioCodec)) {
            info.audioCodecs.push(audioCodec);
          }
        }

        if (attributes['FRAME-RATE']) {
          info.frameRates.push(`${attributes['FRAME-RATE']} fps`);
        }

        if (attributes['AVERAGE-BANDWIDTH']) {
          info.averageBandwidth = formatBandwidth(parseInt(attributes['AVERAGE-BANDWIDTH']));
        }
      }

      // Parse variant playlist URI
      else if (trimmedLine && !trimmedLine.startsWith('#') && currentVariantPlaylist) {
        currentVariantPlaylist.uri = new URL(trimmedLine, url).href;
        info.variantPlaylists?.push(currentVariantPlaylist);
        currentVariantPlaylist = undefined;
      }

      // Parse subtitles and closed captions
      else if (trimmedLine.startsWith('#EXT-X-MEDIA:')) {
        const attributes = parseAttributes(trimmedLine.substring(13));
        if (attributes.TYPE === 'SUBTITLES' && attributes.LANGUAGE) {
          info.subtitles.push(attributes.LANGUAGE);
        }
        if (attributes.TYPE === 'CLOSED-CAPTIONS') {
          info.closedCaptions = true;
        }
      }
    }

    // Calculate average segment duration
    if (info.segments && info.segments.length > 0) {
      info.totalDuration = totalDuration;
      info.averageSegmentDuration = totalDuration / info.segments.length;
    }

    // Remove duplicates
    info.bandwidths = [...new Set(info.bandwidths)];
    info.resolutions = [...new Set(info.resolutions)];
    info.codecs = [...new Set(info.codecs)];
    info.frameRates = [...new Set(info.frameRates)];
    info.audioCodecs = [...new Set(info.audioCodecs)];
    info.subtitles = [...new Set(info.subtitles)];

    return info;
  } catch (error) {
    console.error('Error parsing M3U8:', error);
    throw error;
  }
}

// Helper function to parse attributes from a line
function parseAttributes(line: string): Record<string, string> {
  const attributes: Record<string, string> = {};
  const regex = /([A-Z-]+)=(?:"([^"]*)"|([^,]*))/g;
  let match;

  while ((match = regex.exec(line)) !== null) {
    const key = match[1];
    const value = match[2] || match[3];
    attributes[key] = value;
  }

  return attributes;
}

export function formatBandwidth(bits: number): string {
  if (bits >= 1000000) {
    return `${(bits / 1000000).toFixed(2)} Mbps`;
  }
  return `${(bits / 1000).toFixed(2)} Kbps`;
}
