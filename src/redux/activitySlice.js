import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activities: [],
  isOpen: false,
  userInput: null
};

export const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    addActivity: (state, { payload }) => {
      state.activities.unshift(payload);
    },
    toggleIsOpen: (state, { payload }) => {
      state.isOpen = payload;
    },
    setUserInput: (state, { payload }) => {
      state.userInput = payload;
    },
    delErrorFromState: (state, { payload }) => {
      console.log(payload);
      state.activities = state.activities.filter((activity) => {
        return activity.id !== payload;
      });
    }
  }
});

export const {
  addActivity,
  toggleIsOpen,
  setUserInput,
  delErrorFromState
} = activitySlice.actions;

export default activitySlice.reducer;
