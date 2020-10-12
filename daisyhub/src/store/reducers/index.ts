import { combineReducers } from 'redux';
import { bulletinsReducer, BulletinsState } from './bulletins.reducer';
import { Action } from '../actions';
import { NotificationsState, notificationsReducer } from './notifications.reducer';
import { BulletinState, bulletinReducer } from './bulletin.reducer';

export type AppState = {
  bulletins: BulletinsState;
  bulletin: BulletinState;
  notifications: NotificationsState;
};

export const reducer = combineReducers<AppState, Action>({
  bulletins: bulletinsReducer,
  bulletin: bulletinReducer,
  notifications: notificationsReducer,
});

export const selectBulletins = (state: AppState) => state.bulletins;

export const selectStaticBulletin = (bulletinId: string) => (state: AppState) => {
  if (!state.bulletins) return null;

  const bulletin = state.bulletins.find(bulletin => bulletin.id === bulletinId);
  return bulletin ? bulletin : null;
};

export const selectBulletin = (state: AppState) => state.bulletin.bulletin;

export const selectIsUnsubBulletin = (state: AppState) => state.bulletin.isUnsubscribed;

export const selectBulletinVisitors = (state: AppState) => state.bulletin.visitors;
export const selectBulletinOwnerId = (state: AppState) => state.bulletin.ownerId;
export const selectBulletinVisitorId = (state: AppState) => state.bulletin.visitorId;

export const selectBulletinMessages = (state: AppState) => state.bulletin.messages;

export const selectNotifications = (state: AppState) => state.notifications;
