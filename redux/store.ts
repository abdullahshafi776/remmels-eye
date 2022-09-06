import {configureStore, Reducer} from '@reduxjs/toolkit'
import appSliceReducer, {AppSliceState} from './slices/appSlice'
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";

const persistConfig = {
  key: 'root',
  storage,
}

const createPersisterReducer = <K extends string, R extends Reducer> (key: K, reducer: R) => ({ [key]: persistReducer(persistConfig, reducer)})

const rootReducer = configureStore({
  reducer: {
    ...createPersisterReducer('app',appSliceReducer)
  }
})

export type AppState = {
  app: AppSliceState
}



export default rootReducer