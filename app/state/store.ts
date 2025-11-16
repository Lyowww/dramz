import { configureStore } from '@reduxjs/toolkit'
import auth from './slices/auth'
import ui from './slices/ui'

export const makeStore = () =>
  configureStore({
    reducer: { auth, ui }
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']


