import { FeedInfoUI } from '@ui';

import { selectFeed } from '@selectors';
import { useSelector } from '@services/store';

import type { TOrder } from '@utils-types';

const getOrders = (orders: TOrder[], statuses: string[]): number[] =>
  orders
    .filter((item) => statuses.includes(item.status))
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo = (): React.JSX.Element => {
  const feed = useSelector(selectFeed);
  const readyOrders = getOrders(feed.orders, ['done']);
  const pendingOrders = getOrders(feed.orders, ['pending', 'created']);

  return (
    <FeedInfoUI readyOrders={readyOrders} pendingOrders={pendingOrders} feed={feed} />
  );
};
