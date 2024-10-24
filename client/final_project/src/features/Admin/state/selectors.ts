import { createSelector } from "@reduxjs/toolkit";

import { fields, status, state } from "./selectSlice";

export const selectFields = createSelector([state], (state) => state.fields);

export const selectStatus = createSelector([state], (state) => state.status);