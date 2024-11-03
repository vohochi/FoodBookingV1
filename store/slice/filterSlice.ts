// features/filterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PriceRange = [number | "all", number | "all"];

interface FilterState {
    searchTerm: string;
    categoryId: number | null;
    priceRange: PriceRange; 
}

const initialState: FilterState = {
    searchTerm: "",
    categoryId: null,
    priceRange: ["all", "all"], 
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setCategory(state, action: PayloadAction<number | null>) {
      state.categoryId = action.payload;
    },
    setPriceRange(state, action: PayloadAction<PriceRange>) {
      state.priceRange = action.payload;
    },
  },
});

export const { setSearchTerm, setCategory, setPriceRange } = filterSlice.actions;
export default filterSlice.reducer;
