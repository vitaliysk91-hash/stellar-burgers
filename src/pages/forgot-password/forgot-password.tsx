import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ForgotPasswordUI } from '@ui-pages';

import { selectPasswordError } from '@selectors';
import { forgotPassword } from '@slices/userSlice';
import { useDispatch, useSelector } from '@services/store';

import type { SyntheticEvent } from 'react';

export const ForgotPassword = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectPasswordError);
  const [email, setEmail] = useState('');

  const handleSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();

    void dispatch(forgotPassword(email))
      .unwrap()
      .then(() => {
        localStorage.setItem('resetPassword', 'true');
        void navigate('/reset-password', { replace: true });
      });
  };

  return (
    <ForgotPasswordUI
      errorText={error ?? undefined}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};
