import { useLocation, useNavigate } from 'react-router-dom';

import { ProfileMenuUI } from '@ui';

import { clearUserOrders } from '@slices/userOrdersSlice';
import { logoutUser } from '@slices/userSlice';
import { useDispatch } from '@services/store';

export const ProfileMenu = (): React.JSX.Element => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = (): void => {
    void dispatch(logoutUser())
      .unwrap()
      .then(() => {
        dispatch(clearUserOrders());
        void navigate('/login', { replace: true });
      });
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
