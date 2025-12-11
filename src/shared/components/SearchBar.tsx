import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
  className?: string;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search...',
  onClear,
  className = '',
}) => {
  return (
    <View
      className={`flex-row items-center bg-white rounded-lg px-4 py-2 border border-gray-200 ${className}`}
    >
      <Text className="text-gray-400 mr-2">🔍</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        className="flex-1 text-base text-gray-900"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear || (() => onChangeText(''))}>
          <Text className="text-gray-400 text-lg ml-2">✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
