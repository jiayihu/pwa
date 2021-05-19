import { Notification } from '../../types/notification';

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export const addNotification = (notification: Notification) => {
  return {
    type: ADD_NOTIFICATION as typeof ADD_NOTIFICATION,
    payload: notification,
  };
};

export const removeNotification = (notification: Notification) => {
  return {
    type: REMOVE_NOTIFICATION as typeof REMOVE_NOTIFICATION,
    payload: notification,
  };
};

export type NotificationsAction =
  | ReturnType<typeof addNotification>
  | ReturnType<typeof removeNotification>;
