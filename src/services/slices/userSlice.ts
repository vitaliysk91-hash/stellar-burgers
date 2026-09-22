import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  refreshToken,
  registerUserApi,
  resetPasswordApi,
  updateUserApi,
} from '@api';
import { deleteCookie, getCookie, setCookie } from '@utils/cookie';

import type { TLoginData, TRegisterData } from '@api';
import type { TUser } from '@utils-types';

type UserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  loginError: string | null;
  registerError: string | null;
  updateError: string | null;
  passwordError: string | null;
};

const initialState: UserState = {
  user: null,
  isAuthChecked: false,
  loginError: null,
  registerError: null,
  updateError: null,
  passwordError: null,
};

const saveTokens = (accessToken: string, refreshTokenValue: string): void => {
  setCookie('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshTokenValue);
};

const clearTokens = (): void => {
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
};

export const checkUserAuth = createAsyncThunk<TUser | null>(
  'user/checkAuth',
  async () => {
    try {
      if (!getCookie('accessToken') && localStorage.getItem('refreshToken')) {
        await refreshToken();
      }

      if (!getCookie('accessToken')) {
        return null;
      }

      return (await getUserApi()).user;
    } catch (error) {
      clearTokens();
      throw error;
    }
  }
);

export const loginUser = createAsyncThunk('user/login', async (data: TLoginData) => {
  const response = await loginUserApi(data);
  saveTokens(response.accessToken, response.refreshToken);
  return response.user;
});

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    saveTokens(response.accessToken, response.refreshToken);
    return response.user;
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (data: Partial<TRegisterData>) => (await updateUserApi(data)).user
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  clearTokens();
});

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (email: string) => forgotPasswordApi({ email })
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (data: { password: string; token: string }) => resetPasswordApi(data)
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUpdateError: (state) => {
      state.updateError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(checkUserAuth.rejected, (state) => {
        state.user = null;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginError = action.error.message ?? 'Не удалось войти';
      })
      .addCase(registerUser.pending, (state) => {
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerError = action.error.message ?? 'Не удалось зарегистрироваться';
      })
      .addCase(updateUser.pending, (state) => {
        state.updateError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateError = action.error.message ?? 'Не удалось обновить данные';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.passwordError = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.passwordError = action.error.message ?? 'Не удалось восстановить пароль';
      })
      .addCase(resetPassword.pending, (state) => {
        state.passwordError = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.passwordError = action.error.message ?? 'Не удалось изменить пароль';
      });
  },
});

export const userReducer = userSlice.reducer;
export const { clearUpdateError } = userSlice.actions;
