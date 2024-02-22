import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import httpClient from "../../../net/httpClient";
import { Service } from "../services/slice";
import { User } from "../auth/slice";

export interface Booking {
  id: number;
  bookingDate?: string;
  paymentStatus?: string;
  completeStatus?: string;
  serviceId?: number;
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
  service?: Service;
  user?: User;
}

interface IReponseBooking {
  status: string;
  data: Booking;
}

interface IReponseBookings {
  status: string;
  data: Array<Booking>;
}

export interface BookingState {
  loading: boolean;
  bookings: Array<Booking>;
  error: string | undefined;
  showForm: boolean;
  isEditForm: boolean;
  booking: Booking | null;
  showReviewForm: boolean;
}

const initialState: BookingState = {
  loading: false,
  bookings: [],
  booking: null,
  error: undefined,
  showForm: false,
  isEditForm: false,
  showReviewForm: false,
};

export const fetchBookings = createAsyncThunk("bookings/all", async () => {
  try {
    const response = await httpClient<IReponseBookings>({
      method: "GET",
      url: "/booking",
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
});

export const createBooking = createAsyncThunk(
  "bookings/create",
  async (data: Partial<Booking>) => {
    try {
      const response = await httpClient<IReponseBooking>({
        method: "POST",
        url: "/booking",
        data: data,
      });

      return response.data;
    } catch (error) {
      console.log("ERR ", error);
      throw error;
    }
  }
);

export const getBookingById = createAsyncThunk(
  "bookings/getById",
  async (id: number) => {
    try {
      const response = await httpClient<IReponseBooking>({
        method: "GET",
        url: `/booking/${id}`,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteBooking = createAsyncThunk(
  "bookings/delete",
  async (id: number) => {
    try {
      const response = await httpClient<IReponseBooking>({
        method: "DELETE",
        url: `/booking/${id}`,
      });

      return response.data;
    } catch (error) {
      console.log("ERR ", error);
      throw error;
    }
  }
);

export const updateBooking = createAsyncThunk(
  "bookings/update",
  async (data: Partial<Booking>) => {
    try {
      console.log(data);
      const response = await httpClient<IReponseBooking>({
        method: "PUT",
        url: `/booking/${data.id}`,
        data: data,
      });
      return response.data;
    } catch (error) {
      console.log("ERR ", error);
      throw error;
    }
  }
);

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  extraReducers: (builder) => {
    // Fetch
    builder.addCase(fetchBookings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchBookings.fulfilled,
      (state, action: PayloadAction<Array<Booking>>) => {
        state.loading = false;
        state.bookings = action.payload;
      }
    );
    builder.addCase(fetchBookings.rejected, (state, action) => {
      state.loading = false;
      state.bookings = [];
      state.error = action.error.message;
    });

    // Create
    builder.addCase(createBooking.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      createBooking.fulfilled,
      (state, action: PayloadAction<Booking>) => {
        state.loading = false;
        state.bookings.push(action.payload);
        state.showForm = false;
      }
    );
    builder.addCase(createBooking.rejected, (state, action) => {
      state.loading = false;
      state.bookings = [];
      state.error = action.error.message;
    });

    // Update
    builder.addCase(updateBooking.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      updateBooking.fulfilled,
      (state, action: PayloadAction<Booking>) => {
        state.loading = false;
        console.log(action.payload);
        const idx = state.bookings.findIndex(
          (booking) => booking.id == action.payload.id
        );

        if (idx !== -1) {
          state.bookings[idx] = action.payload;
        }

        state.showForm = false;
      }
    );
    builder.addCase(updateBooking.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Delete
    builder.addCase(deleteBooking.fulfilled, (state, action) => {
      state.loading = false;
      const deletedBooking = action.payload;

      state.bookings = state.bookings.filter(
        (booking) => booking.id !== deletedBooking.id
      );
    });

    builder.addCase(deleteBooking.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteBooking.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Get by id
    builder.addCase(getBookingById.fulfilled, (state, action) => {
      state.loading = false;
      state.booking = action.payload;
    });
    builder.addCase(getBookingById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBookingById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
  reducers: {
    toggleShowForm: (state) => {
      state.showForm = !state.showForm;
      state.isEditForm = false;
      state.booking = null;
    },
    isEditForm: (state, action) => {
      state.isEditForm = true;
      state.booking =
        state.bookings.find((e) => e.id === action.payload) || null;
      state.showForm = true;
    },
    toggleReviewForm: (state, action) => {
      state.showReviewForm = !state.showReviewForm;
    },
  },
});

export const { toggleShowForm, isEditForm, toggleReviewForm } =
  bookingSlice.actions;
export const bookingSelector = (state: RootState) => state.bookings;
export default bookingSlice.reducer;
