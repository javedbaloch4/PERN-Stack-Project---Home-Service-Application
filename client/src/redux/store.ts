import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./features/category/slice";
import userReducer from "./features/auth/slice";
import notificationReducer from "./features/notifications/slice";
import serviceReducer from "./features/services/slice";
import bookingReducer from "./features/bookings/slice";
import ReviewReducer from "./features/reviews/slice";

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    user: userReducer,
    notification: notificationReducer,
    services: serviceReducer,
    bookings: bookingReducer,
    reviews: ReviewReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
