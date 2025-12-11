import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Video, {
  VideoRef,
  type OnProgressData,
  type OnLoadData,
  type OnVideoErrorData,
} from 'react-native-video';

interface VideoPlayerProps {
  uri: string;
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  uri,
  className = '',
}) => {
  const videoRef = useRef<VideoRef>(null);
  const [paused, setPaused] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const togglePlayPause = () => {
    setPaused(!paused);
  };

  const handleProgress = (data: OnProgressData) => {
    setProgress(data.currentTime);
  };

  const handleLoad = (data: OnLoadData) => {
    setDuration(data.duration);
    setLoading(false);
  };

  const handleError = (err: OnVideoErrorData) => {
    setError('Failed to load video');
    setLoading(false);
    console.error('Video error:', err);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (progress / duration) * 100 : 0;

  if (error) {
    return (
      <View
        className={`bg-gray-100 rounded-xl p-6 items-center justify-center ${className}`}
      >
        <Text className="text-6xl mb-3">📹</Text>
        <Text className="text-base font-semibold text-gray-900 mb-1">
          Unable to load video
        </Text>
        <Text className="text-sm text-gray-500 text-center">{error}</Text>
      </View>
    );
  }

  return (
    <View className={`bg-black rounded-xl overflow-hidden ${className}`}>
      <Video
        ref={videoRef}
        source={{ uri }}
        style={styles.video}
        paused={paused}
        onProgress={handleProgress}
        onLoad={handleLoad}
        onError={handleError}
        resizeMode="contain"
        controls={false}
      />

      {loading && (
        <View style={styles.loadingOverlay}>
          <Text className="text-white text-base font-semibold">
            Loading video...
          </Text>
        </View>
      )}

      <View className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <View className="flex-row items-center mb-2">
          <View className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden mr-3">
            <View
              className="h-full bg-blue-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </View>
          <Text className="text-white text-xs font-mono">
            {formatTime(progress)} / {formatTime(duration)}
          </Text>
        </View>

        <View className="flex-row items-center justify-center">
          <TouchableOpacity
            onPress={togglePlayPause}
            className="bg-white/20 px-8 py-3 rounded-lg active:bg-white/30"
          >
            <Text className="text-white text-2xl">{paused ? '▶️' : '⏸️'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
