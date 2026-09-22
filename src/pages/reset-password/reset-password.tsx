import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ResetPasswordUI } from '@ui-pages';

import { selectPasswordError } from '@selectors';
import { resetPassword } from '@slices/userSlice';
import { useDispatch, useSelector } from '@services/store';

import type { SyntheticEvent } from 'react';

export const ResetPassword = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectPasswordError);
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();

    void dispatch(resetPassword({ password, token }))
      .unwrap()
      .then(() => {
        localStorage.removeItem('resetPassword');
        void navigate('/login', { replace: true });
      });
  };

  useEffect(() => {
    if (!localStorage.getItem('resetPassword')) {
      void navigate('/forgot-password', { replace: true });
    }
  }, [navigate]);

  return (
    <ResetPasswordUI
      errorText={error ?? undefined}
      password={password}
      token={token}
      setPassword={setPassword}
      setToken={setToken}
      handleSubmit={handleSubmit}
    />
  );
};
