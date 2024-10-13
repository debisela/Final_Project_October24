import { configureStore, combineReducers } from "@reduxjs/toolkit";
import attendeeReducer from '../features/Search/state/searchSlice.ts'

const reducer = combineReducers({attendeeReducer})

const store = configureStore({
    reducer:reducer,
})

export default store;