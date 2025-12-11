import React from 'react';
import { Text, View } from 'react-native';
import { useCountries } from '../hooks/useCountries';

export const Countries = () => {
  const { countries, error, loading, refetch } = useCountries();
  console.log({ countries, error, loading });
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ textAlign: 'center', fontSize: 20 }}>Countries</Text>
    </View>
  );
};
