import { ID3Tag } from './types';

export function parseID3Tag(arrayBuffer: ArrayBuffer): ID3Tag {
  const dataView = new DataView(arrayBuffer);
  const tag: ID3Tag = {};
  
  if (!hasID3Header(dataView)) {
    return tag;
  }
  
  const version = dataView.getUint8(3);
  const size = getID3Size(dataView);
  
  if (version === 3) {
    return parseID3v2_3(dataView, size);
  } else if (version === 4) {
    return parseID3v2_4(dataView, size);
  } else if (version === 2) {
    return parseID3v2_2(dataView, size);
  }
  
  return tag;
}

function hasID3Header(dataView: DataView): boolean {
  try {
    return dataView.getUint8(0) === 0x49 &&
           dataView.getUint8(1) === 0x44 &&
           dataView.getUint8(2) === 0x33;
  } catch {
    return false;
  }
}

function getID3Size(dataView: DataView): number {
  return (dataView.getUint8(6) & 0x7F) << 21 |
         (dataView.getUint8(7) & 0x7F) << 14 |
         (dataView.getUint8(8) & 0x7F) << 7 |
         (dataView.getUint8(9) & 0x7F);
}

function parseID3v2_3(dataView: DataView, size: number): ID3Tag {
  const tag: ID3Tag = {};
  let offset = 10;
  
  while (offset < size) {
    const frameId = readFrameId(dataView, offset);
    if (!frameId || frameId.trim() === '') break;
    
    const frameSize = readFrameSize(dataView, offset + 4, 4);
    const frameData = readFrameData(dataView, offset + 10, frameSize);
    
    processFrame(tag, frameId, frameData);
    
    offset += 10 + frameSize;
  }
  
  return tag;
}

function parseID3v2_4(dataView: DataView, size: number): ID3Tag {
  return parseID3v2_3(dataView, size);
}

function parseID3v2_2(dataView: DataView, size: number): ID3Tag {
  const tag: ID3Tag = {};
  let offset = 10;
  
  while (offset < size) {
    const frameId = readFrameId(dataView, offset, 3);
    if (!frameId || frameId.trim() === '') break;
    
    const frameSize = readFrameSize(dataView, offset + 3, 3);
    const frameData = readFrameData(dataView, offset + 6, frameSize);
    
    const mappedFrameId = mapID3v2_2Frame(frameId);
    if (mappedFrameId) {
      processFrame(tag, mappedFrameId, frameData);
    }
    
    offset += 6 + frameSize;
  }
  
  return tag;
}

function readFrameId(dataView: DataView, offset: number, length: number = 4): string {
  let id = '';
  for (let i = 0; i < length; i++) {
    const char = dataView.getUint8(offset + i);
    if (char === 0) break;
    id += String.fromCharCode(char);
  }
  return id;
}

function readFrameSize(dataView: DataView, offset: number, length: number): number {
  let size = 0;
  for (let i = 0; i < length; i++) {
    size = (size << 8) | dataView.getUint8(offset + i);
  }
  return size;
}

function readFrameData(dataView: DataView, offset: number, size: number): string {
  let data = '';
  for (let i = 0; i < size; i++) {
    const byte = dataView.getUint8(offset + i);
    if (byte >= 32 && byte <= 126) {
      data += String.fromCharCode(byte);
    }
  }
  return data;
}

function processFrame(tag: ID3Tag, frameId: string, data: string): void {
  const encoding = data.charCodeAt(0);
  let content = data.substring(1);
  
  if (encoding === 0 || encoding === 1) {
    content = decodeString(content, encoding);
  }
  
  switch (frameId) {
    case 'TIT2':
    case 'TT2':
      tag.title = content;
      break;
    case 'TPE1':
    case 'TP1':
      tag.artist = content;
      break;
    case 'TALB':
    case 'TAL':
      tag.album = content;
      break;
    case 'TYER':
    case 'TYE':
    case 'TDRC':
      tag.year = content;
      break;
    case 'TCON':
    case 'TCO':
      tag.genre = parseGenre(content);
      break;
    case 'TRCK':
    case 'TRK':
      tag.trackNumber = content;
      break;
  }
}

function decodeString(str: string, encoding: number): string {
  if (encoding === 0) {
    return str.replace(/\0/g, '');
  } else if (encoding === 1) {
    return str.replace(/\0/g, '');
  }
  return str;
}

function parseGenre(genreData: string): string {
  const match = genreData.match(/\((\d+)\)/);
  if (match) {
    const genreId = parseInt(match[1]);
    const genres = [
      'Blues', 'Classic Rock', 'Country', 'Dance', 'Disco', 'Funk', 'Grunge',
      'Hip-Hop', 'Jazz', 'Metal', 'New Age', 'Oldies', 'Other', 'Pop', 'R&B',
      'Rap', 'Reggae', 'Rock', 'Techno', 'Industrial', 'Alternative', 'Ska',
      'Death Metal', 'Pranks', 'Soundtrack', 'Euro-Techno', 'Ambient',
      'Trip-Hop', 'Vocal', 'Jazz+Funk', 'Fusion', 'Trance', 'Classical',
      'Instrumental', 'Acid', 'House', 'Game', 'Sound Clip', 'Gospel',
      'Noise', 'AlternRock', 'Bass', 'Soul', 'Punk', 'Space', 'Meditative',
      'Instrumental Pop', 'Instrumental Rock', 'Ethnic', 'Gothic', 'Darkwave',
      'Techno-Industrial', 'Electronic', 'Pop-Folk', 'Eurodance', 'Dream',
      'Southern Rock', 'Comedy', 'Cult', 'Gangsta', 'Top 40', 'Christian Rap',
      'Pop/Funk', 'Jungle', 'Native American', 'Cabaret', 'New Wave',
      'Psychedelic', 'Rave', 'Showtunes', 'Trailer', 'Lo-Fi', 'Tribal',
      'Acid Punk', 'Acid Jazz', 'Polka', 'Retro', 'Musical', 'Rock & Roll',
      'Hard Rock'
    ];
    return genres[genreId] || genreData;
  }
  return genreData;
}

function mapID3v2_2Frame(frameId: string): string | null {
  const mapping: Record<string, string> = {
    'TT2': 'TIT2',
    'TP1': 'TPE1',
    'TAL': 'TALB',
    'TYE': 'TYER',
    'TCO': 'TCON',
    'TRK': 'TRCK'
  };
  return mapping[frameId] || null;
}

export function extractAlbumArt(arrayBuffer: ArrayBuffer): { data: string; format: string } | null {
  const dataView = new DataView(arrayBuffer);
  
  if (!hasID3Header(dataView)) {
    return null;
  }
  
  const version = dataView.getUint8(3);
  const size = getID3Size(dataView);
  let offset = 10;
  
  while (offset < size) {
    const frameIdLength = version === 2 ? 3 : 4;
    const frameId = readFrameId(dataView, offset, frameIdLength);
    
    if (!frameId || frameId.trim() === '') break;
    
    const headerSize = version === 2 ? 6 : 10;
    const frameSize = readFrameSize(dataView, offset + frameIdLength, frameIdLength);
    
    if (frameId === 'APIC' || frameId === 'PIC') {
      return extractPicture(dataView, offset + headerSize, frameSize, version);
    }
    
    offset += headerSize + frameSize;
  }
  
  return null;
}

function extractPicture(dataView: DataView, offset: number, size: number, version: number): { data: string; format: string } | null {
  try {
    let currentOffset = offset;
    const encoding = dataView.getUint8(currentOffset);
    currentOffset++;
    
    let mimeType = '';
    if (version >= 3) {
      while (currentOffset < offset + size && dataView.getUint8(currentOffset) !== 0) {
        mimeType += String.fromCharCode(dataView.getUint8(currentOffset));
        currentOffset++;
      }
      currentOffset++;
    } else {
      mimeType = dataView.getUint8(currentOffset) === 0 ? 'image/png' : 'image/jpeg';
      currentOffset++;
    }
    
    const pictureType = dataView.getUint8(currentOffset);
    currentOffset++;
    
    while (currentOffset < offset + size && dataView.getUint8(currentOffset) !== 0) {
      currentOffset++;
    }
    currentOffset++;
    
    const imageData = new Uint8Array(size - (currentOffset - offset));
    for (let i = 0; i < imageData.length; i++) {
      imageData[i] = dataView.getUint8(currentOffset + i);
    }
    
    const base64 = btoa(String.fromCharCode(...imageData));
    
    return {
      data: `data:${mimeType};base64,${base64}`,
      format: mimeType
    };
  } catch (error) {
    console.error('Error extracting album art:', error);
    return null;
  }
}
