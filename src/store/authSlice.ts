'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  reqToken: string | null;
  sessionId: string | null;
  username: string | null;
}

const initialState: AuthState = {
  reqToken: null,
  sessionId: null,
  username: null
};

const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setReqToken: (state, action: PayloadAction<string | null>) => {
      state.reqToken = action.payload;
    },
    setSessionId: (state, action: PayloadAction<string | null>) => {
      state.sessionId = action.payload;
    },
    setUsername: (state, action: PayloadAction<string | null>) => {
      state.username = action.payload;
    },
    logout: state => {
      state.reqToken = null;
      state.sessionId = null;
      state.username = null;
    }
  }
});

export const { setReqToken, setSessionId, setUsername, logout } =
  authSlice.actions;
export default authSlice.reducer;
