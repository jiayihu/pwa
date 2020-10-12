import { Action } from '../actions';
import { Notification } from '../../types/notification';
import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from '../actions/notifications.actions';

export type NotificationsState = Array<Notification>;

export const notificationsReducer = (
  state: NotificationsState = [],
  action: Action,
): NotificationsState => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return state.concat(action.payload);
    case REMOVE_NOTIFICATION:
      return state.filter(notification => notification.message !== action.payload.message);
    default:
      return state;
  }
};
