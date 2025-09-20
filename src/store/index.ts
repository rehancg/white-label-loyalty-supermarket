import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './cartSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
  debug: process.env.NODE_ENV === 'development', // Enable debug in development
};

const rootReducer = combineReducers({
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

// Debug persistence in development
if (process.env.NODE_ENV === 'development') {
  persistor.subscribe(() => {
    const { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      console.log('Redux Persist: Store rehydrated successfully');
    }
  });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
