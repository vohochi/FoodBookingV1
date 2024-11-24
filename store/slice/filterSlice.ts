import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PriceRange = [number | "all", number | "all"];
export type SortOrder = 'price_asc' | 'price_desc' | undefined; 

interface FilterState {
  name: string;
  category: string;
  priceRange: PriceRange;
  sortOrder: SortOrder;  
  minPrice: number | null;
  maxPrice: number | null;
}

const initialState: FilterState = {
  name: "",
  category: "",
  priceRange: ["all", "all"],
  sortOrder: undefined,  
  minPrice: null,
  maxPrice: null,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setPriceRange(state, action: PayloadAction<PriceRange>) {
      state.priceRange = action.payload;
    },
    setMinPrice(state, action: PayloadAction<number | null>) {
      state.minPrice = action.payload;
    },
    setMaxPrice(state, action: PayloadAction<number | null>) {
      state.maxPrice = action.payload;
    },
    setSortOrder(state, action: PayloadAction<SortOrder>) {
      state.sortOrder = action.payload;  
    },
    resetPriceFilter(state) {
      state.minPrice = null;
      state.maxPrice = null;
    },
  },
});

export const {
  setSearchTerm,
  setCategory,
  setPriceRange,
  setMinPrice,
  setMaxPrice,
  setSortOrder,
  resetPriceFilter
} = filterSlice.actions;

export default filterSlice.reducer;
