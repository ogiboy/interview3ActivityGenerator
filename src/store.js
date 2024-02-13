import { configureStore } from "@reduxjs/toolkit";
import activitySlice from "./redux/activitySlice";

export default configureStore({
  reducer: {
    activity: activitySlice
  }
});
