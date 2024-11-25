import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getDishById,
  createDish,
  updateDish,
  deleteDish,
  getDishesWithPagi,
} from '@/_lib/menus';
import { Menu } from '@/types/Menu';

export interface DishesState {
  items: Menu[];
  selectedDish: Menu | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  filters: {
    category_id?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: 'price_asc' | 'price_desc';
    name?: string;
  };
}

const initialState: DishesState = {
  items: [],
  selectedDish: null,
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 9,
  filters: {},
};

// Async Thunks
export const fetchDishesWithPagination = createAsyncThunk(
  'dishes/fetchDishesWithPagination',
  async (
    {
      page,
      limit,
      filters,
    }: { page: number; limit: number; filters?: DishesState['filters'] },
    { rejectWithValue }
  ) => {
    console.log(filters);
    try {
      const data = await getDishesWithPagi(page, limit, filters);
      console.log(data);
      return {
        dishes: data.menuItems,
        page,
        totalItems: data.totalMenuItems,
        totalPages: data.totalPages,
      };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Fetch dish by ID
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

export const addDish = createAsyncThunk<Menu, Menu>(
  'menus/addDish',
  async (dish, { rejectWithValue }) => {
    try {
      const data = await createDish(dish);
      return data;
    } catch (error) {
      return rejectWithValue('Dish could not be created');
    }
  }
);

export const editDish = createAsyncThunk<Menu, { id: string; dish: Menu }>(
  'dishes/editDish',
  async ({ id, dish }, { rejectWithValue }) => {
    try {
      const response = await updateDish(id, dish);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const removeDish = createAsyncThunk<string, string>(
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

const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {
    clearSelectedDish: (state) => {
      state.selectedDish = null;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string | undefined>) => {
      state.filters.category_id = action.payload;
    },
    setSortOrder: (
      state,
      action: PayloadAction<'price_asc' | 'price_desc'>
    ) => {
      state.filters.sort = action.payload;
    },

    resetPagination: (state) => {
      state.currentPage = 1;
      state.totalPages = 1;
      state.totalItems = 0;
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch dishes with pagination
      .addCase(fetchDishesWithPagination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDishesWithPagination.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.dishes;
        state.currentPage = action.payload.page;
        state.totalItems = action.payload.totalItems;
        state.totalPages = action.payload.totalPages;
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

export const {
  clearSelectedDish,
  setItemsPerPage,
  setSelectedCategory,
  setSortOrder,
  resetPagination,
} = dishesSlice.actions;

export default dishesSlice.reducer;
