import { useEffect } from 'react';

import { FeedUI } from '@ui-pages';
import { Preloader } from '@ui';

import {
  selectFeedError,
  selectFeedLoading,
  selectFeedOrders,
  selectIngredientsError,
} from '@selectors';
import { fetchFeed } from '@slices/feedSlice';
import { useDispatch, useSelector } from '@services/store';

const FEED_REFRESH_INTERVAL = 15_000;

export const Feed = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const orders = useSelector(selectFeedOrders);
  const isLoading = useSelector(selectFeedLoading);
  const feedError = useSelector(selectFeedError);
  const ingredientsError = useSelector(selectIngredientsError);

  const handleGetFeeds = (): void => {
    void dispatch(fetchFeed());
  };

  useEffect(() => {
    handleGetFeeds();
    const timer = window.setInterval(handleGetFeeds, FEED_REFRESH_INTERVAL);
    return () => window.clearInterval(timer);
  }, []);

  if (isLoading && !orders.length) {
    return <Preloader />;
  }

  if (ingredientsError) {
    return (
      <p className="text text_type_main-medium mt-30" style={{ textAlign: 'center' }}>
        {ingredientsError}
      </p>
    );
  }

  if (feedError && !orders.length) {
    return (
      <p className="text text_type_main-medium mt-30" style={{ textAlign: 'center' }}>
        {feedError}
      </p>
    );
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
