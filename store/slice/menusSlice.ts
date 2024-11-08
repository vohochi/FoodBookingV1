import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getDishes,
  getDishById,
  createDish,
  updateDish,
  deleteDish,
  getDishesWithPagi,
} from '@/_lib/menus';
import { Menu } from '@/types/Menu';

interface DishesState {
  items: Menu[];
  selectedDish: Menu | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

const initialState: DishesState = {
  items: [],
  selectedDish: null,
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  itemsPerPage: 10,
};

// Async Thunks
export const fetchDishes = createAsyncThunk(
  'dishes/fetchDishes',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getDishes();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchDishesWithPagination = createAsyncThunk(
  'dishes/fetchDishesWithPagination',
  async (
    { page, limit }: { page: number; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const data = await getDishesWithPagi(page, limit);
      return { dishes: data, page, limit };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchDishById = createAsyncThunk(
  'dishes/fetchDishById',
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await getDishById(id);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const addDish = createAsyncThunk(
  'dishes/addDish',
  async (dish: Menu, { rejectWithValue }) => {
    try {
      const data = await createDish(dish);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const editDish = createAsyncThunk(
  'dishes/editDish',
  async ({ id, dish }: { id: string; dish: Menu }, { rejectWithValue }) => {
    try {
      const data = await updateDish(id, dish);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const removeDish = createAsyncThunk(
  'dishes/removeDish',
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteDish(id);
      return id;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const menus = createSlice({
  name: 'dishes',
  initialState,
  reducers: {
    clearSelectedDish: (state) => {
      state.selectedDish = null;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all dishes
      .addCase(fetchDishes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDishes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchDishes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch dishes with pagination
      .addCase(fetchDishesWithPagination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDishesWithPagination.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.dishes;
        state.currentPage = action.payload.page;
      })
      .addCase(fetchDishesWithPagination.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch single dish
      .addCase(fetchDishById.fulfilled, (state, action) => {
        state.selectedDish = action.payload;
      })
      // Add dish
      .addCase(addDish.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Edit dish
      .addCase(editDish.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Remove dish
      .addCase(removeDish.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      });
  },
});

export const { clearSelectedDish, setItemsPerPage } = menus.actions;
export default menus.reducer;
