import { useEffect, useState } from 'react';

import { ProfileUI } from '@ui-pages';

import { selectUpdateError, selectUser } from '@selectors';
import { clearUpdateError, updateUser } from '@slices/userSlice';
import { useDispatch, useSelector } from '@services/store';

import type { SyntheticEvent } from 'react';

export const Profile = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const updateUserError = useSelector(selectUpdateError);
  const [formValue, setFormValue] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    password: '',
  });

  useEffect(() => {
    setFormValue({
      name: user?.name ?? '',
      email: user?.email ?? '',
      password: '',
    });
  }, [user]);

  const isFormChanged =
    formValue.name !== (user?.name ?? '') ||
    formValue.email !== (user?.email ?? '') ||
    Boolean(formValue.password);

  const handleSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();

    const data: { name: string; email: string; password?: string } = {
      email: formValue.email,
      name: formValue.name,
    };

    if (formValue.password) {
      data.password = formValue.password;
    }

    void dispatch(updateUser(data))
      .unwrap()
      .then((updatedUser) => {
        setFormValue({
          name: updatedUser.name,
          email: updatedUser.email,
          password: '',
        });
      });
  };

  const handleCancel = (event: SyntheticEvent): void => {
    event.preventDefault();
    dispatch(clearUpdateError());
    setFormValue({
      name: user?.name ?? '',
      email: user?.email ?? '',
      password: '',
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormValue((previousState) => ({
      ...previousState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      updateUserError={updateUserError ?? undefined}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
