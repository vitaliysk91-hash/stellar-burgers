import { AppHeaderUI } from '@ui';

import { selectUser } from '@selectors';
import { useSelector } from '@services/store';

export const AppHeader = (): React.JSX.Element => {
  const user = useSelector(selectUser);

  return <AppHeaderUI userName={user?.name} />;
};
