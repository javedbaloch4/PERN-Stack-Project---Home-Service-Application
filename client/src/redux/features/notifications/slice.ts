import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

enum NotificationTypes {
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
  INFO = "info",
  DEFAULT = "default",
}

export interface Notification {
  id: string;
  message: string;
  duration: number;
  type: NotificationTypes;
}

export interface NotificationState {
  notifications: Array<Notification>;
}
const initialState: NotificationState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notifiy(state, action) {
      state.notifications.push(action.payload);
    },
    clearNotify(state, action) {
      state.notifications = state.notifications.filter(
        (notes) => notes.id !== action.payload
      );
    },
  },
});

export const { notifiy, clearNotify } = notificationSlice.actions;
export const notificationSelector = (state: RootState) => state.notification;
export default notificationSlice.reducer;
