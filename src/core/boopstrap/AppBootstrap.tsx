import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AppProvider } from '../providers/AppProvider';
import { setupApp } from './setupApp';

export const AppBootstrap = () => {
  const [ready, setReady] = useState(false);

  const init = async () => {
    await setupApp();
    setReady(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!ready) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return <AppProvider />;
};
