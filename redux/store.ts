import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

import { apiSlice } from '@/redux/features/api/apiSlice';
import { drawersSlice } from '@/redux/features/drawers/drawersSlice';
import globalReducer from '@/redux/features/global/global';
import { ingredientSlice } from '@/redux/features/ingredients/ingredientsSlice';

/* REDUX PERSISTENCE */
const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window === 'undefined' ? createNoopStorage() : createWebStorage('local');

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['global'],
};

/* REDUX ROOT REDUCER */
const rootReducer = combineReducers({
  global: globalReducer,
  ingredients: ingredientSlice.reducer,
  drawers: drawersSlice.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

/* PERSISTED REDUCER */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/* REDUX STORE */
export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(apiSlice.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
