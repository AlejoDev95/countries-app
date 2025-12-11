import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Country } from '../../domain/entities/Country';

type CountryCardProps = {
  country: Country;
  onPress: () => void;
};

export const CountryCard: React.FC<CountryCardProps> = ({
  country,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100 active:bg-gray-50"
    >
      <View className="flex-row items-center">
        <Text className="text-4xl mr-3">{country.emoji}</Text>

        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-900" numberOfLines={1}>
            {country.name}
          </Text>

          <View className="flex-row items-center mt-1">
            <Text className="text-sm text-gray-600">{country.continent}</Text>
            {country.capital !== 'N/A' && (
              <>
                <Text className="text-gray-400 mx-2">•</Text>
                <Text className="text-sm text-gray-600" numberOfLines={1}>
                  {country.capital}
                </Text>
              </>
            )}
          </View>

          <View className="flex-row items-center mt-2">
            <View className="bg-blue-100 px-2 py-1 rounded">
              <Text className="text-xs font-medium text-blue-700">
                {country.code}
              </Text>
            </View>
            {country.currency !== 'N/A' && (
              <View className="bg-green-100 px-2 py-1 rounded ml-2">
                <Text className="text-xs font-medium text-green-700">
                  {country.currency}
                </Text>
              </View>
            )}
          </View>
        </View>

        <Text className="text-gray-400 ml-2">›</Text>
      </View>
    </TouchableOpacity>
  );
};
