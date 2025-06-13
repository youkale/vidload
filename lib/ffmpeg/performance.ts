export interface PerformanceMetrics {
  processingTime: number;
  fileSize: number;
  threadsUsed: boolean;
  memoryUsage?: number;
  throughput: number; // MB/s
}

export class FFmpegPerformanceMonitor {
  private startTime: number = 0;
  private fileSize: number = 0;

  startMonitoring(fileSizeBytes: number): void {
    this.startTime = performance.now();
    this.fileSize = fileSizeBytes;
    console.log(`🚀 Starting FFmpeg processing for ${(fileSizeBytes / 1024 / 1024).toFixed(2)}MB file`);
  }

  endMonitoring(): PerformanceMetrics {
    const endTime = performance.now();
    const processingTime = endTime - this.startTime;
    const fileSizeMB = this.fileSize / 1024 / 1024;
    const throughput = fileSizeMB / (processingTime / 1000);
    const threadsUsed = typeof SharedArrayBuffer !== 'undefined';

    const metrics: PerformanceMetrics = {
      processingTime,
      fileSize: this.fileSize,
      threadsUsed,
      throughput
    };

    // Log performance results
    console.log('📊 FFmpeg Performance Metrics:');
    console.log(`   Processing Time: ${processingTime.toFixed(2)}ms`);
    console.log(`   File Size: ${fileSizeMB.toFixed(2)}MB`);
    console.log(`   Throughput: ${throughput.toFixed(2)}MB/s`);
    console.log(`   Multi-threading: ${threadsUsed ? '✅ Enabled' : '❌ Disabled'}`);

    if (typeof (performance as any).memory !== 'undefined') {
      const memInfo = (performance as any).memory;
      metrics.memoryUsage = memInfo.usedJSHeapSize;
      console.log(`   Memory Usage: ${(memInfo.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`);
    }

    // Performance recommendations
    if (processingTime > 10000) { // > 10 seconds
      console.warn('⚠️  Processing time is high. Consider:');
      if (!threadsUsed) {
        console.warn('   - Enabling HTTPS and proper headers for multi-threading');
      }
      console.warn('   - Using smaller file chunks for large videos');
    }

    if (throughput < 1) { // < 1 MB/s
      console.warn('⚠️  Low throughput detected. This may indicate:');
      console.warn('   - Network bottleneck for remote files');
      console.warn('   - Single-threaded processing limitations');
      console.warn('   - High video complexity requiring more processing power');
    }

    return metrics;
  }

  static logSystemCapabilities(): void {
    console.log('🔧 System Capabilities:');
    const hasSharedArrayBuffer = typeof SharedArrayBuffer !== 'undefined';
    const hasWorkers = typeof Worker !== 'undefined';
    const hasWasm = typeof WebAssembly !== 'undefined';
    const hasWasmStreaming = typeof WebAssembly.instantiateStreaming !== 'undefined';

    console.log(`   SharedArrayBuffer: ${hasSharedArrayBuffer ? '✅' : '❌'}`);
    console.log(`   WebWorkers: ${hasWorkers ? '✅' : '❌'}`);
    console.log(`   WebAssembly: ${hasWasm ? '✅' : '❌'}`);
    console.log(`   WASM Streaming: ${hasWasmStreaming ? '✅' : '❌'}`);

    if (typeof navigator !== 'undefined') {
      console.log(`   CPU Cores: ${navigator.hardwareConcurrency || 'Unknown'}`);
      const isChrome = navigator.userAgent.includes('Chrome');
      const isFirefox = navigator.userAgent.includes('Firefox');
      const isSafari = navigator.userAgent.includes('Safari') && !isChrome;
      console.log(`   Browser: ${isChrome ? 'Chrome-based' : isFirefox ? 'Firefox' : isSafari ? 'Safari' : 'Other'}`);
      console.log(`   Secure Context: ${typeof window !== 'undefined' ? (window.isSecureContext ? '✅ HTTPS' : '❌ HTTP') : 'Unknown'}`);
    }

    // Detailed multi-threading diagnosis
    if (!hasSharedArrayBuffer) {
      console.warn('⚠️  Multi-threading disabled. Possible causes:');
      console.warn('   - Missing Cross-Origin-Opener-Policy: same-origin');
      console.warn('   - Missing Cross-Origin-Embedder-Policy (need require-corp or credentialless)');
      console.warn('   - Not served over HTTPS');
      console.warn('   - Browser doesn\'t support SharedArrayBuffer');
      console.warn('   - Browser security policies');
    } else {
      console.log('🚀 Multi-threading ready!');
      console.log('   COEP mode: credentialless (allows external resources)');
      console.log('   FFmpeg source: jsDelivr CDN (@ffmpeg/core-mt@0.12.6) via blob URLs');
    }

    // Performance recommendations
    if (typeof navigator !== 'undefined' && navigator.hardwareConcurrency) {
      const cores = navigator.hardwareConcurrency;
      if (cores >= 8) {
        console.log('💪 High-performance system detected (8+ cores)');
      } else if (cores >= 4) {
        console.log('⚡ Good performance system (4+ cores)');
      } else {
        console.log('📱 Limited cores detected - performance may be restricted');
      }
    }
  }
}
