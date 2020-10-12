import {
  GET_BULLETINS_SUCCEEDED,
  GET_BULLETIN_SUCCEEDED,
  DELETE_BULLETIN,
} from '../actions/bulletin.actions';
import { Bulletin } from '../../types/bulletin';
import { Action } from '../actions';

export type BulletinsState = Bulletin[] | null;

export const bulletinsReducer = (state: BulletinsState = null, action: Action): BulletinsState => {
  switch (action.type) {
    case GET_BULLETINS_SUCCEEDED:
      return action.payload;
    case GET_BULLETIN_SUCCEEDED: {
      const bulletin = action.payload;
      if (!state) return [bulletin];
      return state.filter(x => x.id !== bulletin.id).concat(bulletin);
    }
    case DELETE_BULLETIN:
      if (!state) return state;
      return state.filter(x => x.id !== action.payload.bulletinId);

    default:
      return state;
  }
};
