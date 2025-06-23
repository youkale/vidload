'use client';

import React, { useRef, useState, useEffect, FC, memo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Hls from 'hls.js';
import { t } from '../lib/utils';

// 优化的进度条组件，避免不必要的重新渲染
const ProgressBar = memo(({
  percent,
  color,
  value,
  unit = 'Mbps'
}: {
  percent: number;
  color: string;
  value: number;
  unit?: string;
}) => (
  <div className="flex items-center gap-2">
    <div className="flex-1 max-w-[140px] h-2 bg-gray-700 rounded overflow-hidden">
      <div
        className={`h-full ${color} transition-all duration-500 ease-out`}
        style={{ width: `${percent}%` }}
      ></div>
    </div>
    <span className="text-white font-light whitespace-nowrap min-w-[80px] text-right">
      {unit === 'Mbps' ? (
        value >= 1000000
          ? `${(value / 1000000).toFixed(1)} Mbps`
          : value > 0
            ? `${Math.round(value / 1000)} Kbps`
            : '0 bps'
      ) : (
        `${value.toFixed(1)}${unit}`
      )}
    </span>
  </div>
));

ProgressBar.displayName = 'ProgressBar';

interface VideoPlayerProps {
  url?: string;
  onEnded?: () => void;
  isLocalFile?: boolean;
  onError?: (error: string) => void;
}

interface VideoInfo {
  videoId?: string;
  viewport: string;
  droppedFrames: string;
  currentResolution: string;
  optimalResolution: string;
  volume: string;
  normalizedVolume: string;
  codecs: string;
  colorSpace: string;
  connectionSpeed: string;
  bufferHealth: string;
  networkActivity: number;
  mysteryText?: string;
  date: string;
}

// 动态导入 hls.js，仅在客户端加载
const VideoPlayer: FC<VideoPlayerProps> = ({ url, onEnded, isLocalFile = false, onError }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<any | null>(null);
  const statsIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentUrlRef = useRef<string | undefined>(undefined);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [showStats, setShowStats] = useState(true);
  const [isLoadingVideoInfo, setIsLoadingVideoInfo] = useState(false);
  const [networkStats, setNetworkStats] = useState({
    connectionSpeed: 0,
    networkActivity: 0,
    bufferHealth: 0
  });
  const lastStatsUpdateRef = useRef<number>(0);



  // 优化的网络统计更新函数，使用useCallback避免重新创建
  const updateNetworkStatsOptimized = useCallback((connectionSpeed: number, networkActivity: number, bufferHealth: number) => {
    const newStats = {
      connectionSpeed: Math.round(connectionSpeed),
      networkActivity: Math.round(networkActivity),
      bufferHealth: Math.round(bufferHealth * 10) / 10 // 保留1位小数
    };

    // 只有当数值有明显变化时才更新状态
    const now = Date.now();
    if (now - lastStatsUpdateRef.current > 1500) { // 增加到1.5秒间隔
      const hasSignificantChange =
        Math.abs(newStats.connectionSpeed - networkStats.connectionSpeed) > Math.max(networkStats.connectionSpeed * 0.25, 500000) ||
        Math.abs(newStats.networkActivity - networkStats.networkActivity) > Math.max(networkStats.networkActivity * 0.25, 500000) ||
        Math.abs(newStats.bufferHealth - networkStats.bufferHealth) > 2.0;

      if (hasSignificantChange || networkStats.connectionSpeed === 0) {
        setNetworkStats(newStats);
        lastStatsUpdateRef.current = now;
      }
    }
  }, [networkStats.connectionSpeed, networkStats.networkActivity, networkStats.bufferHealth]);

  // 确保组件只在客户端渲染
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 当URL变化时立即清理状态，防止视频交替播放
  useEffect(() => {
    if (!isClient) return;

    const video = videoRef.current;
    if (!video) return;

    // 当URL为空时，确保视频停止播放
    if (!url) {
      video.pause();
      video.currentTime = 0;
      // 只在确实需要清理时才清空src
      if (video.src && video.src !== '') {
        video.src = '';
        video.load();
      }
      setVideoInfo(null);
      setError(null);
      setIsLoading(false);
      setIsLoadingVideoInfo(false);

      // 清理HLS实例
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    }
  }, [url, isClient]);

  const formatBitrate = (bits: number): string => {
    if (bits >= 1000000) {
      return `${(bits / 1000000).toFixed(2)} Mbps`;
    }
    return `${(bits / 1000).toFixed(2)} Kbps`;
  };

  const updateHlsStats = async () => {
    if (isLocalFile) {
      // 本地文件不需要HLS统计信息，但需要基本的视频统计
      updateLocalFileStats();
      return;
    }

    const video = videoRef.current;
    const hls = hlsRef.current;

    if (!video || !hls) return;

    try {
      const currentLevel = hls.currentLevel;
      const levels = hls.levels;
      const currentLevelDetails = currentLevel !== -1 ? levels[currentLevel] : null;

      // 获取缓冲区信息 - 计算前向缓冲区（从当前播放位置到缓冲区末尾）
      const buffered = video.buffered;
      const currentTime = video.currentTime || 0;

      let forwardBuffer = 0;
      let totalBuffered = 0;

      for (let i = 0; i < buffered.length; i++) {
        const start = buffered.start(i);
        const end = buffered.end(i);
        totalBuffered += (end - start);

        // 找到包含当前播放时间的缓冲区段
        if (currentTime >= start && currentTime <= end) {
          forwardBuffer = end - currentTime;
        }
      }

      // 获取播放质量信息
      const playbackQuality = video.getVideoPlaybackQuality?.() || {
        droppedVideoFrames: 0,
        totalVideoFrames: 0,
        creationTime: 0,
        totalFrameDelay: 0
      };

      // 获取网络状态 - 参考YouTube统计信息格式
      const bandwidthEstimate = hls.bandwidthEstimate || 0;
      const currentBandwidth = currentLevelDetails?.bitrate || 0;

      // Connection Speed: 使用HLS估算的带宽
      const connectionSpeed = bandwidthEstimate;

      // Network Activity: 更动态的网络活动计算
      let networkActivity = 0;
      if (!video.paused) {
        // 基于当前播放质量和缓冲状态
        const baseActivity = currentBandwidth || bandwidthEstimate * 0.7;

        // 如果缓冲区不足，网络活动会更高（需要更多数据）
        if (forwardBuffer < 10) {
          networkActivity = baseActivity * 1.3;
        } else if (forwardBuffer > 20) {
          // 缓冲区充足时，网络活动较低
          networkActivity = baseActivity * 0.7;
        } else {
          networkActivity = baseActivity;
        }

        // 添加轻微的周期性变化来模拟网络波动，避免随机闪烁
        const time = Date.now() / 1000; // 当前时间（秒）
        const variation = Math.sin(time * 0.5) * 0.1; // ±10%的平滑变化
        networkActivity *= (1 + variation);
      }

      // 调试信息（仅在开发模式下输出）
      if (process.env.NODE_ENV === 'development' && Math.random() < 0.1) { // 只有10%的概率输出
        console.log('HLS Network Activity Debug:', {
          paused: video.paused,
          currentBandwidth: currentBandwidth,
          networkActivity: networkActivity,
          currentLevel: currentLevel,
          bandwidthEstimate: bandwidthEstimate
        });
      }

      // 使用优化的网络统计更新
      updateNetworkStatsOptimized(connectionSpeed, networkActivity, forwardBuffer);

      // 获取音量信息
      const volume = video.volume;
      const muted = video.muted;

      setVideoInfo({
        videoId: url?.split('/').pop() || 'Unknown',
        viewport: `${video.clientWidth}x${video.clientHeight}*${window.devicePixelRatio.toFixed(2)} / ${playbackQuality.droppedVideoFrames} dropped of ${playbackQuality.totalVideoFrames}`,
        droppedFrames: `${playbackQuality.droppedVideoFrames} dropped of ${playbackQuality.totalVideoFrames}`,
        currentResolution: currentLevelDetails
          ? `${currentLevelDetails.width}x${currentLevelDetails.height}@${currentLevelDetails.attrs?.['FRAME-RATE'] || video.playbackRate * 30}`
          : `${video.videoWidth}x${video.videoHeight}@${video.playbackRate * 30}`,
        optimalResolution: levels.length > 0
          ? `${levels[levels.length - 1].width}x${levels[levels.length - 1].height}@${levels[levels.length - 1].attrs?.['FRAME-RATE'] || 30}`
          : `${video.videoWidth}x${video.videoHeight}@30`,
        volume: muted ? 'Muted' : `${Math.round(volume * 100)}%`,
        normalizedVolume: currentLevelDetails?.audioCodec
          ? `DRC (${currentLevelDetails.audioCodec})`
          : 'DRC (audio)',
        codecs: currentLevelDetails?.codecSet || 'Unknown',
        colorSpace: 'bt709',
        connectionSpeed: `${Math.round(connectionSpeed / 1024)} Kbps`,
        bufferHealth: `${forwardBuffer.toFixed(2)} s`,
        networkActivity: networkActivity,
        mysteryText: `SABR, s:${video.playbackRate} t:${currentTime.toFixed(2)} b:${forwardBuffer.toFixed(3)} L pLi:${currentLevel}`,
        date: new Date().toLocaleString('en-US', {
          timeZone: 'Asia/Shanghai',
          hour12: false,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      });
    } catch (error) {
      console.error('Error updating HLS stats:', error);
    }
  };

  // 新增：本地文件统计信息更新函数
  const updateLocalFileStats = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    try {
      const playbackQuality = video.getVideoPlaybackQuality?.() || {
        droppedVideoFrames: 0,
        totalVideoFrames: 0,
        creationTime: 0,
        totalFrameDelay: 0
      };

      // 获取缓冲区信息
      const buffered = video.buffered;
      const currentTime = video.currentTime || 0;
      let forwardBuffer = 0;

      for (let i = 0; i < buffered.length; i++) {
        const start = buffered.start(i);
        const end = buffered.end(i);
        if (currentTime >= start && currentTime <= end) {
          forwardBuffer = end - currentTime;
        }
      }

      // 获取音量信息
      const volume = video.volume;
      const muted = video.muted;

      // 为本地文件设置基本的统计信息
      setVideoInfo({
        videoId: t('localFile'),
        viewport: `${video.clientWidth}x${video.clientHeight}*${window.devicePixelRatio.toFixed(2)} / ${playbackQuality.droppedVideoFrames} dropped of ${playbackQuality.totalVideoFrames}`,
        droppedFrames: `${playbackQuality.droppedVideoFrames} dropped of ${playbackQuality.totalVideoFrames}`,
        currentResolution: `${video.videoWidth}x${video.videoHeight}@${Math.round(video.playbackRate * 30)}`,
        optimalResolution: `${video.videoWidth}x${video.videoHeight}@${Math.round(video.playbackRate * 30)}`,
        volume: muted ? 'Muted' : `${Math.round(volume * 100)}%`,
        normalizedVolume: 'DRC (local)',
        codecs: t('localFileCodecs'),
        colorSpace: 'bt709',
        connectionSpeed: t('localFile'),
        bufferHealth: `${forwardBuffer.toFixed(2)} s`,
        networkActivity: 0,
        mysteryText: `Local File, t:${currentTime.toFixed(2)} b:${forwardBuffer.toFixed(3)}`,
        date: new Date().toLocaleString('en-US', {
          timeZone: 'Asia/Shanghai',
          hour12: false,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      });

      // 为本地文件设置简化的网络统计（主要是缓冲信息）
      updateNetworkStatsOptimized(0, 0, forwardBuffer);
    } catch (error) {
      console.error('Error updating local file stats:', error);
    }
  }, [updateNetworkStatsOptimized]);

  const updateRegularVideoStats = useCallback(() => {
    if (isLocalFile) {
      // 本地文件不需要网络统计信息，但需要基本的视频统计
      updateLocalFileStats();
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    try {
      const playbackQuality = video.getVideoPlaybackQuality?.() || {
        droppedVideoFrames: 0,
        totalVideoFrames: 0,
        creationTime: 0,
        totalFrameDelay: 0
      };

      // 获取缓冲区信息 - 计算前向缓冲区
      const buffered = video.buffered;
      const currentTime = video.currentTime || 0;
      const duration = video.duration || 0;
      const playbackRate = video.playbackRate || 1;

      let forwardBuffer = 0;
      let totalBuffered = 0;

      for (let i = 0; i < buffered.length; i++) {
        const start = buffered.start(i);
        const end = buffered.end(i);
        totalBuffered += (end - start);

        // 找到包含当前播放时间的缓冲区段
        if (currentTime >= start && currentTime <= end) {
          forwardBuffer = end - currentTime;
        }
      }

      // 简化的连接速度估算
      const videoPixels = video.videoWidth * video.videoHeight;
      const estimatedBitrate = videoPixels > 0
        ? Math.min(videoPixels * 0.05, 8000000) // 简化估算，最大8Mbps
        : 1500000; // 默认1.5Mbps

      // 简化的网络活动计算
      let networkActivity = 0;
      if (!video.paused && forwardBuffer >= 0) {
        // 基于缓冲状态的简单计算
        if (forwardBuffer < 3) {
          networkActivity = estimatedBitrate * 1.2;
        } else if (forwardBuffer > 10) {
          networkActivity = estimatedBitrate * 0.6;
        } else {
          networkActivity = estimatedBitrate * 0.8;
        }
      }

      // 简化的连接速度计算
      const connectionSpeed = estimatedBitrate;

      // 仅在必要时输出调试信息（减少频率）
      if (process.env.NODE_ENV === 'development' && Math.random() < 0.1) { // 只有10%的概率输出
        console.log('Regular Video Network Activity Debug:', {
          paused: video.paused,
          estimatedBitrate: estimatedBitrate,
          networkActivity: networkActivity,
          videoPixels: videoPixels,
          forwardBuffer: forwardBuffer
        });
      }

      // 使用优化的网络统计更新
      updateNetworkStatsOptimized(connectionSpeed, networkActivity, forwardBuffer);

      setVideoInfo({
        videoId: url?.split('/').pop() || 'Unknown',
        viewport: `${video.clientWidth}x${video.clientHeight}*${window.devicePixelRatio.toFixed(2)}`,
        droppedFrames: `${playbackQuality.droppedVideoFrames} dropped of ${playbackQuality.totalVideoFrames}`,
        currentResolution: `${video.videoWidth}x${video.videoHeight}@${Math.round(playbackRate * 30)}`,
        optimalResolution: `${video.videoWidth}x${video.videoHeight}@30`,
        volume: video.muted ? 'Muted' : `${Math.round(video.volume * 100)}%`,
        normalizedVolume: 'DRC (audio)',
        codecs: 'Unknown',
        colorSpace: 'bt709',
        connectionSpeed: `${Math.round(connectionSpeed / 1024)} Kbps`,
        bufferHealth: `${forwardBuffer.toFixed(2)} s`,
        networkActivity: networkActivity,
        mysteryText: `SABR, s:${playbackRate} t:${currentTime.toFixed(2)} b:${forwardBuffer.toFixed(3)}`,
        date: new Date().toLocaleString('en-US', {
          timeZone: 'Asia/Shanghai',
          hour12: false,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      });
    } catch (error) {
      console.error('Error updating regular video stats:', error);
    }
  }, [isLocalFile, updateLocalFileStats, updateNetworkStatsOptimized, url]);

  useEffect(() => {
    if (!url || !isClient) return;

    // 检查URL是否真的发生了变化
    if (currentUrlRef.current === url) {
      return; // URL没有变化，不需要重新初始化
    }

    const video = videoRef.current;
    if (!video) return;

    // 立即清理之前的状态，防止多个视频同时播放
    video.pause();
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    // 更新URL引用（在比较之后）
    currentUrlRef.current = url;

    let statsInterval: NodeJS.Timeout;
    let canPlayListener: ((e: Event) => void) | null = null;
    let loadedMetadataListener: ((e: Event) => void) | null = null;
    let endedListener: ((e: Event) => void) | null = null;

    const initializePlayer = async () => {
      // Clean up previous instance
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }

      // 清理之前的统计信息更新间隔
      if (statsIntervalRef.current) {
        clearInterval(statsIntervalRef.current);
        statsIntervalRef.current = null;
      }

      // 停止当前播放并重置video元素
      video.pause();
      video.currentTime = 0;
      // 不要立即清空src，等到新的src设置后再清理
      video.load(); // 重置video元素状态

      setIsLoading(true);
      setError(null);
      setIsLoadingVideoInfo(true);
      setVideoInfo(null); // 清除之前的视频信息

      // 重置网络统计状态
      setNetworkStats({
        connectionSpeed: 0,
        networkActivity: 0,
        bufferHealth: 0
      });

      // 对于blob URL，我们无法预先验证其有效性，只能在加载时处理错误

      try {
        if (url.toLowerCase().includes('.m3u8')) {
          const Hls = (await import('hls.js')).default;

          if (Hls.isSupported()) {
            const hls = new Hls({
              enableWorker: true,
              lowLatencyMode: true,
            });

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
              setIsLoading(false);
              // 立即开始播放视频
              video.play().catch((error: Error) => {
                setError(`Error playing video: ${error.message}`);
              });

              // 延迟开始统计信息更新，给视频播放一些时间
              setTimeout(() => {
                statsIntervalRef.current = setInterval(updateHlsStats, 3000); // 增加到3秒间隔
                setIsLoadingVideoInfo(false); // 标记视频信息加载完成
              }, 1000);
            });

            hls.on(Hls.Events.ERROR, (event: any, data: any) => {
              if (data.fatal) {
                setError(`HLS error: ${data.type} - ${data.details}`);
                setIsLoading(false);
                // 清理失败的HLS实例
                if (hlsRef.current) {
                  hlsRef.current.destroy();
                  hlsRef.current = null;
                }
              }
            });

            try {
              hls.loadSource(url);
              hls.attachMedia(video);
              hlsRef.current = hls;
            } catch (hlsError) {
              console.error('HLS initialization error:', hlsError);
              setError(`HLS initialization failed: ${hlsError instanceof Error ? hlsError.message : 'Unknown error'}`);
              setIsLoading(false);
              hls.destroy();
            }
          } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            // Native HLS support (Safari)
            video.src = url;
            video.load();
            video.muted = true;

            // 立即尝试播放
            canPlayListener = () => {
              setIsLoading(false);
              video.play().catch((error: Error) => {
                setError(`Error playing video: ${error.message}`);
              });
            };
            video.addEventListener('canplay', canPlayListener);

            loadedMetadataListener = () => {
              // 延迟开始统计信息更新
              setTimeout(() => {
                // 根据文件类型选择合适的统计更新函数
                if (isLocalFile) {
                  updateLocalFileStats();
                  if (statsIntervalRef.current) clearInterval(statsIntervalRef.current);
                  statsIntervalRef.current = setInterval(updateLocalFileStats, 3000);
                } else {
                  updateRegularVideoStats();
                  if (statsIntervalRef.current) clearInterval(statsIntervalRef.current);
                  statsIntervalRef.current = setInterval(updateRegularVideoStats, 3000);
                }
                setIsLoadingVideoInfo(false);
              }, 1000);
            };
            video.addEventListener('loadedmetadata', loadedMetadataListener);
          } else {
            setError('HLS is not supported in your browser');
            setIsLoading(false);
          }
        } else {
          // Regular video formats
          video.src = url;
          video.load();
          video.muted = true;

          // 立即尝试播放
          canPlayListener = () => {
            setIsLoading(false);
            video.play().catch((error: Error) => {
              setError(`Error playing video: ${error.message}`);
            });
          };
          video.addEventListener('canplay', canPlayListener);

          loadedMetadataListener = () => {
            // 延迟开始统计信息更新
            setTimeout(() => {
              // 根据文件类型选择合适的统计更新函数
              if (isLocalFile) {
                updateLocalFileStats();
                if (statsIntervalRef.current) clearInterval(statsIntervalRef.current);
                statsIntervalRef.current = setInterval(updateLocalFileStats, 3000);
              } else {
                updateRegularVideoStats();
                if (statsIntervalRef.current) clearInterval(statsIntervalRef.current);
                statsIntervalRef.current = setInterval(updateRegularVideoStats, 3000);
              }
              setIsLoadingVideoInfo(false);
            }, 1000);
          };
          video.addEventListener('loadedmetadata', loadedMetadataListener);
        }

        // Add ended event listener
        endedListener = () => {
          onEnded?.();
        };
        video.addEventListener('ended', endedListener);

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';

        // 特殊处理blob URL相关错误
        if (url.startsWith('blob:') && (errorMessage.includes('Not found') || errorMessage.includes('network error'))) {
          const blobError = t('localFileExpiredError');
          setError(blobError);
          onError?.(blobError);
        } else {
          const generalError = `Error initializing player: ${errorMessage}`;
          setError(generalError);
          onError?.(generalError);
        }
        setIsLoading(false);
      }
    };

    // Add error listener
    const handleVideoError = (e: Event) => {
      const videoElement = e.target as HTMLVideoElement;
      const errorMessage = videoElement.error?.message || 'Unknown error';

      // 特殊处理blob URL失效的情况
      if (url.startsWith('blob:') && errorMessage.includes('Not found')) {
        const blobError = t('localFileExpiredError');
        setError(blobError);
        onError?.(blobError);
      } else {
        const generalError = `Error loading video: ${errorMessage}`;
        setError(generalError);
        onError?.(generalError);
      }
      setIsLoading(false);
    };

    video.addEventListener('error', handleVideoError);
    initializePlayer();

    return () => {
      // 清理HLS实例
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }

      // 清理统计信息更新间隔
      if (statsIntervalRef.current) {
        clearInterval(statsIntervalRef.current);
        statsIntervalRef.current = null;
      }

      // 停止视频播放并清理状态
      video.pause();
      video.currentTime = 0;
      // 只在清理时清空src
      if (video.src) {
        video.src = '';
      }

      // 移除所有事件监听器
      video.removeEventListener('error', handleVideoError);
      if (canPlayListener) video.removeEventListener('canplay', canPlayListener);
      if (loadedMetadataListener) video.removeEventListener('loadedmetadata', loadedMetadataListener);
      if (endedListener) video.removeEventListener('ended', endedListener);
    };
  }, [url, isClient, isLocalFile]);

  const handleVideoEnded = () => {
    onEnded?.();
  };

  // Helper to determine bar color based on network quality thresholds
  const getBarColor = (percent: number): string => {
    if (percent < 25) return 'bg-red-500';    // Poor
    if (percent < 50) return 'bg-orange-500'; // Fair
    if (percent < 75) return 'bg-yellow-400'; // Good
    return 'bg-green-500';                    // Excellent
  };

  // Helper to get buffer health color
  const getBufferColor = (seconds: number): string => {
    if (seconds < 5) return 'bg-red-500';     // Critical
    if (seconds < 15) return 'bg-yellow-400'; // Warning
    return 'bg-green-500';                    // Healthy
  };

  // Calculate realistic progress bar percentages
  const connectionSpeed = networkStats.connectionSpeed;
  const networkActivity = networkStats.networkActivity;
  const bufferHealth = networkStats.bufferHealth;

  // Connection Speed: 基于实际带宽，以20Mbps为满值
  const connectionPercent = Math.min((connectionSpeed / 20_000_000) * 100, 100);

  // Network Activity: 基于当前使用带宽，以10Mbps为满值
  const networkPercent = Math.min((networkActivity / 10_000_000) * 100, 100);

  // Buffer Health: 基于缓冲时间，以30秒为满值
  const bufferPercent = Math.min((bufferHealth / 30) * 100, 100);

  // Playhead position for buffer visualization
  const totalDuration = videoRef.current?.duration || 0;
  const currentTime = videoRef.current?.currentTime || 0;
  const playedPercent = totalDuration > 0 ? Math.min((currentTime / totalDuration) * 100, 100) : 0;

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      {!url && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-6 text-gray-500 video-player-cover gradient-cover"
          style={{
            zIndex: 10,
            minHeight: '100%',
            minWidth: '100%'
          }}
        >
          {/* 优化的图标占位符 */}
          <div className="relative">
            {/* 现代化的播放器图标 */}
            <div
              className="w-20 h-20 rounded-2xl border flex items-center justify-center"
              style={{
                backgroundColor: 'rgba(75, 85, 99, 0.5)',
                borderColor: 'rgba(75, 85, 99, 0.5)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)' // Safari/Chrome兼容性
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: 'rgba(75, 85, 99, 0.7)' }}
              >
                <svg
                  className="w-6 h-6 text-gray-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* 装饰性光点 - 使用更好的兼容性写法 */}
            <div
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse"
              style={{
                backgroundColor: 'rgb(59, 130, 246)',
                opacity: 0.6
              }}
            ></div>
            <div
              className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full animate-pulse"
              style={{
                backgroundColor: 'rgb(168, 85, 247)',
                opacity: 0.4,
                animationDelay: '0.7s'
              }}
            ></div>
          </div>

          {/* 文字说明 */}
          <div className="text-center space-y-3">
            <h3 className="text-xl font-semibold text-gray-300">{t('placeholderTitle')}</h3>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              {t('placeholderDescription')}
            </p>

            {/* 功能提示 */}
            <div className="flex items-center justify-center gap-6 mt-4 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>{t('onlineVideo')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>{t('hlsStream')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>{t('localFile')}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <video
        ref={videoRef}
        className="w-full h-full"
        controls
        playsInline
        onEnded={handleVideoEnded}
        muted
      />
      {url && ((videoInfo) || (isLoadingVideoInfo)) && showStats && (
        <div className="absolute top-2 left-2 bg-black bg-opacity-80 p-3 rounded-lg transition-opacity duration-300 font-mono text-[10px] leading-relaxed w-auto min-w-[320px] max-w-[450px]">
          {/* 统计信息开关按钮 */}
          <div className="absolute top-2 right-2">
            <button
              onClick={() => setShowStats(false)}
              className="text-white hover:text-gray-300 transition-colors duration-200 text-xs bg-black bg-opacity-50 px-2 py-1 rounded"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-[120px,1fr] gap-x-3 gap-y-[3px] items-center pr-8">
            {isLoadingVideoInfo ? (
              // 加载中的统计信息显示
              <>
                <div className="text-gray-400 font-medium">{t('videoInfo')}</div>
                <div className="text-yellow-400 font-light flex items-center gap-2">
                  <div className="animate-spin w-3 h-3 border border-yellow-400 border-t-transparent rounded-full"></div>
                  {isLocalFile ? t('loadingLocalFileInfo') : t('loadingVideoInfo')}
                </div>

                <div className="text-gray-400 font-medium">{t('status')}</div>
                <div className="text-green-400 font-light">
                  {isLocalFile ? t('localFilePlayingInfoLoading') : t('videoPlayingInfoLoading')}
                </div>

                {!isLocalFile && (
                  <>
                    <div className="text-gray-400 font-medium">{t('connection')}</div>
                    <div className="text-blue-400 font-light">{t('establishingConnection')}</div>
                  </>
                )}

                <div className="text-gray-400 font-medium">{t('buffer')}</div>
                <div className="text-blue-400 font-light">{t('buffering')}</div>
              </>
            ) : videoInfo ? (
              // 正常的统计信息显示
              <>
                <div className="text-gray-400 font-medium">{t('videoID')}</div>
                <div className="text-white font-light">{videoInfo.videoId}</div>

                <div className="text-gray-400 font-medium">{t('viewportFrames')}</div>
                <div className="text-white font-light">{videoInfo.viewport}</div>

                <div className="text-gray-400 font-medium">{t('currentOptimalRes')}</div>
                <div className="text-white font-light">{videoInfo.currentResolution} / {videoInfo.optimalResolution}</div>

                <div className="text-gray-400 font-medium">{t('volumeNormalized')}</div>
                <div className="text-white font-light">{videoInfo.volume} / {videoInfo.normalizedVolume}</div>

                <div className="text-gray-400 font-medium">{t('codecs')}</div>
                <div className="text-white font-light">{videoInfo.codecs}</div>

                <div className="text-gray-400 font-medium">{t('color')}</div>
                <div className="text-white font-light">{videoInfo.colorSpace} / {videoInfo.colorSpace}</div>
              </>
            ) : null}

            {!isLoadingVideoInfo && videoInfo && (
              <>
                {!isLocalFile && (
                  <>
                    <div className="text-gray-400 font-medium">{t('connectionSpeed')}</div>
                    <ProgressBar
                      percent={connectionPercent}
                      color={getBarColor(connectionPercent)}
                      value={connectionSpeed}
                      unit="Mbps"
                    />

                    <div className="text-gray-400 font-medium">{t('networkActivity')}</div>
                    <ProgressBar
                      percent={networkPercent}
                      color={getBarColor(networkPercent)}
                      value={networkActivity}
                      unit="Mbps"
                    />
                  </>
                )}

                <div className="text-gray-400 font-medium">{t('bufferHealth')}</div>
                {isLocalFile ? (
                  // 本地文件显示简化的缓冲信息
                  <div className="text-white font-light">
                    {videoInfo.bufferHealth}
                  </div>
                ) : (
                  // 在线视频显示完整的缓冲健康度条
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1 max-w-[140px] h-2 bg-gray-700 rounded overflow-hidden">
                      {/* Buffer health bar */}
                      <div
                        className={`absolute inset-y-0 left-0 ${getBufferColor(bufferHealth)} transition-all duration-500 ease-out`}
                        style={{ width: `${bufferPercent}%` }}
                      ></div>
                      {/* Buffer time indicator line */}
                      {bufferHealth > 0 && (
                        <div
                          className="absolute inset-y-0 w-[1px] bg-white/70 transition-all duration-500 ease-out"
                          style={{ left: `${Math.min(bufferPercent, 95)}%` }}
                        ></div>
                      )}
                    </div>
                    <span className="text-white font-light whitespace-nowrap min-w-[80px] text-right">
                      {bufferHealth.toFixed(1)}s
                    </span>
                  </div>
                )}

                <div className="text-gray-400 font-medium">{t('date')}</div>
                <div className="text-white font-light">{videoInfo.date}</div>
              </>
            )}
          </div>
        </div>
      )}

      {/* 显示统计信息按钮 (当统计信息被隐藏时) */}
      {url && !showStats && ((videoInfo) || (isLoadingVideoInfo)) && (
        <div className="absolute top-2 left-2">
          <button
            onClick={() => setShowStats(true)}
            className="text-white hover:text-gray-300 transition-colors duration-200 text-xs bg-black bg-opacity-50 px-3 py-1 rounded"
          >
            📊 {t('statistics')}
          </button>
        </div>
      )}
    </div>
  );
};

// 使用React.memo包装VideoPlayer组件，优化重新渲染
export default memo(VideoPlayer, (prevProps, nextProps) => {
  // 自定义比较函数，只有当关键props发生变化时才重新渲染
  return (
    prevProps.url === nextProps.url &&
    prevProps.isLocalFile === nextProps.isLocalFile &&
    prevProps.onEnded === nextProps.onEnded &&
    prevProps.onError === nextProps.onError
  );
});
