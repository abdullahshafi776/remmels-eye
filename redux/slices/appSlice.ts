import { createSlice } from '@reduxjs/toolkit'
import {CaseReducer} from "@reduxjs/toolkit/dist/createReducer";
import {PayloadAction} from "@reduxjs/toolkit/dist/createAction";
import {ICollection} from "../../types";

export type AppSliceState = {
  collections: ICollection[]
}

const initialState: AppSliceState = {
  collections: [],
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCollections: (state, action: PayloadAction<ICollection[]>) => {
      state.collections = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCollections } = appSlice.actions

export default appSlice.reducer