import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import onlineCountReducer from './onlineCountSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      onlineCount: onlineCountReducer,
    },
  });
};
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
