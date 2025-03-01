'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  reqToken: string | null;
}

const initialState: AuthState = {
  reqToken: null
};

const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setReqToken: (state, action: PayloadAction<string | null>) => {
      state.reqToken = action.payload;
    }
  }
});

export const { setReqToken } = authSlice.actions;
export default authSlice.reducer;
