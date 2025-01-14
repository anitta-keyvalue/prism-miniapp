import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { useDispatch } from 'react-redux';
import systemInfoReducer from './modules/systemInfoSlice';
import mapStateReducer from './modules/mapStateSlice';
import mapExtrasReducer from './modules/mapExtrasSlice';
import customConfigReducer from './modules/customConfigSlice';
import cleanRecordsReducer from './modules/cleanRecordsSlice';
import multiMapsReducer from './modules/multiMapsSlice';
import ipcCommonReducer from './modules/ipcCommonSlice';

const isDev = process.env.NODE_ENV === 'development';
import { TypedUseSelectorHook, useSelector as useSelector1 } from 'react-redux';

const logger = createLogger({
  predicate: () => isDev,
  collapsed: true,
  duration: true,
});

const middlewares = isDev ? [logger] : [];

const store = configureStore({
  reducer: {
    systemInfo: systemInfoReducer,
    mapState: mapStateReducer,
    mapExtras: mapExtrasReducer,
    customConfig: customConfigReducer,
    cleanRecords: cleanRecordsReducer,
    multiMaps: multiMapsReducer,
    ipcCommon: ipcCommonReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(middlewares),
});

export type ReduxState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;

export const useSelector: TypedUseSelectorHook<ReduxState> = useSelector1;
