import React from 'react';
import { Text, View } from 'react-native';
import { useCountries } from '../hooks/useCountries';

export const Countries = () => {
  const { countries, error, loading, refetch } = useCountries();
  console.log({ countries, error, loading });
  return (
    <View className="flex-1 bg-slate-100 items-center justify-center">
      <Text className="text-center text-3xl font-bold text-blue-600">
        Countries
      </Text>
      <Text className="text-center text-sm text-gray-500 mt-2">
        NativeWind is working! ✨
      </Text>
      {loading && (
        <Text className="mt-4 text-gray-600">Loading countries...</Text>
      )}
      {error && <Text className="mt-4 text-red-600">Error: {error}</Text>}
    </View>
  );
};
