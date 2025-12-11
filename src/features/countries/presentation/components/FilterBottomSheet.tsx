import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { BottomSheet, Select, Button, SelectOption } from '@shared/components';

export interface CountryFilters {
  continent?: string;
  currency?: string;
}

interface FilterBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: CountryFilters) => void;
  currentFilters: CountryFilters;
}

const CONTINENTS: SelectOption[] = [
  { label: 'All Continents', value: '' },
  { label: 'Africa', value: 'AF' },
  { label: 'Antarctica', value: 'AN' },
  { label: 'Asia', value: 'AS' },
  { label: 'Europe', value: 'EU' },
  { label: 'North America', value: 'NA' },
  { label: 'Oceania', value: 'OC' },
  { label: 'South America', value: 'SA' },
];

const CURRENCIES: SelectOption[] = [
  { label: 'All Currencies', value: '' },
  { label: 'USD - US Dollar', value: 'USD' },
  { label: 'EUR - Euro', value: 'EUR' },
  { label: 'GBP - British Pound', value: 'GBP' },
  { label: 'JPY - Japanese Yen', value: 'JPY' },
  { label: 'CNY - Chinese Yuan', value: 'CNY' },
  { label: 'INR - Indian Rupee', value: 'INR' },
  { label: 'AUD - Australian Dollar', value: 'AUD' },
  { label: 'CAD - Canadian Dollar', value: 'CAD' },
  { label: 'CHF - Swiss Franc', value: 'CHF' },
  { label: 'BRL - Brazilian Real', value: 'BRL' },
  { label: 'MXN - Mexican Peso', value: 'MXN' },
  { label: 'ZAR - South African Rand', value: 'ZAR' },
];

export const FilterBottomSheet: React.FC<FilterBottomSheetProps> = ({
  visible,
  onClose,
  onApply,
  currentFilters,
}) => {
  const [continent, setContinent] = useState<string>(
    currentFilters.continent || '',
  );
  const [currency, setCurrency] = useState<string>(
    currentFilters.currency || '',
  );

  useEffect(() => {
    if (visible) {
      setContinent(currentFilters.continent || '');
      setCurrency(currentFilters.currency || '');
    }
  }, [visible, currentFilters]);

  const handleApply = () => {
    onApply({
      continent: continent || undefined,
      currency: currency || undefined,
    });
    onClose();
  };

  const handleClear = () => {
    setContinent('');
    setCurrency('');
    onApply({});
    onClose();
  };

  const hasActiveFilters = continent !== '' || currency !== '';

  return (
    <BottomSheet visible={visible} onClose={onClose} height="h-1/2">
      <View>
        <Text className="text-2xl font-bold text-gray-900 mb-6">Filters</Text>

        <Select
          label="Continent"
          options={CONTINENTS}
          value={continent}
          onSelect={setContinent}
          placeholder="Select a continent"
          className="mb-4"
        />

        <Select
          label="Currency"
          options={CURRENCIES}
          value={currency}
          onSelect={setCurrency}
          placeholder="Select a currency"
          className="mb-6"
        />

        <View className="flex-row gap-3">
          <Button
            variant="outline"
            onPress={handleClear}
            disabled={!hasActiveFilters}
            className="flex-1"
          >
            Clear All
          </Button>
          <Button onPress={handleApply} className="flex-1">
            Apply Filters
          </Button>
        </View>
      </View>
    </BottomSheet>
  );
};
