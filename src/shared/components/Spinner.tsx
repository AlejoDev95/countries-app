import React from 'react';
import { ActivityIndicator, View, Text } from 'react-native';

type SpinnerSize = 'small' | 'large';

interface SpinnerProps {
  size?: SpinnerSize;
  color?: string;
  message?: string;
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'large',
  color = '#2563eb',
  message,
  className = '',
}) => {
  return (
    <View className={`items-center justify-center ${className}`}>
      <ActivityIndicator size={size} color={color} />
      {message && <Text className="mt-2 text-gray-600 text-sm">{message}</Text>}
    </View>
  );
};
