import { Message, MessageBody } from '../../types/message';

export const SUBSCRIBE_TO_MESSAGES = 'SUBSCRIBE_TO_MESSAGES';
export const UNSUBSCRIBE_TO_MESSAGES = 'UNSUBSCRIBE_TO_MESSAGES';
export const UPDATE_MESSAGES = 'UPDATE_MESSAGES';
export const ADD_BULLETIN_MESSAGE = 'ADD_BULLETIN_MESSAGE';

export const subscribeToMessages = (bulletinId: string) => {
  return {
    type: SUBSCRIBE_TO_MESSAGES as typeof SUBSCRIBE_TO_MESSAGES,
    payload: { bulletinId },
  };
};

export const unsubscribeToMessages = (bulletinId: string) => {
  return {
    type: UNSUBSCRIBE_TO_MESSAGES as typeof UNSUBSCRIBE_TO_MESSAGES,
    payload: { bulletinId },
  };
};

export const updateMessages = (messages: Message[]) => {
  return {
    type: UPDATE_MESSAGES as typeof UPDATE_MESSAGES,
    payload: { messages },
  };
};

export const addBulletinMessage = (bulletinId: string, body: MessageBody) => {
  return {
    type: ADD_BULLETIN_MESSAGE as typeof ADD_BULLETIN_MESSAGE,
    payload: { bulletinId, body },
  };
};

export type MessagesAction =
  | ReturnType<typeof subscribeToMessages>
  | ReturnType<typeof unsubscribeToMessages>
  | ReturnType<typeof updateMessages>
  | ReturnType<typeof addBulletinMessage>;
