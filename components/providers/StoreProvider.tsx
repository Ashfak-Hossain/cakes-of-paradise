'use client';

import { AppStore, makeStore } from '@/redux/store';
import { setupListeners } from '@reduxjs/toolkit/query';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { LoadingScreen } from '@/components/common/LoadingScreen';

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    setupListeners(storeRef.current.dispatch);
  }
  const persistor = persistStore(storeRef.current);

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
