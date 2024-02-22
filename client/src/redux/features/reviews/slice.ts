import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import httpClient from "../../../net/httpClient";

export interface Review {
  id?: number;
  rating: number;
  comment: string;
  serviceId: number;
  userId: number;
  createdAt?: string;
  updatedAt?: string;
}

interface IReponseReview {
  status: string;
  data: Review;
}

interface IReponseReviews {
  status: string;
  data: Array<Review>;
}

export interface ReviewState {
  loading: boolean;
  reviews: Array<Review>;
  review: Review | null;
  error: string | undefined;
  showForm: boolean;
  isEditForm: boolean;
}

const initialState: ReviewState = {
  loading: false,
  reviews: [],
  review: null,
  error: undefined,
  showForm: false,
  isEditForm: false,
};

export const createReview = createAsyncThunk(
  "review/create",
  async (data: Partial<Review>) => {
    try {
      const response = await httpClient<IReponseReview>({
        method: "POST",
        url: "/review",
        data: data,
      });

      return response.data;
    } catch (error) {
      console.log("ERR ", error);
      throw error;
    }
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  extraReducers: (builder) => {
    // Create
    builder.addCase(createReview.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      createReview.fulfilled,
      (state, action: PayloadAction<Review>) => {
        state.loading = false;
        // state.reviews.push(action.payload);
        state.showForm = false;
      }
    );
    builder.addCase(createReview.rejected, (state, action) => {
      state.loading = false;
      //   state.reviews = [];
      state.error = action.error.message;
    });
  },
  reducers: {},
});

export const reviewSelector = (state: RootState) => state.reviews;
export default reviewSlice.reducer;
