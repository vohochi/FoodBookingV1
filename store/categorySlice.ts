import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '@/types/Category';

const initialState: Category[] = [
  {
    id: 1,
    name: 'Đồ Ăn',
    description: 'Món ăn ngon miệng và đa dạng.',
    createdAt: '2024-01-01',
  },
  {
    id: 2,
    name: 'Đồ Uống',
    description: 'Nước giải khát tươi mát và thơm ngon.',
    createdAt: '2024-01-02',
  },
  {
    id: 3,
    name: 'Tráng Miệng',
    description: 'Các món tráng miệng ngọt ngào.',
    createdAt: '2024-01-03',
  },
];

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.push(action.payload);
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteCategory: (state, action: PayloadAction<number>) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addCategory, updateCategory, deleteCategory } =
  categorySlice.actions;

export default categorySlice;
