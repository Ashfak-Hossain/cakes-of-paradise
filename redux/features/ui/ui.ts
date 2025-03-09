import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InitialStateTypes {
  isSidebarOpen: boolean;
  isMobileSidebarOpen: boolean;
}

const initialState: InitialStateTypes = {
  isSidebarOpen: false,
  isMobileSidebarOpen: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setIsSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
    setIsMobileSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileSidebarOpen = action.payload;
    },
  },
});

export const { setIsSidebarOpen, setIsMobileSidebarOpen } = uiSlice.actions;

export default uiSlice.reducer;
