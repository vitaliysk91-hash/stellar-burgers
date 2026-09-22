import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { LoginUI } from '@ui-pages';

import { selectLoginError } from '@selectors';
import { loginUser } from '@slices/userSlice';
import { useDispatch, useSelector } from '@services/store';

import type { Location } from 'react-router-dom';
import type { SyntheticEvent } from 'react';

export const Login = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const error = useSelector(selectLoginError);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();

    void dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        const from = (location.state as { from?: Location } | null)?.from;
        void navigate(from?.pathname ?? '/', { replace: true });
      });
  };

  return (
    <LoginUI
      errorText={error ?? undefined}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
