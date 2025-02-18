import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InitialStateTypes {
  isDrawerOpen: boolean;
  isIngredientPurchaseDrawerOpen: boolean;
}

const initialState: InitialStateTypes = {
  isDrawerOpen: false,
  isIngredientPurchaseDrawerOpen: false,
};

export const drawersSlice = createSlice({
  name: 'drawers',
  initialState,
  reducers: {
    setIsDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.isDrawerOpen = action.payload;
    },
    setIsIngredientPurchaseDrawerOpen: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isIngredientPurchaseDrawerOpen = action.payload;
    },
  },
});

export const { setIsDrawerOpen, setIsIngredientPurchaseDrawerOpen } =
  drawersSlice.actions;

export default drawersSlice.reducer;
