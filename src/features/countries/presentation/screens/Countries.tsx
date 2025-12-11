import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, SearchBar, Spinner } from '@shared/components';
import { useDebounce } from '@shared/hooks/useDebounce';
import React, { useMemo, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Country } from '../../domain/entities/Country';
import { CountryCard, CountryFilters, FilterBottomSheet } from '../components';
import { useCountries } from '../hooks/useCountries';
import { CountriesParamsList } from '../navigation/countriesParamsList';

type NavigationProp = NativeStackNavigationProp<CountriesParamsList, 'listOfCountries'>;

const ITEMS_PER_PAGE = 20;

export const Countries = () => {
  const navigation = useNavigation<NavigationProp>();
  const { countries, error, loading } = useCountries();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [filters, setFilters] = useState<CountryFilters>({});
  const [isFilterSheetVisible, setIsFilterSheetVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCountries = useMemo(() => {
    let result = countries;

    if (debouncedSearchQuery.trim()) {
      result = result.filter(country =>
        country.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );
    }

    if (filters.continent) {
      result = result.filter(country =>
        country.continent.toLowerCase().includes(filters.continent!.toLowerCase())
      );
    }

    if (filters.currency) {
      result = result.filter(country =>
        country.currency.toUpperCase() === filters.currency!.toUpperCase()
      );
    }

    return result;
  }, [countries, debouncedSearchQuery, filters]);

  const paginatedCountries = useMemo(() => {
    return filteredCountries.slice(0, currentPage * ITEMS_PER_PAGE);
  }, [filteredCountries, currentPage]);

  const hasMore = paginatedCountries.length < filteredCountries.length;
  const hasActiveFilters = Boolean(filters.continent || filters.currency);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handleCountryPress = (country: Country) => {
    navigation.navigate('countryDetails', { code: country.code });
  };

  const handleApplyFilters = (newFilters: CountryFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const renderHeader = () => (
    <View className="px-4 pt-4 pb-2 bg-white">
      <Text className="text-3xl font-bold text-gray-900 mb-4">Countries</Text>

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search countries..."
        className="mb-3"
      />

      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-sm text-gray-600">
          {filteredCountries.length} {filteredCountries.length === 1 ? 'country' : 'countries'}
        </Text>
        <Button
          variant={hasActiveFilters ? 'primary' : 'outline'}
          size="sm"
          onPress={() => setIsFilterSheetVisible(true)}
        >
          {hasActiveFilters ? '🎯 Filters Active' : '⚙️ Filters'}
        </Button>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View className="items-center justify-center py-12">
      <Text className="text-6xl mb-4">🌍</Text>
      <Text className="text-lg font-semibold text-gray-900 mb-2">
        No countries found
      </Text>
      <Text className="text-sm text-gray-500 text-center px-8">
        Try adjusting your search or filters
      </Text>
    </View>
  );

  const renderFooter = () => {
    if (!hasMore) return null;

    return (
      <View className="py-4">
        <Button variant="ghost" onPress={handleLoadMore}>
          Load More
        </Button>
      </View>
    );
  };

  if (loading && countries.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <Spinner message="Loading countries..." className="flex-1" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-6xl mb-4">⚠️</Text>
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Oops! Something went wrong
          </Text>
          <Text className="text-sm text-gray-500 text-center mb-4">{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <FlatList
        data={paginatedCountries}
        keyExtractor={item => item.code}
        renderItem={({ item }) => (
          <View className="px-4">
            <CountryCard country={item} onPress={() => handleCountryPress(item)} />
          </View>
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{ paddingBottom: 16 }}
      />

      <FilterBottomSheet
        visible={isFilterSheetVisible}
        onClose={() => setIsFilterSheetVisible(false)}
        onApply={handleApplyFilters}
        currentFilters={filters}
      />
    </SafeAreaView>
  );
};
