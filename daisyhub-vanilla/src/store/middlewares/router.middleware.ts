import { History } from 'history';
import { Middleware, Action } from 'redux';

export type PushAction = {
  type: 'PUSH_HISTORY';
  payload: { path: string };
};

export const push = (path: string): PushAction => {
  return {
    type: 'PUSH_HISTORY',
    payload: { path },
  };
};

const isPushAction = (action: Action): action is PushAction => action.type === 'PUSH_HISTORY';

export const routerMiddleware = (history: History): Middleware => _ => next => action => {
  if (isPushAction(action)) return history.push(action.payload.path);

  return next(action);
};
