import { Navigate, useLocation } from 'react-router-dom';

import { Preloader } from '@ui';

import { selectIsAuthChecked, selectUser } from '@selectors';
import { useSelector } from '@services/store';

import type { Location } from 'react-router-dom';
import type { ProtectedRouteProps } from './type';

export const ProtectedRoute = ({
  children,
  onlyUnAuth = false,
}: ProtectedRouteProps): React.JSX.Element => {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const user = useSelector(selectUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const from = (location.state as { from?: Location } | null)?.from;
    return <Navigate replace to={from?.pathname ?? '/'} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to="/login" state={{ from: location }} />;
  }

  return <>{children}</>;
};
