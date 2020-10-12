import {
  UPDATE_BULLETIN,
  NOTIFY_UNSUB_BULLETIN,
  UNSUBSCRIBE_TO_BULLETIN,
  SET_BULLETIN_OWNER_ID,
} from '../actions/bulletin.actions';
import { UPDATE_VISITORS, SET_BULLETIN_VISITOR_ID } from '../actions/visitors.actions';
import { Action } from '../actions';
import { Visitor } from '../../types/visitor';
import { Bulletin } from '../../types/bulletin';
import { Message } from '../../types/message';
import { UPDATE_MESSAGES } from '../actions/messages.actions';

export type BulletinState = {
  bulletin: Bulletin | null;
  visitors: Visitor[];
  messages: Message[];
  ownerId: string | null;
  visitorId: string | null;
  isUnsubscribed: boolean;
};

const initialState: BulletinState = {
  bulletin: null,
  visitors: [],
  messages: [],
  ownerId: null,
  visitorId: null,
  isUnsubscribed: false,
};

export const bulletinReducer = (
  state: BulletinState = initialState,
  action: Action,
): BulletinState => {
  switch (action.type) {
    case UNSUBSCRIBE_TO_BULLETIN:
      return initialState;
    case UPDATE_BULLETIN:
      return {
        ...state,
        bulletin: action.payload.bulletin,
      };
    case UPDATE_VISITORS:
      return {
        ...state,
        visitors: action.payload.visitors,
      };
    case UPDATE_MESSAGES:
      return {
        ...state,
        messages: action.payload.messages,
      };
    case SET_BULLETIN_OWNER_ID:
      return {
        ...state,
        ownerId: action.payload.ownerId,
      };
    case SET_BULLETIN_VISITOR_ID:
      return {
        ...state,
        visitorId: action.payload.visitorId,
      };
    case NOTIFY_UNSUB_BULLETIN:
      return {
        ...state,
        isUnsubscribed: true,
      };
    default:
      return state;
  }
};
