import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useCountryByCode } from '../hooks/useCountryByCode';
import { Spinner } from '@shared/components/';
import { CountriesParamsList } from '../navigation/countriesParamsList';

type CountryDetailsRouteProp = RouteProp<CountriesParamsList, 'countryDetails'>;

export const CountryDetails = () => {
  const navigation = useNavigation();
  const route = useRoute<CountryDetailsRouteProp>();
  const { code } = route.params;

  const { country, loading, error } = useCountryByCode(code);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <Spinner message="Loading country details..." className="flex-1" />
      </SafeAreaView>
    );
  }

  if (error || !country) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-6xl mb-4">⚠️</Text>
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Country not found
          </Text>
          <Text className="text-sm text-gray-500 text-center mb-4">
            {error || 'The country you are looking for does not exist.'}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-blue-600 px-6 py-3 rounded-lg"
          >
            <Text className="text-white font-semibold">Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="bg-gradient-to-b from-blue-50 to-white p-6">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mb-4 self-start"
          >
            <Text className="text-blue-600 text-base">← Back</Text>
          </TouchableOpacity>

          <View className="items-center mb-6">
            <Text className="text-8xl mb-4">{country.emoji}</Text>
            <Text className="text-3xl font-bold text-gray-900 text-center">
              {country.name}
            </Text>
            <Text className="text-lg text-gray-600 mt-2">{country.code}</Text>
          </View>
        </View>

        <View className="px-6 py-4">
          <View className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
            <Text className="text-sm font-semibold text-gray-500 mb-3">
              GENERAL INFORMATION
            </Text>

            <DetailRow label="Continent" value={country.continent} />
            <DetailRow label="Capital" value={country.capital} />
            <DetailRow label="Currency" value={country.currency} />
            <DetailRow
              label="Languages"
              value={country.languages.join(', ')}
              isLast
            />
          </View>

          <View className="bg-blue-50 rounded-xl p-4">
            <Text className="text-sm font-semibold text-blue-900 mb-2">
              📍 Quick Facts
            </Text>
            <Text className="text-sm text-blue-700">
              {country.name} is located in {country.continent}
              {country.capital !== 'N/A' &&
                ` with its capital in ${country.capital}`}
              .
              {country.languages.length > 0 &&
                ` The official language${country.languages.length > 1 ? 's are' : ' is'} ${country.languages.join(', ')}.`}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

interface DetailRowProps {
  label: string;
  value: string;
  isLast?: boolean;
}

const DetailRow: React.FC<DetailRowProps> = ({
  label,
  value,
  isLast = false,
}) => (
  <View
    className={`flex-row justify-between py-3 ${!isLast ? 'border-b border-gray-100' : ''}`}
  >
    <Text className="text-sm font-medium text-gray-600">{label}</Text>
    <Text className="text-sm text-gray-900 font-semibold flex-1 text-right">
      {value}
    </Text>
  </View>
);
