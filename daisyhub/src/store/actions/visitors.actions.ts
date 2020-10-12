import { Visitor } from '../../types/visitor';

export const SUBSCRIBE_TO_VISITORS = 'SUBSCRIBE_TO_VISITORS';
export const UNSUBSCRIBE_TO_VISITORS = 'UNSUBSCRIBE_TO_VISITORS';
export const UPDATE_VISITORS = 'UPDATE_VISITORS';

export const ADD_BULLETIN_VISITOR = 'ADD_BULLETIN_VISITOR';
export const SET_BULLETIN_VISITOR_ID = 'SET_BULLETIN_VISITOR_ID';
export const REMOVE_BULLETIN_VISITOR = 'REMOVE_BULLETIN_VISITOR';

export const subscribeToVisitors = (bulletinId: string) => {
  return {
    type: SUBSCRIBE_TO_VISITORS as typeof SUBSCRIBE_TO_VISITORS,
    payload: { bulletinId },
  };
};

export const unsubscribeToVisitors = (bulletinId: string) => {
  return {
    type: UNSUBSCRIBE_TO_VISITORS as typeof UNSUBSCRIBE_TO_VISITORS,
    payload: { bulletinId },
  };
};

export const updateVisitors = (visitors: Visitor[]) => {
  return {
    type: UPDATE_VISITORS as typeof UPDATE_VISITORS,
    payload: { visitors },
  };
};

export const addBulletinVisitor = (bulletinId: string, name: string) => {
  return {
    type: ADD_BULLETIN_VISITOR as typeof ADD_BULLETIN_VISITOR,
    payload: { bulletinId, name },
  };
};

export const setBulletinVisitorId = (visitorId: string | null) => {
  return {
    type: SET_BULLETIN_VISITOR_ID as typeof SET_BULLETIN_VISITOR_ID,
    payload: { visitorId },
  };
};

export const removeBulletinVisitor = (bulletinId: string, visitorId: string) => {
  return {
    type: REMOVE_BULLETIN_VISITOR as typeof REMOVE_BULLETIN_VISITOR,
    payload: { bulletinId, visitorId },
  };
};

export type VisitorsAction =
  | ReturnType<typeof subscribeToVisitors>
  | ReturnType<typeof unsubscribeToVisitors>
  | ReturnType<typeof updateVisitors>
  | ReturnType<typeof addBulletinVisitor>
  | ReturnType<typeof setBulletinVisitorId>
  | ReturnType<typeof removeBulletinVisitor>;
