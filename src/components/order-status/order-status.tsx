import { OrderStatusUI } from '@ui';

import type { OrderStatusProps } from './type';

const STATUS_TEXT: Record<string, string> = {
  canceled: 'Отменён',
  cancelled: 'Отменён',
  created: 'Создан',
  done: 'Выполнен',
  pending: 'Готовится',
};

const STATUS_COLOR: Record<string, string> = {
  canceled: '#E52B1A',
  cancelled: '#E52B1A',
  created: '#F2F2F3',
  done: '#00CCCC',
  pending: '#F2F2F3',
};

const UNKNOWN_STATUS_TEXT = 'Неизвестен';
const UNKNOWN_STATUS_COLOR = '#F2F2F3';

export const OrderStatus = ({ status }: OrderStatusProps): React.JSX.Element => (
  <OrderStatusUI
    textStyle={STATUS_COLOR[status] ?? UNKNOWN_STATUS_COLOR}
    text={STATUS_TEXT[status] ?? UNKNOWN_STATUS_TEXT}
  />
);
