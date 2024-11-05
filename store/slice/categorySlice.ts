// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { Category } from '@/types/Category';


// const categorySlice = createSlice({
//   name: 'categories',
//   initialState,
//   reducers: {
//     addCategory: (state, action: PayloadAction<Category>) => {
//       state.push(action.payload);
//     },
//     updateCategory: (state, action: PayloadAction<Category>) => {
//       const index = state.findIndex((item) => item.id === action.payload.id);
//       if (index !== -1) {
//         state[index] = action.payload;
//       }
//     },
//     deleteCategory: (state, action: PayloadAction<number>) => {
//       return state.filter((item) => item.id !== action.payload);
//     },
//   },
// });

// export const { addCategory, updateCategory, deleteCategory } =
//   categorySlice.actions;

// export default categorySlice;
