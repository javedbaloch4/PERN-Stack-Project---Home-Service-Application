import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import httpClient from "../../../net/httpClient";

export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updateAt: string;
}

interface IResponse {
  status: string;
  message: string;
  data: Category;
}

export interface CategoryState {
  loading: boolean;
  categories: Array<Category>;
  error: string | undefined;
  showForm: boolean;
  isEditForm: boolean;
  category: Category | null;
}

const initialState: CategoryState = {
  loading: false,
  categories: [],
  category: null,
  error: undefined,
  showForm: false,
  isEditForm: false,
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    try {
      const response = await httpClient<{
        status: string;
        data: Array<Category>;
      }>({
        method: "GET",
        url: "/category",
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }
);

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (data: { name: string }) => {
    try {
      const response = await httpClient<IResponse>({
        method: "POST",
        url: "/category",
        data: data,
      });

      return response.data;
    } catch (error) {
      console.log("ERR ", error);
      throw error;
    }
  }
);

export const getCategoryById = createAsyncThunk(
  "categories/getCategoryById",
  async (id: number) => {
    try {
      const response = await httpClient<IResponse>({
        method: "GET",
        url: `/category/${id}`,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id: number) => {
    try {
      const response = await httpClient<IResponse>({
        method: "DELETE",
        url: `/category/${id}`,
      });

      return response.data;
    } catch (error) {
      console.log("ERR ", error);
      throw error;
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (data: { name: string; id: number }) => {
    try {
      const response = await httpClient<IResponse>({
        method: "PUT",
        url: `/category/${data.id}`,
        data: { name: data.name },
      });
      return response.data;
    } catch (error) {
      console.log("ERR ", error);
      throw error;
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    // Fetch
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchCategories.fulfilled,
      (state, action: PayloadAction<Array<Category>>) => {
        state.loading = false;
        state.categories = action.payload;
      }
    );
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.categories = [];
      state.error = action.error.message;
    });

    // Create
    builder.addCase(createCategory.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      createCategory.fulfilled,
      (state, action: PayloadAction<Category>) => {
        state.loading = false;
        state.categories.push(action.payload);
        state.showForm = false;
      }
    );
    builder.addCase(createCategory.rejected, (state, action) => {
      state.loading = false;
      state.categories = [];
      state.error = action.error.message;
    });

    // Update
    builder.addCase(updateCategory.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      updateCategory.fulfilled,
      (state, action: PayloadAction<Category>) => {
        state.loading = false;
        console.log(action.payload);
        const idx = state.categories.findIndex(
          (category) => category.id == action.payload.id
        );

        if (idx !== -1) {
          state.categories[idx] = action.payload;
        }

        state.showForm = false;
      }
    );
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Delete
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.loading = false;
      const deletedCategory = action.payload;

      state.categories = state.categories.filter(
        (category) => category.id !== deletedCategory.id
      );
    });

    builder.addCase(deleteCategory.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Get by id
    builder.addCase(getCategoryById.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;
    });
    builder.addCase(getCategoryById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCategoryById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
  reducers: {
    toggleShowForm: (state) => {
      state.showForm = !state.showForm;
      state.isEditForm = false;
      state.category = null;
    },
    isEditForm: (state, action) => {
      state.isEditForm = true;
      state.category =
        state.categories.find((e) => e.id === action.payload) || null;
      state.showForm = true;
    },
  },
});
export const { toggleShowForm, isEditForm } = categorySlice.actions;
export const categorySelector = (state: RootState) => state.categories;
export default categorySlice.reducer;
