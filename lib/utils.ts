import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return getTimeAgoText(0, 'minute'); // 使用 "刚刚" 或相似表达
  } else if (minutes < 60) {
    return getTimeAgoText(minutes, 'minute');
  } else if (hours < 24) {
    return getTimeAgoText(hours, 'hour');
  } else {
    return getTimeAgoText(days, 'day');
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// i18n 多语言支持
export type Language = 'zh' | 'en' | 'ja';

export interface Translations {
  // 页面标题和基本文字
  appTitle: string;
  videoPlayer: string;
  selectLocalFile: string;
  playButton: string;
  loading: string;
  playing: string;

  // 占位符文字
  placeholderTitle: string;
  placeholderDescription: string;
  onlineVideo: string;
  hlsStream: string;
  localFile: string;

  // 输入框和按钮
  inputPlaceholder: string;
  alreadySelected: string;
  replay: string;
  clearCache: string;
  clearAllCache: string;
  copyLink: string;

  // 视频信息
  videoInfo: string;
  basicInfo: string;
  videoTrack: string;
  audioTrack: string;
  advancedInfo: string;
  streamInfo: string;
  qualityLevels: string;
  technicalParams: string;
  formattedInfo: string;
  rawInfo: string;
  rawM3u8Content: string;

  // 状态和提示
  cached: string;
  loadedFromCache: string;
  currentlyPlaying: string;

  // VideoPlayer 统计信息
  statistics: string;
  loadingLocalFileInfo: string;
  loadingVideoInfo: string;
  status: string;
  localFilePlayingInfoLoading: string;
  videoPlayingInfoLoading: string;
  connection: string;
  establishingConnection: string;
  buffer: string;
  buffering: string;
  videoID: string;
  viewportFrames: string;
  currentOptimalRes: string;
  volumeNormalized: string;
  codecs: string;
  color: string;
  connectionSpeed: string;
  networkActivity: string;
  bufferHealth: string;
  date: string;

  // 错误信息
  errorLoading: string;
  copySuccess: string;
  copyFailed: string;

  // 历史记录中的HLS信息翻译
  protocolVersion: string;
  streamType: string;
  targetSegmentDuration: string;
  playlistType: string;
  totalSegments: string;
  mediaSequence: string;
  isEnded: string;
  independentSegments: string;
  allowCache: string;
  totalDuration: string;
  liveStream: string;
  vodStream: string;
  standard: string;
  unknown: string;
  yes: string;
  no: string;
  seconds: string;

  // 历史记录中的视频元数据翻译
  containerFormat: string;
  duration: string;
  fileSize: string;
  resolution: string;
  frameRate: string;
  codecVideo: string;
  codecAudio: string;
  bitrate: string;
  filePath: string;

  // 额外的视频元数据翻译
  fileFormat: string;
  size: string;
  startTime: string;
  codec: string;
  aspectRatio: string;
  pixelFormat: string;
  colorSpace: string;
  profile: string;
  level: string;
  source: string;
  localFile2: string;
  onlineURL: string;
  audioChannels: string;
  audioSampleRate: string;
  noAudio: string;

  // HLS 额外信息
  moreQualityLevels: string;
  manifestURL: string;
  encodingInfo: string;
  streamingMedia: string;
  transmissionProtocol: string;
  noRawInfo: string;

  // VideoPlayer组件翻译
  localFileVideoID: string;
  localFileCodecs: string;
  localFileConnectionSpeed: string;
  localFileExpiredError: string;

  // 加载消息和错误信息
  cannotReadVideoFile: string;
  loadingVideoInfoInBackground: string;
  loadingVideoInfoInBackgroundWithSize: string;

  // 时间格式
  timeAgo: {
    now: string;
    minuteAgo: string;
    minutesAgo: string;
    hourAgo: string;
    hoursAgo: string;
    dayAgo: string;
    daysAgo: string;
  };
}

const translations: Record<Language, Translations> = {
  zh: {
    appTitle: 'VidLoad.cc',
    videoPlayer: '视频播放器',
    selectLocalFile: '选择本地文件',
    playButton: '播放',
    loading: '加载中...',
    playing: '播放中',

    placeholderTitle: 'VidLoad.cc - 隐私优先的视频分析工具',
    placeholderDescription: '添加视频URL开始播放，或选择本地文件',
    onlineVideo: '在线视频',
    hlsStream: 'HLS流',
    localFile: '本地文件',

    inputPlaceholder: '输入视频URL（支持HLS/m3u8和MP4）',
    alreadySelected: '已选择本地文件',
    replay: '重新播放',
    clearCache: '清除缓存',
    clearAllCache: '清除所有缓存',
    copyLink: '复制链接',

    videoInfo: '视频信息',
    basicInfo: '基本信息',
    videoTrack: '视频轨道',
    audioTrack: '音频轨道',
    advancedInfo: '高级信息',
    streamInfo: '流媒体信息',
    qualityLevels: '清晰度档位',
    technicalParams: '技术参数',
    formattedInfo: '格式化信息',
    rawInfo: '原始信息',
    rawM3u8Content: '原始M3U8内容',

    cached: '缓存',
    loadedFromCache: '已从缓存加载视频信息',
    currentlyPlaying: '正在播放',

    statistics: '统计',
    loadingLocalFileInfo: '正在加载本地文件信息...',
    loadingVideoInfo: '正在加载视频信息...',
    status: '状态',
    localFilePlayingInfoLoading: '本地文件正在播放，信息加载中',
    videoPlayingInfoLoading: '视频正在播放，信息加载中',
    connection: '连接',
    establishingConnection: '建立连接中...',
    buffer: '缓冲',
    buffering: '缓冲中...',
    videoID: '视频ID / sCPN',
    viewportFrames: '视口 / 帧数',
    currentOptimalRes: '当前 / 最佳分辨率',
    volumeNormalized: '音量 / 标准化',
    codecs: '编解码器',
    color: '色彩',
    connectionSpeed: '连接速度',
    networkActivity: '网络活动',
    bufferHealth: '缓冲健康度',
    date: '日期',

    errorLoading: '加载视频时出错',
    copySuccess: '链接已复制到剪贴板',
    copyFailed: '复制失败',

    protocolVersion: '协议版本',
    streamType: '流类型',
    targetSegmentDuration: '目标段持续时间',
    playlistType: '播放列表类型',
    totalSegments: '总段数',
    mediaSequence: '媒体序列',
    isEnded: '已结束',
    independentSegments: '独立段',
    allowCache: '允许缓存',
    totalDuration: '总持续时间',
    liveStream: '直播流',
    vodStream: '点播流',
    standard: '标准',
    unknown: '未知',
    yes: '是',
    no: '否',
    seconds: '秒',

    containerFormat: '容器格式',
    duration: '持续时间',
    fileSize: '文件大小',
    resolution: '分辨率',
    frameRate: '帧率',
    codecVideo: '视频编码器',
    codecAudio: '音频编码器',
    bitrate: '比特率',
    filePath: '文件路径',

    fileFormat: '文件格式',
    size: '大小',
    startTime: '开始时间',
    codec: '编码器',
    aspectRatio: '宽高比',
    pixelFormat: '像素格式',
    colorSpace: '色彩空间',
    profile: '配置文件',
    level: '级别',
    source: '来源',
    localFile2: '本地文件2',
    onlineURL: '在线URL',
    audioChannels: '音频通道',
    audioSampleRate: '音频采样率',
    noAudio: '无音频',

    moreQualityLevels: '还有 X 个更多档位...',
    manifestURL: '清单URL',
    encodingInfo: '编码信息',
    streamingMedia: '流媒体',
    transmissionProtocol: '传输协议',
    noRawInfo: '无原始信息',

    localFileVideoID: '视频ID',
    localFileCodecs: '编解码器',
    localFileConnectionSpeed: '连接速度',
    localFileExpiredError: '本地文件链接已失效，请重新选择文件',

    cannotReadVideoFile: '无法读取视频文件',
    loadingVideoInfoInBackground: '后台加载视频信息',
    loadingVideoInfoInBackgroundWithSize: '后台加载视频信息（大小）',

    timeAgo: {
      now: '刚刚',
      minuteAgo: '1分钟前',
      minutesAgo: '分钟前',
      hourAgo: '1小时前',
      hoursAgo: '小时前',
      dayAgo: '1天前',
      daysAgo: '天前'
    }
  },
  en: {
    appTitle: 'VidLoad.cc',
    videoPlayer: 'Video Player',
    selectLocalFile: 'Select Local File',
    playButton: 'Play',
    loading: 'Loading...',
    playing: 'Playing',

    placeholderTitle: 'VidLoad.cc - Privacy-First Video Analysis Tool',
    placeholderDescription: 'Add video URL to start playing, or select local file',
    onlineVideo: 'Online Video',
    hlsStream: 'HLS Stream',
    localFile: 'Local File',

    inputPlaceholder: 'Enter video URL (supports HLS/m3u8 and MP4)',
    alreadySelected: 'Local file selected',
    replay: 'Replay',
    clearCache: 'Clear Cache',
    clearAllCache: 'Clear All Cache',
    copyLink: 'Copy Link',

    videoInfo: 'Video Info',
    basicInfo: 'Basic Info',
    videoTrack: 'Video Track',
    audioTrack: 'Audio Track',
    advancedInfo: 'Advanced Info',
    streamInfo: 'Stream Info',
    qualityLevels: 'Quality Levels',
    technicalParams: 'Technical Params',
    formattedInfo: 'Formatted Info',
    rawInfo: 'Raw Info',
    rawM3u8Content: 'Raw M3U8 Content',

    cached: 'Cached',
    loadedFromCache: 'Video info loaded from cache',
    currentlyPlaying: 'Currently Playing',

    statistics: 'Statistics',
    loadingLocalFileInfo: 'Loading local file info...',
    loadingVideoInfo: 'Loading video info...',
    status: 'Status',
    localFilePlayingInfoLoading: 'Local file playing, info loading',
    videoPlayingInfoLoading: 'Video playing, info loading',
    connection: 'Connection',
    establishingConnection: 'Establishing connection...',
    buffer: 'Buffer',
    buffering: 'Buffering...',
    videoID: 'Video ID / sCPN',
    viewportFrames: 'Viewport / Frames',
    currentOptimalRes: 'Current / Optimal Res',
    volumeNormalized: 'Volume / Normalized',
    codecs: 'Codecs',
    color: 'Color',
    connectionSpeed: 'Connection Speed',
    networkActivity: 'Network Activity',
    bufferHealth: 'Buffer Health',
    date: 'Date',

    errorLoading: 'Error loading video',
    copySuccess: 'Link copied to clipboard',
    copyFailed: 'Copy failed',

    protocolVersion: 'Protocol Version',
    streamType: 'Stream Type',
    targetSegmentDuration: 'Target Segment Duration',
    playlistType: 'Playlist Type',
    totalSegments: 'Total Segments',
    mediaSequence: 'Media Sequence',
    isEnded: 'Is Ended',
    independentSegments: 'Independent Segments',
    allowCache: 'Allow Cache',
    totalDuration: 'Total Duration',
    liveStream: 'Live Stream',
    vodStream: 'Vod Stream',
    standard: 'Standard',
    unknown: 'Unknown',
    yes: 'Yes',
    no: 'No',
    seconds: 'Seconds',

    containerFormat: 'Container Format',
    duration: 'Duration',
    fileSize: 'File Size',
    resolution: 'Resolution',
    frameRate: 'Frame Rate',
    codecVideo: 'Video Codec',
    codecAudio: 'Audio Codec',
    bitrate: 'Bitrate',
    filePath: 'File Path',

    fileFormat: 'File Format',
    size: 'Size',
    startTime: 'Start Time',
    codec: 'Codec',
    aspectRatio: 'Aspect Ratio',
    pixelFormat: 'Pixel Format',
    colorSpace: 'Color Space',
    profile: 'Profile',
    level: 'Level',
    source: 'Source',
    localFile2: 'Local File 2',
    onlineURL: 'Online URL',
    audioChannels: 'Audio Channels',
    audioSampleRate: 'Audio Sample Rate',
    noAudio: 'No Audio',

    moreQualityLevels: 'X more quality levels...',
    manifestURL: 'Manifest URL',
    encodingInfo: 'Encoding Info',
    streamingMedia: 'Streaming Media',
    transmissionProtocol: 'Transmission Protocol',
    noRawInfo: 'No Raw Info',

    localFileVideoID: 'Video ID',
    localFileCodecs: 'Codecs',
    localFileConnectionSpeed: 'Connection Speed',
    localFileExpiredError: 'Local file link has expired, please select file again',

    cannotReadVideoFile: 'Cannot read video file',
    loadingVideoInfoInBackground: 'Loading video info in background',
    loadingVideoInfoInBackgroundWithSize: 'Loading video info in background (size)',

    timeAgo: {
      now: 'just now',
      minuteAgo: '1 minute ago',
      minutesAgo: 'minutes ago',
      hourAgo: '1 hour ago',
      hoursAgo: 'hours ago',
      dayAgo: '1 day ago',
      daysAgo: 'days ago'
    }
  },
  ja: {
    appTitle: 'VidLoad.cc',
    videoPlayer: 'ビデオプレイヤー',
    selectLocalFile: 'ローカルファイルを選択',
    playButton: '再生',
    loading: '読み込み中...',
    playing: '再生中',

    placeholderTitle: 'VidLoad.cc - プライバシー重視の動画解析ツール',
    placeholderDescription: 'ビデオURLを追加して再生を開始するか、ローカルファイルを選択してください',
    onlineVideo: 'オンラインビデオ',
    hlsStream: 'HLSストリーム',
    localFile: 'ローカルファイル',

    inputPlaceholder: 'ビデオURL を入力（HLS/m3u8とMP4をサポート）',
    alreadySelected: 'ローカルファイルが選択されました',
    replay: '再生',
    clearCache: 'キャッシュクリア',
    clearAllCache: 'すべてのキャッシュをクリア',
    copyLink: 'リンクをコピー',

    videoInfo: 'ビデオ情報',
    basicInfo: '基本情報',
    videoTrack: 'ビデオトラック',
    audioTrack: 'オーディオトラック',
    advancedInfo: '詳細情報',
    streamInfo: 'ストリーム情報',
    qualityLevels: '品質レベル',
    technicalParams: '技術パラメータ',
    formattedInfo: 'フォーマット済み情報',
    rawInfo: '生情報',
    rawM3u8Content: '生M3U8コンテンツ',

    cached: 'キャッシュ済み',
    loadedFromCache: 'キャッシュからビデオ情報を読み込みました',
    currentlyPlaying: '再生中',

    statistics: '統計',
    loadingLocalFileInfo: 'ローカルファイル情報を読み込み中...',
    loadingVideoInfo: 'ビデオ情報を読み込み中...',
    status: 'ステータス',
    localFilePlayingInfoLoading: 'ローカルファイル再生中、情報読み込み中',
    videoPlayingInfoLoading: 'ビデオ再生中、情報読み込み中',
    connection: '接続',
    establishingConnection: '接続を確立中...',
    buffer: 'バッファ',
    buffering: 'バッファリング中...',
    videoID: 'ビデオID / sCPN',
    viewportFrames: 'ビューポート / フレーム',
    currentOptimalRes: '現在 / 最適解像度',
    volumeNormalized: 'ボリューム / 正規化',
    codecs: 'コーデック',
    color: 'カラー',
    connectionSpeed: '接続速度',
    networkActivity: 'ネットワーク活動',
    bufferHealth: 'バッファヘルス',
    date: '日付',

    errorLoading: 'ビデオの読み込みエラー',
    copySuccess: 'リンクがクリップボードにコピーされました',
    copyFailed: 'コピーに失敗しました',

    protocolVersion: 'プロトコルバージョン',
    streamType: 'ストリームタイプ',
    targetSegmentDuration: 'ターゲットセグメントの持続時間',
    playlistType: 'プレイリストタイプ',
    totalSegments: '総セグメント数',
    mediaSequence: 'メディアシーケンス',
    isEnded: '終了しましたか',
    independentSegments: '独立したセグメント',
    allowCache: 'キャッシュを許可',
    totalDuration: '総持続時間',
    liveStream: 'ライブストリーム',
    vodStream: 'VODストリーム',
    standard: '標準',
    unknown: '不明',
    yes: 'はい',
    no: 'いいえ',
    seconds: '秒',

    containerFormat: 'コンテナーフォーマット',
    duration: '持続時間',
    fileSize: 'ファイルサイズ',
    resolution: '解像度',
    frameRate: 'フレームレート',
    codecVideo: 'ビデオコーデック',
    codecAudio: 'オーディオコーデック',
    bitrate: 'ビットレート',
    filePath: 'ファイルパス',

    fileFormat: 'ファイル形式',
    size: 'サイズ',
    startTime: '開始時間',
    codec: 'コーデック',
    aspectRatio: 'アスペクト比',
    pixelFormat: 'ピクセル形式',
    colorSpace: 'カラースペース',
    profile: 'プロファイル',
    level: 'レベル',
    source: 'ソース',
    localFile2: 'ローカルファイル2',
    onlineURL: 'オンラインURL',
    audioChannels: 'オーディオチャンネル',
    audioSampleRate: 'オーディオサンプルレート',
    noAudio: '音声なし',

    moreQualityLevels: 'さらに X 個の品質レベル...',
    manifestURL: 'マニフェストURL',
    encodingInfo: 'エンコーディング情報',
    streamingMedia: 'ストリーミングメディア',
    transmissionProtocol: '伝送プロトコル',
    noRawInfo: '生情報なし',

    localFileVideoID: 'ビデオID',
    localFileCodecs: 'コーデック',
    localFileConnectionSpeed: '接続速度',
    localFileExpiredError: 'ローカルファイルのリンクが無効になりました。ファイルを再選択してください',

    cannotReadVideoFile: 'ビデオファイルを読み取れません',
    loadingVideoInfoInBackground: 'バックグラウンドでビデオ情報を読み込み中...',
    loadingVideoInfoInBackgroundWithSize: 'バックグラウンドでビデオ情報を読み込み中（サイズ）',
    timeAgo: {
      now: 'たった今',
      minuteAgo: '1分前',
      minutesAgo: '分前',
      hourAgo: '1時間前',
      hoursAgo: '時間前',
      dayAgo: '1日前',
      daysAgo: '日前'
    }
  }
};

// 当前语言状态（可以从localStorage或用户设置获取）
let currentLanguage: Language = 'zh';

export function setLanguage(lang: Language) {
  currentLanguage = lang;
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', lang);
  }
}

// 检测浏览器语言
function detectBrowserLanguage(): Language {
  if (typeof window === 'undefined') return 'en';

  const browserLang = navigator.language || navigator.languages?.[0] || 'en';
  const langCode = browserLang.toLowerCase();

  if (langCode.startsWith('zh')) return 'zh';
  if (langCode.startsWith('ja')) return 'ja';
  return 'en'; // 默认英语
}

export function getCurrentLanguage(): Language {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('language') as Language;
    if (stored && translations[stored]) {
      currentLanguage = stored;
    } else {
      // 如果没有存储的语言设置，使用浏览器语言
      currentLanguage = detectBrowserLanguage();
    }
  }
  return currentLanguage;
}

export function t(key: keyof Translations): string {
  const lang = getCurrentLanguage();
  return translations[lang][key] as string;
}

// 特殊的嵌套key访问函数
export function getTimeAgoText(value: number, unit: 'minute' | 'hour' | 'day'): string {
  const lang = getCurrentLanguage();
  const timeAgo = translations[lang].timeAgo;

  // 处理"刚刚"的情况
  if (value === 0 && unit === 'minute') {
    return timeAgo.now;
  }

  if (value === 1) {
    switch (unit) {
      case 'minute':
        return timeAgo.minuteAgo;
      case 'hour':
        return timeAgo.hourAgo;
      case 'day':
        return timeAgo.dayAgo;
    }
  }

  switch (unit) {
    case 'minute':
      return `${value}${timeAgo.minutesAgo}`;
    case 'hour':
      return `${value}${timeAgo.hoursAgo}`;
    case 'day':
      return `${value}${timeAgo.daysAgo}`;
  }
}

export function getLoadingMessageWithSize(sizeMB: number): string {
  const lang = getCurrentLanguage();
  const baseMessage = t('loadingVideoInfoInBackground');

  switch (lang) {
    case 'zh':
      return `正在后台加载视频信息 (${sizeMB.toFixed(1)}MB)...`;
    case 'en':
      return `Loading video info in background (${sizeMB.toFixed(1)}MB)...`;
    case 'ja':
      return `バックグラウンドでビデオ情報を読み込み中 (${sizeMB.toFixed(1)}MB)...`;
    default:
      return `正在后台加载视频信息 (${sizeMB.toFixed(1)}MB)...`;
  }
}

// 复制到剪贴板功能
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // 降级方案
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      return success;
    }
  } catch (error) {
    console.error('Failed to copy text: ', error);
    return false;
  }
}
