import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Ingredient } from '@/schemas/ingredient';
import { InventoryItem } from '@/services/inventory';

interface IngredientState {
  formInitialData: Ingredient | null;
}

const initialState: IngredientState = {
  formInitialData: null,
};

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setSelectedIngredient: (state, action: PayloadAction<InventoryItem>) => {
      state.formInitialData = {
        ingredient_id: action.payload.ingredient_id,
        ingredient_name: action.payload.ingredient_name,
        unit_of_measure: action.payload.unit_of_measure,
        stock: parseInt(action.payload.current_stock),
        cost: parseInt(action.payload.purchases[0].unit_cost),
        reorder_level: parseInt(action.payload.reorder_level),
        supplier_id: action.payload.supplier_id,
      };
    },
    clearSelectedIngredient: (state) => {
      state.formInitialData = null;
    },
  },
});

export const { setSelectedIngredient, clearSelectedIngredient } = ingredientSlice.actions;

export default ingredientSlice.reducer;
