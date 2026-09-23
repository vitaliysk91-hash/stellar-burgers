import { useState } from 'react';

import { selectRegisterError } from '@selectors';
import { useDispatch, useSelector } from '@services/store';
import { registerUser } from '@slices/userSlice';
import { RegisterUI } from '@ui-pages';

import type { SyntheticEvent } from 'react';

export const Register = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const error = useSelector(selectRegisterError);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();
    void dispatch(registerUser({ email, name: userName, password }));
  };

  return (
    <RegisterUI
      errorText={error ?? undefined}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
