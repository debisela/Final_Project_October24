import { createSelector } from "@reduxjs/toolkit";

import { attendees, status, state } from "./searchSlice";

export const selectAttendee = createSelector([state], (state) => state.attendees);

export const selectStatus = createSelector([state], (state) => state.status);