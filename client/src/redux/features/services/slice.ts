import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import httpClient from "../../../net/httpClient";
import { Category } from "../category/slice";

export interface Service {
  id?: number;
  uuid?: string;
  title: string;
  description: string;
  location: string;
  price: number;
  status: boolean;
  statusService: string;
  userId: number;
  categoryId: number;
  createdAt?: string;
  updatedAt?: string;
  category: Category;
}

interface IReponseService {
  status: string;
  message?: string;
  data: Service;
}

interface IReponseServices {
  status: string;
  data: Array<Service>;
}

export interface ServiceState {
  loading: boolean;
  services: Array<Service>;
  error: string | undefined;
  showForm: boolean;
  isEditForm: boolean;
  service: Service | null;
}

const initialState: ServiceState = {
  loading: false,
  services: [],
  service: null,
  error: undefined,
  showForm: false,
  isEditForm: false,
};

export const fetchServices = createAsyncThunk("services/all", async () => {
  try {
    const response = await httpClient<IReponseServices>({
      method: "GET",
      url: "/service",
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching service:", error);
    throw error;
  }
});

export const createService = createAsyncThunk(
  "services/create",
  async (data: { name: string }) => {
    try {
      const response = await httpClient<IReponseService>({
        method: "POST",
        url: "/service",
        data: data,
      });

      return response.data;
    } catch (error) {
      console.log("ERR ", error);
      throw error;
    }
  }
);

export const getServiceById = createAsyncThunk(
  "services/getById",
  async (id: number) => {
    try {
      const response = await httpClient<IReponseService>({
        method: "GET",
        url: `/service/${id}`,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteService = createAsyncThunk(
  "services/delete",
  async (id: number) => {
    try {
      const response = await httpClient<IReponseService>({
        method: "DELETE",
        url: `/service/${id}`,
      });

      return response.data;
    } catch (error) {
      console.log("ERR ", error);
      throw error;
    }
  }
);

export const updateService = createAsyncThunk(
  "services/update",
  async (data: Partial<Service>) => {
    try {
      const response = await httpClient<IReponseService>({
        method: "PUT",
        url: `/service/${data.id}`,
        data: data,
      });
      return response.data;
    } catch (error) {
      console.log("ERR ", error);
      throw error;
    }
  }
);

const serviceSlice = createSlice({
  name: "services",
  initialState,
  extraReducers: (builder) => {
    // Fetch
    builder.addCase(fetchServices.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchServices.fulfilled,
      (state, action: PayloadAction<Array<Service>>) => {
        state.loading = false;
        state.services = action.payload;
      }
    );
    builder.addCase(fetchServices.rejected, (state, action) => {
      state.loading = false;
      state.services = [];
      state.error = action.error.message;
    });

    // Create
    builder.addCase(createService.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      createService.fulfilled,
      (state, action: PayloadAction<Service>) => {
        state.loading = false;
        state.services.push(action.payload);
        state.showForm = false;
      }
    );
    builder.addCase(createService.rejected, (state, action) => {
      state.loading = false;
      state.services = [];
      state.error = action.error.message;
    });

    // Update
    builder.addCase(updateService.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      updateService.fulfilled,
      (state, action: PayloadAction<Service>) => {
        state.loading = false;
        console.log(action.payload);
        const idx = state.services.findIndex(
          (service) => service.id == action.payload.id
        );

        if (idx !== -1) {
          state.services[idx] = action.payload;
        }

        state.showForm = false;
      }
    );
    builder.addCase(updateService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Delete
    builder.addCase(deleteService.fulfilled, (state, action) => {
      state.loading = false;
      const deletedService = action.payload;

      state.services = state.services.filter(
        (service) => service.id !== deletedService.id
      );
    });

    builder.addCase(deleteService.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Get by id
    builder.addCase(getServiceById.fulfilled, (state, action) => {
      state.loading = false;
      state.service = action.payload;
    });
    builder.addCase(getServiceById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getServiceById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
  reducers: {
    toggleShowForm: (state) => {
      state.showForm = !state.showForm;
      state.isEditForm = false;
      state.service = null;
    },
    isEditForm: (state, action) => {
      state.isEditForm = true;
      state.service =
        state.services.find((e) => e.id === action.payload) || null;
      state.showForm = true;
    },
  },
});
export const { toggleShowForm, isEditForm } = serviceSlice.actions;
export const serviceSelector = (state: RootState) => state.services;
export default serviceSlice.reducer;
