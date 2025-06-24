'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import VideoPlayer from '@/components/VideoPlayer';
import AdSenseAd from '@/components/AdSenseAd';
import { getVideoMetadata, type VideoMetadata } from '@/lib/ffmpeg';
import { parseM3U8, type HLSStreamInfo, type HLSSegment, type HLSVariantPlaylist, formatBandwidth } from '@/lib/hls/parser';
import { formatRelativeTime, Language, setLanguage, getCurrentLanguage, t, copyToClipboard, getLoadingMessageWithSize } from '@/lib/utils';

// 添加一个类型转换函数
function ensureString(value: string | null): string | null | undefined {
  if (value === null) return null;
  if (typeof value === 'string' && value.length > 0) return value;
  return undefined;
}

// 工具函数：处理响应文本
async function processResponseText(response: Response): Promise<string | undefined> {
  if (!response.ok) return undefined;

  let text: string;
  try {
    text = await response.text();
  } catch (error) {
    console.error('Error reading response text:', error);
    return undefined;
  }

  return text.trim() || undefined;
}

// 视频信息历史记录接口
interface VideoHistoryItem {
  id: string;
  url: string;
  isLocal: boolean;
  timestamp: number;
  metadata?: VideoMetadata;
  hlsInfo?: HLSStreamInfo;
  fileName?: string;
  filePath?: string; // 添加文件路径字段
  fileSize?: number; // 添加文件大小字段
  rawM3u8Content?: any;  // 使用 any 类型暂时绕过类型检查
  fromCache?: boolean; // 标记是否来自缓存
}

// 缓存项接口
interface CacheItem {
  url: string;
  metadata?: VideoMetadata;
  hlsInfo?: HLSStreamInfo;
  rawM3u8Content?: any;
  timestamp: number;
  fileName?: string;
  filePath?: string;
  fileSize?: number;
}

// Tab类型
type TabType = 'formatted' | 'raw';

// 扩展HLSStreamInfo类型
interface ExtendedHLSStreamInfo extends HLSStreamInfo {
  version?: string;
}

// 缓存管理工具函数
const CACHE_KEY = 'video-metadata-cache';
const HISTORY_KEY = 'video-history';
const CACHE_EXPIRY_DAYS = 7; // 缓存7天
const HISTORY_EXPIRY_DAYS = 30; // 历史记录保存30天

// 简单的字符串hash函数
const simpleHash = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // 转换为32位整数
  }
  return Math.abs(hash).toString(36);
};

const getCacheKey = (url: string, isLocal: boolean, fileName?: string, fileSize?: number): string => {
  if (isLocal && fileName) {
    // 本地文件使用文件名+文件大小的hash作为缓存键，确保唯一性
    const fileIdentifier = fileSize ? `${fileName}-${fileSize}` : fileName;
    return `local-${simpleHash(fileIdentifier)}`;
  }
  // 在线视频使用URL的hash作为缓存键
  return `online-${simpleHash(url)}`;
};

const saveToCache = (key: string, data: CacheItem): void => {
  try {
    const cache = getCache();
    cache[key] = data;
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.warn('Failed to save to cache:', error);
  }
};

const getFromCache = (key: string): CacheItem | null => {
  try {
    const cache = getCache();
    const item = cache[key];
    if (item) {
      // 检查缓存是否过期
      const now = Date.now();
      const expiryTime = item.timestamp + (CACHE_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
      if (now < expiryTime) {
        return item;
      } else {
        // 缓存过期，删除
        delete cache[key];
        localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
      }
    }
  } catch (error) {
    console.warn('Failed to get from cache:', error);
  }
  return null;
};

const getCache = (): Record<string, CacheItem> => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached) : {};
  } catch (error) {
    console.warn('Failed to parse cache:', error);
    return {};
  }
};

const clearCacheItem = (key: string): void => {
  try {
    const cache = getCache();
    delete cache[key];
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.warn('Failed to clear cache item:', error);
  }
};

const clearAllCache = (): void => {
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch (error) {
    console.warn('Failed to clear cache:', error);
  }
};

// 历史记录管理工具函数
const saveHistoryToStorage = (history: VideoHistoryItem[]): void => {
  try {
    // 过滤掉本地文件（因为blob URL在页面刷新后会失效）
    const persistentHistory = history
      .filter(item => !item.isLocal)
      .map(item => ({
        ...item,
        // 移除可能很大的原始内容，减少存储空间
        rawM3u8Content: item.rawM3u8Content ? 'cached' : undefined
      }));

    localStorage.setItem(HISTORY_KEY, JSON.stringify(persistentHistory));
  } catch (error) {
    console.warn('Failed to save history to storage:', error);
  }
};

const loadHistoryFromStorage = (): VideoHistoryItem[] => {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (stored) {
      const history: VideoHistoryItem[] = JSON.parse(stored);
      const now = Date.now();

      // 过滤过期的历史记录
      const validHistory = history.filter(item => {
        const expiryTime = item.timestamp + (HISTORY_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
        return now < expiryTime;
      });

      // 检查每个历史记录项是否有缓存数据
      const historyWithCache = validHistory.map(item => {
        const cacheKey = getCacheKey(item.url, item.isLocal, item.fileName, item.fileSize);
        const cachedData = getFromCache(cacheKey);

        if (cachedData) {
          return {
            ...item,
            fromCache: true,
            metadata: cachedData.metadata,
            hlsInfo: cachedData.hlsInfo,
            rawM3u8Content: cachedData.rawM3u8Content
          };
        }

        return { ...item, fromCache: false };
      });

      // 如果有过期项被过滤，更新存储
      if (validHistory.length !== history.length) {
        saveHistoryToStorage(historyWithCache);
      }

      return historyWithCache;
    }
  } catch (error) {
    console.warn('Failed to load history from storage:', error);
  }
  return [];
};

const clearHistoryStorage = (): void => {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.warn('Failed to clear history storage:', error);
  }
};

export default function Home() {
  const [inputUrl, setInputUrl] = useState('');
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLocalFile, setIsLocalFile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
  const [videoHistory, setVideoHistory] = useState<VideoHistoryItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<TabType>('formatted');
  const [hlsTabStates, setHlsTabStates] = useState<Record<string, TabType>>({});
  const [isMounted, setIsMounted] = useState(false);
  const [language, setLanguageState] = useState<Language>('zh');
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  // 初始化语言设置
  useEffect(() => {
    const currentLang = getCurrentLanguage();
    setLanguageState(currentLang);
  }, []);

  // 语言切换函数
  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    setLanguageState(newLang);
    // 强制重新渲染以更新所有文本
    window.location.reload();
  };

  // 复制链接功能
  const handleCopyLink = async (url: string) => {
    const success = await copyToClipboard(url);
    if (success) {
      setCopySuccess(t('copySuccess'));
      setTimeout(() => setCopySuccess(null), 2000);
    } else {
      setCopySuccess(t('copyFailed'));
      setTimeout(() => setCopySuccess(null), 2000);
    }
  };

  // 确保组件只在客户端渲染
  useEffect(() => {
    setIsMounted(true);
    // 加载历史记录
    const storedHistory = loadHistoryFromStorage();
    setVideoHistory(storedHistory);
  }, []);

  // 清理本地文件URL - 使用useCallback优化
  const cleanupLocalFileUrls = useCallback(() => {
    videoHistory.forEach((item: VideoHistoryItem) => {
      if (item.isLocal && item.url) {
        URL.revokeObjectURL(item.url);
      }
    });
  }, [videoHistory]);

  useEffect(() => {
    return cleanupLocalFileUrls;
  }, [cleanupLocalFileUrls]);

  // 监听历史记录变化，保存到localStorage - 使用useCallback优化
  const saveHistoryCallback = useCallback(() => {
    if (isMounted && videoHistory.length > 0) {
      saveHistoryToStorage(videoHistory);
    }
  }, [videoHistory, isMounted]);

  useEffect(() => {
    saveHistoryCallback();
  }, [saveHistoryCallback]);

  // 生成唯一ID
  const generateId = () => Math.random().toString(36).substr(2, 9);

  // 停止当前播放的视频
  const stopCurrentVideo = useCallback(() => {
    setCurrentUrl(null);
    setIsPlaying(false);
    setError(null); // 清理错误信息
    setLoadingMessage(null); // 清理加载信息
  }, []);

  // 开始播放新视频
  const startNewVideo = useCallback((url: string) => {
    // 先停止当前播放的视频
    stopCurrentVideo();

    // 短暂延迟后开始新视频，确保旧视频完全停止和清理
    setTimeout(() => {
      setCurrentUrl(url);
      setIsPlaying(true);
    }, 150); // 增加延迟时间，确保清理完成
  }, [stopCurrentVideo]);

  // 处理视频播放结束
  const handleVideoEnded = useCallback(() => {
    setIsPlaying(false);
  }, []);

  // 处理视频播放错误
  const handleVideoError = useCallback((error: string) => {
    // 如果是blob URL失效错误，清理相关状态
    if (error.includes('本地文件链接已失效') || error.includes('Local file link has expired') || error.includes('ローカルファイルのリンクが無効')) {
      setCurrentUrl(null);
      setIsPlaying(false);
      setIsLocalFile(false);
      setError(t('localFileExpiredError'));
    } else {
      setError(error);
    }
  }, []);

  // 添加到历史记录，确保唯一性
  const addToHistory = useCallback((item: VideoHistoryItem) => {
    setVideoHistory((prev: VideoHistoryItem[]) => {
      // 检查是否已存在相同的视频
      const existingIndex = prev.findIndex(historyItem => {
        if (item.isLocal && historyItem.isLocal) {
          // 本地文件：比较文件名和文件大小
          return historyItem.fileName === item.fileName && historyItem.fileSize === item.fileSize;
        } else if (!item.isLocal && !historyItem.isLocal) {
          // 在线视频：比较URL
          return historyItem.url === item.url;
        }
        return false;
      });

      if (existingIndex !== -1) {
        // 如果已存在，移除旧的记录，将新的添加到顶部
        const updatedHistory = [...prev];
        updatedHistory.splice(existingIndex, 1);
        return [item, ...updatedHistory];
      } else {
        // 如果不存在，直接添加到顶部
        return [item, ...prev];
      }
    });
  }, []);

  // 重播历史记录中的视频，将其移动到栈顶
  const replayHistoryVideo = useCallback((historyItem: VideoHistoryItem) => {
    // 将URL填入input框
    setInputUrl(historyItem.url);
    setIsLocalFile(historyItem.isLocal);

    // 开始播放视频
    startNewVideo(historyItem.url);

    // 将该视频移动到历史记录栈顶，更新时间戳
    const updatedItem: VideoHistoryItem = {
      ...historyItem,
      timestamp: Date.now(), // 更新时间戳为当前时间
    };

    setVideoHistory((prev: VideoHistoryItem[]) => {
      // 移除原来的记录
      const filteredHistory = prev.filter(item => item.id !== historyItem.id);
      // 将更新的记录添加到顶部
      return [updatedItem, ...filteredHistory];
    });
  }, [startNewVideo]);

  // 处理本地文件上传
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 先停止当前播放的视频
    stopCurrentVideo();

    try {
      setIsLoading(true);
      setError(null);
      setLoadingMessage(null);

      // 创建本地文件URL
      const url = URL.createObjectURL(file);

      // 尝试获取真实的文件路径信息（浏览器安全限制，只能获取有限信息）
      let filePath: string | undefined;

      // 尝试从不同属性获取真实路径信息
      if ((file as any).webkitRelativePath && (file as any).webkitRelativePath !== file.name) {
        filePath = (file as any).webkitRelativePath;
      } else if ((file as any).mozFullPath) {
        filePath = (file as any).mozFullPath;
      } else if ((file as any).fullPath && (file as any).fullPath !== file.name) {
        filePath = (file as any).fullPath;
      }

      // 如果获取不到真实路径，则不设置filePath（保持undefined）

      // 检查缓存
      const cacheKey = getCacheKey(url, true, file.name, file.size);
      const cachedData = getFromCache(cacheKey);

      // 先创建历史记录项
      const historyItem: VideoHistoryItem = {
        id: generateId(),
        url,
        isLocal: true,
        timestamp: Date.now(),
        fileName: file.name,
        filePath: filePath,
        fileSize: file.size,
        rawM3u8Content: undefined,
        fromCache: !!cachedData,
        // 如果有缓存，直接使用缓存数据
        metadata: cachedData?.metadata
      };
      addToHistory(historyItem);

      // 立即切换到本地文件模式并开始播放
      setIsLocalFile(true);
      startNewVideo(url);
      setIsLoading(false);
      setLoadingMessage(null);

      if (cachedData) {
        // 从缓存读取，显示提示
        setLoadingMessage(t('loadedFromCache'));
        setTimeout(() => {
          setLoadingMessage(null);
        }, 2000);
      } else {
        // 没有缓存，异步获取视频元数据
        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > 100) {
          setLoadingMessage(getLoadingMessageWithSize(fileSizeMB));
        } else if (fileSizeMB > 50) {
          setLoadingMessage(getLoadingMessageWithSize(fileSizeMB));
        } else {
          setLoadingMessage(t('loadingVideoInfoInBackground'));
        }

        // 后台获取元数据
        setTimeout(async () => {
          try {
            const metadata = await getVideoMetadata(file);
            console.log('Video metadata:', metadata);

            // 保存到缓存
            const cacheItem: CacheItem = {
              url,
              metadata,
              timestamp: Date.now(),
              fileName: file.name,
              filePath: filePath,
              fileSize: file.size
            };
            saveToCache(cacheKey, cacheItem);

            // 更新历史记录中的元数据
            setVideoHistory(prev =>
              prev.map(item =>
                item.id === historyItem.id
                  ? { ...item, metadata }
                  : item
              )
            );
          } catch (metadataError) {
            console.error('Error getting video metadata:', metadataError);
          } finally {
            setLoadingMessage(null);
          }
        }, 100);
      }
    } catch (err) {
      setError(t('cannotReadVideoFile'));
      setLoadingMessage(null);
      console.error('Error reading file:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // 处理在线视频播放
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;

    // 先停止当前播放的视频
    stopCurrentVideo();

    try {
      setIsLoading(true);
      setError(null);
      setLoadingMessage(null);

      // 验证URL
      new URL(inputUrl);

      // 检查缓存
      const cacheKey = getCacheKey(inputUrl, false);
      const cachedData = getFromCache(cacheKey);

      // 先创建历史记录项
      const historyItem: VideoHistoryItem = {
        id: generateId(),
        url: inputUrl,
        isLocal: false,
        timestamp: Date.now(),
        rawM3u8Content: undefined,
        fromCache: !!cachedData,
        // 如果有缓存，直接使用缓存数据
        metadata: cachedData?.metadata,
        hlsInfo: cachedData?.hlsInfo,
      };
      if (cachedData?.rawM3u8Content) {
        historyItem.rawM3u8Content = cachedData.rawM3u8Content;
      }
      addToHistory(historyItem);

      // 立即切换到在线视频模式并开始播放
      setIsLocalFile(false);
      startNewVideo(inputUrl);
      setIsLoading(false);
      setLoadingMessage(null);

      if (cachedData) {
        // 从缓存读取，显示提示
        setLoadingMessage(t('loadedFromCache'));
        setTimeout(() => {
          setLoadingMessage(null);
        }, 2000);
      } else {
        // 没有缓存，异步获取视频信息
        setTimeout(async () => {
          try {
            // 检查在线视频文件大小（如果可能）
            let hasSetLoadingMessage = false;
            try {
              const headResponse = await fetch(inputUrl, { method: 'HEAD' });
              if (headResponse.ok) {
                const contentLength = headResponse.headers.get('content-length');
                if (contentLength) {
                  const fileSizeMB = parseInt(contentLength, 10) / (1024 * 1024);
                  if (fileSizeMB > 100) {
                    setLoadingMessage(getLoadingMessageWithSize(fileSizeMB));
                    hasSetLoadingMessage = true;
                  } else if (fileSizeMB > 50) {
                    setLoadingMessage(getLoadingMessageWithSize(fileSizeMB));
                    hasSetLoadingMessage = true;
                  }
                }
              }
            } catch (sizeCheckError) {
              console.log('Cannot detect file size, continuing to load...');
            }

            // 如果没有设置大文件提示，设置通用加载提示
            if (!hasSetLoadingMessage) {
              setLoadingMessage(t('loadingVideoInfoInBackground'));
            }

            let hlsInfo: ExtendedHLSStreamInfo | undefined;
            let rawM3u8Content: string | undefined;
            let metadata: VideoMetadata | undefined;

            // 如果是HLS流，解析m3u8信息
            if (inputUrl.toLowerCase().endsWith('.m3u8')) {
              try {
                const response = await fetch(inputUrl);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                // 使用显式类型转换处理响应文本
                let responseText: string;
                try {
                  responseText = await response.text();
                } catch {
                  responseText = '';
                }

                if (responseText.trim()) {
                  rawM3u8Content = responseText;
                  hlsInfo = await parseM3U8(inputUrl) as ExtendedHLSStreamInfo;
                }
              } catch (error) {
                console.error('Error fetching M3U8:', error);
              }

              // 尝试为HLS流也获取视频元数据
              try {
                console.log('Attempting to get metadata for HLS stream:', inputUrl);
                metadata = await getVideoMetadata(inputUrl);
                console.log('Successfully got HLS metadata:', metadata);
              } catch (metadataError) {
                console.warn('Unable to get metadata for HLS stream:', metadataError);
                // HLS流的元数据获取可能失败，这是正常的
              }
            } else {
              // 如果是普通视频，获取元数据
              try {
                console.log('Attempting to get metadata for:', inputUrl);
                metadata = await getVideoMetadata(inputUrl);
                console.log('Successfully got metadata:', metadata);
              } catch (metadataError) {
                console.error('Error getting video metadata:', metadataError);
                // 不要因为元数据获取失败就阻止视频播放
              }
            }

            // 保存到缓存
            const cacheItem: CacheItem = {
              url: inputUrl,
              metadata,
              hlsInfo,
              rawM3u8Content,
              timestamp: Date.now()
            };
            saveToCache(cacheKey, cacheItem);

            // 更新历史记录中的视频信息
            setVideoHistory(prev =>
              prev.map(item =>
                item.id === historyItem.id
                  ? { ...item, hlsInfo, rawM3u8Content, metadata }
                  : item
              )
            );
          } catch (infoError) {
            console.error('Error getting video info:', infoError);
          } finally {
            setLoadingMessage(null);
          }
        }, 100);
      }
    } catch (err) {
      setError('请输入有效的URL');
      setLoadingMessage(null);
      console.error('Error loading video:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  // 渲染HLS信息卡片
  const renderHLSInfo = (item: VideoHistoryItem) => {
    if (!item.hlsInfo) return null;

    const hlsInfo = item.hlsInfo as ExtendedHLSStreamInfo;

    return (
      <div className="bg-gray-800 p-4 rounded-lg text-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-lg">HLS流信息</h3>
          <div className="flex rounded-lg overflow-hidden border border-gray-700">
            <button
              onClick={() => setActiveTab('formatted')}
              className={`px-4 py-2 text-sm transition-colors ${activeTab === 'formatted'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
            >
              格式化信息
            </button>
            <button
              onClick={() => setActiveTab('raw')}
              className={`px-4 py-2 text-sm transition-colors ${activeTab === 'raw'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
            >
              原始信息
            </button>
          </div>
        </div>

        {activeTab === 'formatted' ? (
          <div className="space-y-4">
            {/* Manifest Tags */}
            <div className="bg-gray-900 rounded-lg p-4">
              <h4 className="font-medium mb-3 text-blue-400">Manifest 标签信息</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hlsInfo.manifestTags.version !== undefined && (
                  <div>
                    <span className="text-gray-400">协议版本：</span>
                    <span>v{hlsInfo.manifestTags.version}</span>
                  </div>
                )}
                {hlsInfo.manifestTags.targetDuration !== undefined && (
                  <div>
                    <span className="text-gray-400">目标分片时长：</span>
                    <span>{hlsInfo.manifestTags.targetDuration}秒</span>
                  </div>
                )}
                {hlsInfo.manifestTags.mediaSequence !== undefined && (
                  <div>
                    <span className="text-gray-400">媒体序列号：</span>
                    <span>{hlsInfo.manifestTags.mediaSequence}</span>
                  </div>
                )}
                {hlsInfo.manifestTags.discontinuitySequence !== undefined && (
                  <div>
                    <span className="text-gray-400">不连续序列号：</span>
                    <span>{hlsInfo.manifestTags.discontinuitySequence}</span>
                  </div>
                )}
                {hlsInfo.manifestTags.playlistType && (
                  <div>
                    <span className="text-gray-400">播放列表类型：</span>
                    <span>{hlsInfo.manifestTags.playlistType}</span>
                  </div>
                )}
                <div>
                  <span className="text-gray-400">是否直播：</span>
                  <span>{hlsInfo.isLive ? '是' : '否'}</span>
                </div>
                {hlsInfo.manifestTags.endList !== undefined && (
                  <div>
                    <span className="text-gray-400">是否已结束：</span>
                    <span>{hlsInfo.manifestTags.endList ? '是' : '否'}</span>
                  </div>
                )}
                {hlsInfo.manifestTags.iFramesOnly !== undefined && (
                  <div>
                    <span className="text-gray-400">仅包含I帧：</span>
                    <span>{hlsInfo.manifestTags.iFramesOnly ? '是' : '否'}</span>
                  </div>
                )}
                {hlsInfo.manifestTags.independentSegments !== undefined && (
                  <div>
                    <span className="text-gray-400">独立分片：</span>
                    <span>{hlsInfo.manifestTags.independentSegments ? '是' : '否'}</span>
                  </div>
                )}
                {hlsInfo.manifestTags.allowCache !== undefined && (
                  <div>
                    <span className="text-gray-400">允许缓存：</span>
                    <span>{hlsInfo.manifestTags.allowCache ? '是' : '否'}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Meta信息 */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-gray-900 rounded-lg">
              <div>
                <span className="text-gray-400">类型：</span>
                <span>{hlsInfo.isLive ? '直播流' : '点播流'}</span>
              </div>
              <div>
                <span className="text-gray-400">版本：</span>
                <span>{hlsInfo.version || '未知'}</span>
              </div>
              <div>
                <span className="text-gray-400">目标时长：</span>
                <span>{hlsInfo.targetDuration}秒</span>
              </div>
              {hlsInfo.playlistType && (
                <div>
                  <span className="text-gray-400">播放列表类型：</span>
                  <span>{hlsInfo.playlistType}</span>
                </div>
              )}
              {!hlsInfo.isLive && hlsInfo.segments && (
                <div>
                  <span className="text-gray-400">总时长：</span>
                  <span>
                    {(hlsInfo.segments.reduce((acc, seg) => acc + seg.duration, 0)).toFixed(1)}秒
                  </span>
                </div>
              )}
            </div>

            {/* URL信息 */}
            <div className="space-y-2">
              <div>
                <span className="text-gray-400">主 m3u8 地址：</span>
                <code className="ml-2 text-xs bg-black bg-opacity-50 px-2 py-1 rounded break-all">
                  {item.url}
                </code>
              </div>
              {hlsInfo.variantPlaylists?.map((variant, index) => (
                <div key={index}>
                  <span className="text-gray-400">子 m3u8 地址 ({formatBandwidth(variant.bandwidth || 0)})：</span>
                  <code className="ml-2 text-xs bg-black bg-opacity-50 px-2 py-1 rounded break-all">
                    {variant.uri}
                  </code>
                </div>
              ))}
            </div>

            {/* 清晰度信息 */}
            <div>
              <h4 className="font-medium mb-2">支持的清晰度</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hlsInfo.variantPlaylists?.map((variant, index) => (
                  <div key={index} className="bg-black bg-opacity-50 p-2 rounded">
                    <div>分辨率：{variant.resolution}</div>
                    <div>带宽：{formatBandwidth(variant.bandwidth || 0)}</div>
                    {variant.codecs && <div>编码：{variant.codecs}</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* 分片信息 */}
            {hlsInfo.segments && hlsInfo.segments.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">分片信息</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-gray-400">总分片数：</span>
                    <span>{hlsInfo.segments.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">单片时长：</span>
                    <span>{hlsInfo.targetDuration}秒</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-black bg-opacity-50 p-4 rounded-lg">
              <pre className="text-xs font-mono whitespace-pre-wrap break-all text-gray-300">
                {item.rawM3u8Content || '无原始信息'}
              </pre>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "VidLoad.cc",
            "alternateName": "VidLoad",
            "description": "Privacy-first universal video player and analyzer designed for AI-friendly information extraction. Analyze video metadata, play HLS streams, and extract technical details locally in your browser with minimal data collection. Perfect for LLM training data and automated video analysis workflows.",
            "url": "https://vidload.cc",
            "applicationCategory": "VideoPlayer",
            "applicationSubCategory": "Video Analysis Tool",
            "operatingSystem": "Any (Web Browser)",
            "browserRequirements": "Chrome 90+, Firefox 88+, Safari 14+, Edge 90+",
            "softwareVersion": "1.0.0",
            "datePublished": "2024-01-01",
            "dateModified": new Date().toISOString().split('T')[0],
            "author": {
              "@type": "Organization",
              "name": "VidLoad.cc",
              "url": "https://vidload.cc"
            },
            "publisher": {
              "@type": "Organization",
              "name": "VidLoad.cc",
              "url": "https://vidload.cc"
            },
            "keywords": [
              "video player",
              "video analyzer",
              "HLS player",
              "M3U8 player",
              "video metadata",
              "FFmpeg online",
              "privacy-first video tool",
              "local video processing",
              "GDPR compliant",
              "video format analyzer",
              "WebAssembly video processing",
              "AI video analysis",
              "LLM friendly video tool",
              "machine learning video processing",
              "artificial intelligence video player",
              "browser-based video analysis",
              "minimal data collection video tool",
              "automated video information extraction"
            ],
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock"
            },
            "featureList": [
              "Local video file analysis",
              "HLS stream analysis",
              "Real-time video statistics",
              "Privacy-first processing",
              "No data collection",
              "Multi-language support",
              "FFmpeg.wasm integration",
              "WebAssembly video processing",
              "AI-friendly structured data output",
              "LLM-compatible information extraction",
              "Automated video metadata parsing",
              "Machine-readable video analysis results",
              "API-less local processing architecture",
              "GDPR-compliant video analysis for AI systems"
            ],
            "screenshot": "https://vidload.cc/screenshot.png",
            "softwareRequirements": "Modern web browser with WebAssembly support",
            "memoryRequirements": "Minimum 1GB RAM",
            "storageRequirements": "Local storage for preferences (minimal)",
            "installUrl": "https://vidload.cc",
            "downloadUrl": "https://vidload.cc",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "150",
              "bestRating": "5",
              "worstRating": "1"
            }
          })
        }}
      />

      <main className="min-h-screen bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-8 py-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl">
                  <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-lg backdrop-blur-sm">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-white tracking-tight">VidLoad<span className="text-blue-400">.cc</span></h1>
              </div>

              {/* GitHub链接 */}
              <a
                href="https://github.com/youkale/vidload"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors border border-gray-700"
                title="View on GitHub"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="hidden sm:inline">GitHub</span>
              </a>
            </div>

            {/* 语言切换器 */}
            <div className="relative">
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value as Language)}
                className="appearance-none bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 pr-10 text-sm text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors cursor-pointer"
                title="Select Language"
              >
                <option value="zh" className="bg-gray-800">🇨🇳 中文</option>
                <option value="en" className="bg-gray-800">🇺🇸 English</option>
                <option value="ja" className="bg-gray-800">🇯🇵 日本語</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* 简化的Hero区域 */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Privacy-First Video Analysis
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              Analyze videos and HLS streams locally in your browser
            </p>
          </div>

          {/* 复制成功提示 */}
          {copySuccess && (
            <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
              {copySuccess}
            </div>
          )}

          {/* 简化的输入区域 */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-12">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* 本地文件选择按钮 */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 min-w-[180px]
                    ${isLoading
                      ? 'opacity-50 cursor-not-allowed bg-gray-700'
                      : 'bg-orange-600 hover:bg-orange-700'
                    }
                  `}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span>{isLocalFile ? t('alreadySelected') : t('selectLocalFile')}</span>
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                {/* URL输入框 */}
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder={t('inputPlaceholder')}
                    disabled={isLoading}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-900 border-2 transition-colors text-white placeholder-gray-400
                      ${error
                        ? 'border-red-500 focus:border-red-400'
                        : 'border-gray-700 hover:border-gray-600 focus:border-blue-500'
                      }
                      ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                      focus:outline-none
                    `}
                  />
                  {inputUrl && !isLoading && (
                    <button
                      type="button"
                      onClick={() => setInputUrl('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* 播放按钮 */}
                <button
                  type="submit"
                  disabled={isLoading || !inputUrl.trim() || (isPlaying && currentUrl === inputUrl)}
                  className={`px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 min-w-[140px]
                    ${(isPlaying && currentUrl === inputUrl)
                      ? 'bg-green-600 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'}
                    ${(isLoading || !inputUrl.trim()) ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{t('loading')}</span>
                    </>
                  ) : (isPlaying && currentUrl === inputUrl) ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{t('playing')}</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{t('playButton')}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 加载提示 */}
            {loadingMessage && (
              <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-blue-300">{loadingMessage}</span>
                </div>
              </div>
            )}

            {/* 错误提示 */}
            {error && (
              <div className="bg-red-900/30 border border-red-700 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-red-300">{error}</span>
                </div>
              </div>
            )}
          </form>

          {/* Video Player */}
          <div className="bg-gray-800 rounded-lg p-6 mb-12">
            <VideoPlayer
              url={isPlaying && currentUrl ? currentUrl : undefined}
              onEnded={handleVideoEnded}
              isLocalFile={isLocalFile}
              onError={handleVideoError}
            />
          </div>

          {/* Video Information History */}
          {videoHistory.length > 0 && (
            <div className="bg-gray-800 rounded-lg p-6 mb-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">
                  Analysis History
                </h3>
                <button
                  onClick={() => {
                    clearAllCache();
                    clearHistoryStorage();
                    setVideoHistory([]);
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors text-white"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    {t('clearAllCache')}
                  </div>
                </button>
              </div>
              <div className="space-y-4">
                {videoHistory.map((item: VideoHistoryItem) => (
                  <div key={item.id} className="bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-medium break-all">
                          {item.isLocal
                            ? (item.fileName || t('localFile'))
                            : item.url
                          }
                        </h3>
                        {item.isLocal && item.filePath && (
                          <p className="text-xs text-gray-500 mt-1 break-all">
                            {t('filePath')}: {item.filePath}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-sm text-gray-400">
                            {formatRelativeTime(item.timestamp)}
                          </p>
                          {item.fromCache && (
                            <span className="px-2 py-1 bg-green-900/30 border border-green-700 text-green-300 text-xs rounded">
                              {t('cached')}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="ml-4 flex items-center gap-2">
                        {(isPlaying && currentUrl === item.url) ? (
                          <div className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium text-sm">
                            <span className="inline-block w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                            {t('currentlyPlaying')}
                          </div>
                        ) : !item.isLocal ? (
                          <>
                            <button
                              onClick={() => handleCopyLink(item.url)}
                              className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                              title={t('copyLink')}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </button>

                            <button
                              onClick={() => replayHistoryVideo(item)}
                              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                              title={t('replay')}
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </button>
                          </>
                        ) : (
                          <div className="p-2 bg-gray-600 text-gray-300 rounded-lg">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m-2 4h2M7 7h.01M7 11h.01M7 15h.01" />
                            </svg>
                          </div>
                        )}

                        {item.fromCache && (
                          <button
                            onClick={() => {
                              const cacheKey = getCacheKey(item.url, item.isLocal, item.fileName, item.fileSize);
                              clearCacheItem(cacheKey);
                              setVideoHistory(prev =>
                                prev.filter(historyItem => historyItem.id !== item.id)
                              );
                            }}
                            className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            title={t('clearCache')}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Video Information Display */}
                    {(item.metadata || item.hlsInfo) && (
                      <div className="mt-4">
                        <div className="flex items-center gap-3 mb-3">
                          <h4 className="font-medium text-green-400">{t('videoInfo')}</h4>
                          {item.url.toLowerCase().includes('.m3u8') ? (
                            <span className="px-2 py-1 bg-purple-900/30 border border-purple-700 text-purple-300 text-xs rounded">
                              {t('hlsStream')}
                            </span>
                          ) : item.isLocal ? (
                            <span className="px-2 py-1 bg-orange-900/30 border border-orange-700 text-orange-300 text-xs rounded">
                              {t('localFile')}
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-blue-900/30 border border-blue-700 text-blue-300 text-xs rounded">
                              {t('onlineVideo')}
                            </span>
                          )}
                        </div>

                        {item.url.toLowerCase().includes('.m3u8') && item.hlsInfo ? (
                          <div className="space-y-4">
                            <div className="flex rounded-lg overflow-hidden border border-gray-700 w-fit">
                              <button
                                onClick={() => setHlsTabStates(prev => ({ ...prev, [item.id]: 'formatted' }))}
                                className={`px-4 py-2 text-sm transition-colors ${(hlsTabStates[item.id] || 'formatted') === 'formatted'
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                  }`}
                              >
                                {t('formattedInfo')}
                              </button>
                              <button
                                onClick={() => setHlsTabStates(prev => ({ ...prev, [item.id]: 'raw' }))}
                                className={`px-4 py-2 text-sm transition-colors ${hlsTabStates[item.id] === 'raw'
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                  }`}
                              >
                                {t('rawInfo')}
                              </button>
                            </div>

                            {(hlsTabStates[item.id] || 'formatted') === 'formatted' ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                                <div className="bg-gray-800 rounded-lg p-3">
                                  <h5 className="font-medium mb-2 text-blue-300">{t('basicInfo')}</h5>
                                  <div className="space-y-1">
                                    <div><span className="text-gray-400">{t('protocolVersion')}：</span><span>HLS v{item.hlsInfo.manifestTags?.version || t('unknown')}</span></div>
                                    <div><span className="text-gray-400">{t('streamType')}：</span><span>{item.hlsInfo.isLive ? t('liveStream') : t('vodStream')}</span></div>
                                    <div><span className="text-gray-400">{t('targetSegmentDuration')}：</span><span>{item.hlsInfo.targetDuration}{t('seconds')}</span></div>
                                    <div><span className="text-gray-400">{t('playlistType')}：</span><span>{item.hlsInfo.playlistType || t('standard')}</span></div>
                                    {item.hlsInfo.segments && (
                                      <div><span className="text-gray-400">{t('totalSegments')}：</span><span>{item.hlsInfo.segments.length}</span></div>
                                    )}
                                  </div>
                                </div>

                                <div className="bg-gray-800 rounded-lg p-3">
                                  <h5 className="font-medium mb-2 text-blue-300">{t('streamInfo')}</h5>
                                  <div className="space-y-1">
                                    <div><span className="text-gray-400">{t('mediaSequence')}：</span><span>{item.hlsInfo.manifestTags?.mediaSequence || t('unknown')}</span></div>
                                    <div><span className="text-gray-400">{t('isEnded')}：</span><span>{item.hlsInfo.manifestTags?.endList ? t('yes') : t('no')}</span></div>
                                    <div><span className="text-gray-400">{t('independentSegments')}：</span><span>{item.hlsInfo.manifestTags?.independentSegments ? t('yes') : t('no')}</span></div>
                                    <div><span className="text-gray-400">{t('allowCache')}：</span><span>{item.hlsInfo.manifestTags?.allowCache !== false ? t('yes') : t('no')}</span></div>
                                    {!item.hlsInfo.isLive && item.hlsInfo.segments && (
                                      <div><span className="text-gray-400">{t('totalDuration')}：</span><span>{(item.hlsInfo.segments.reduce((acc, seg) => acc + seg.duration, 0)).toFixed(1)}{t('seconds')}</span></div>
                                    )}
                                  </div>
                                </div>

                                {item.hlsInfo.variantPlaylists && item.hlsInfo.variantPlaylists.length > 0 && (
                                  <div className="bg-gray-800 rounded-lg p-3">
                                    <h5 className="font-medium mb-2 text-blue-300">{t('qualityLevels')}</h5>
                                    <div className="space-y-1">
                                      {item.hlsInfo.variantPlaylists.slice(0, 5).map((variant, index) => (
                                        <div key={index}>
                                          <span className="text-gray-400">{variant.resolution}：</span>
                                          <span>{formatBandwidth(variant.bandwidth || 0)}</span>
                                        </div>
                                      ))}
                                      {item.hlsInfo.variantPlaylists.length > 5 && (
                                        <div className="text-gray-500 text-xs mt-1">
                                          {t('moreQualityLevels').replace('X', (item.hlsInfo.variantPlaylists.length - 5).toString())}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="bg-gray-800 rounded-lg p-4">
                                <h5 className="font-medium mb-3 text-blue-300">{t('rawM3u8Content')}</h5>
                                <div className="bg-black bg-opacity-50 p-3 rounded">
                                  <pre className="text-xs font-mono whitespace-pre-wrap break-all text-gray-300 max-h-96 overflow-y-auto">
                                    {item.rawM3u8Content || t('noRawInfo')}
                                  </pre>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : item.metadata ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                            <div className="bg-gray-800 rounded-lg p-3">
                              <h5 className="font-medium mb-2 text-blue-300">{t('basicInfo')}</h5>
                              <div className="space-y-1">
                                <div><span className="text-gray-400">{t('containerFormat')}：</span><span>{item.metadata.container}</span></div>
                                <div><span className="text-gray-400">{t('fileFormat')}：</span><span>{item.metadata.format}</span></div>
                                <div><span className="text-gray-400">{t('duration')}：</span><span>{item.metadata.duration}</span></div>
                                <div><span className="text-gray-400">{t('size')}：</span><span>{item.metadata.size}</span></div>
                                <div><span className="text-gray-400">{t('startTime')}：</span><span>{item.metadata.startTime}s</span></div>
                              </div>
                            </div>

                            <div className="bg-gray-800 rounded-lg p-3">
                              <h5 className="font-medium mb-2 text-blue-300">{t('videoTrack')}</h5>
                              <div className="space-y-1">
                                <div><span className="text-gray-400">{t('codec')}：</span><span>{item.metadata.codec}</span></div>
                                <div><span className="text-gray-400">{t('resolution')}：</span><span>{item.metadata.resolution}</span></div>
                                <div><span className="text-gray-400">{t('frameRate')}：</span><span>{item.metadata.frameRate}</span></div>
                                <div><span className="text-gray-400">{t('bitrate')}：</span><span>{item.metadata.bitrate}</span></div>
                                <div><span className="text-gray-400">{t('aspectRatio')}：</span><span>{item.metadata.aspectRatio}</span></div>
                              </div>
                            </div>

                            <div className="bg-gray-800 rounded-lg p-3">
                              <h5 className="font-medium mb-2 text-blue-300">{t('advancedInfo')}</h5>
                              <div className="space-y-1">
                                <div><span className="text-gray-400">{t('pixelFormat')}：</span><span>{item.metadata.pixelFormat}</span></div>
                                <div><span className="text-gray-400">{t('colorSpace')}：</span><span>{item.metadata.colorSpace}</span></div>
                                <div><span className="text-gray-400">{t('profile')}：</span><span>{item.metadata.profile}</span></div>
                                <div><span className="text-gray-400">{t('level')}：</span><span>{item.metadata.level}</span></div>
                                <div><span className="text-gray-400">{t('source')}：</span><span>{item.metadata.source === 'local' ? t('localFile') : t('onlineURL')}</span></div>
                              </div>
                            </div>

                            <div className="bg-gray-800 rounded-lg p-3">
                              <h5 className="font-medium mb-2 text-blue-300">{t('audioTrack')}</h5>
                              <div className="space-y-1">
                                <div><span className="text-gray-400">{t('codecAudio')}：</span><span>{item.metadata.audioCodec || t('noAudio')}</span></div>
                                <div><span className="text-gray-400">{t('audioChannels')}：</span><span>{item.metadata.audioChannels || t('noAudio')}</span></div>
                                <div><span className="text-gray-400">{t('audioSampleRate')}：</span><span>{item.metadata.audioSampleRate || t('noAudio')}</span></div>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Educational Content Section */}
          <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-700 rounded-xl p-6 mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-green-400 mb-3">📚 Learn Video Fundamentals</h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                Want to understand the differences between video resolution, bitrate, and frame rate? We explain these important concepts in the simplest way possible!
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-green-800/30 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">📺</div>
                <h3 className="font-semibold text-green-300 mb-2">Resolution</h3>
                <p className="text-sm text-gray-300">Determines picture clarity<br />720p, 1080p, 4K differences</p>
              </div>
              <div className="bg-blue-800/30 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">🚀</div>
                <h3 className="font-semibold text-blue-300 mb-2">Bitrate</h3>
                <p className="text-sm text-gray-300">Affects file size and quality<br />Finding the perfect balance</p>
              </div>
              <div className="bg-purple-800/30 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">🎬</div>
                <h3 className="font-semibold text-purple-300 mb-2">Frame Rate</h3>
                <p className="text-sm text-gray-300">Controls motion smoothness<br />24fps vs 60fps choices</p>
              </div>
            </div>
            <div className="text-center mt-6">
              <Link
                href="/video-basics"
                className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Start Learning Video Basics
              </Link>
            </div>
          </div>

          {/* 广告展示区域 */}
          <div className="flex justify-center mb-8">
            <AdSenseAd
              adSlot="1234567890"
              adFormat="horizontal"
              className="max-w-2xl w-full"
            />
          </div>

          {/* 简化的底部链接 */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Learn More</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <Link
                  href="/video-basics"
                  className="inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Video Basics
                </Link>
                <Link
                  href="/video-formats"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Video Formats
                </Link>
                <Link
                  href="/use-cases"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h6m-6 4h6m-2 4h2M7 7h.01M7 11h.01M7 15h.01" />
                  </svg>
                  Use Cases
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  About Us
                </Link>
                <Link
                  href="/for-ai"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  AI Reference
                </Link>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <div className="text-center">
                <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-gray-400 mb-2">
                  <div className="flex items-center gap-6">
                    <Link href="/privacy" className="hover:text-white transition-colors">
                      Privacy Policy
                    </Link>
                    <Link href="/terms" className="hover:text-white transition-colors">
                      Terms of Service
                    </Link>
                    <Link href="/cookies" className="hover:text-white transition-colors">
                      Cookie Policy
                    </Link>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  © 2024 <span className="font-semibold">VidLoad.cc</span> - Privacy-First Video Analysis
                </div>
                <div className="text-xs text-gray-500">
                  🔒 All processing happens locally in your browser - No data collection, No tracking
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
