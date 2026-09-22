import {
  checkUserAuth,
  loginUser,
  updateUser,
  userReducer,
} from '@slices/userSlice';

const user = { name: 'Виталий', email: 'vitalii@example.com' };

describe('userSlice', () => {
  it('finishes auth check for an anonymous user', () => {
    const state = userReducer(undefined, checkUserAuth.fulfilled(null, 'request', undefined));
    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toBeNull();
  });

  it('stores authenticated user after login', () => {
    const state = userReducer(
      undefined,
      loginUser.fulfilled(user, 'request', {
        email: 'vitalii@example.com',
        password: 'password',
      })
    );
    expect(state.user).toEqual(user);
    expect(state.isAuthChecked).toBe(true);
  });

  it('updates profile data', () => {
    const state = userReducer(
      { ...userReducer(undefined, { type: '@@INIT' }), user },
      updateUser.fulfilled(user, 'request', { name: 'Виталий' })
    );
    expect(state.user).toEqual(user);
  });
});
