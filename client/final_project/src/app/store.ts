import { configureStore, combineReducers } from "@reduxjs/toolkit";
import attendeeReducer from '../features/Search/state/searchSlice.ts'
import fieldsReducer from '../features/Admin/state/selectSlice.ts'

const reducer = combineReducers({
    attendeeReducer,
    fieldsReducer
})

const store = configureStore({
    reducer:reducer,
})

export default store;