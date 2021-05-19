import { all, call, take, takeLatest, race } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';
import * as actions from '../actions/messages.actions';
import { getRealtimeMessages, addBulletinMessage } from '../../services/messages.service';
import { handleSagaError } from './handleSagaError';
import { EventChannel } from 'redux-saga';
import { Message } from '../../types/message';
import { isEndMessage, createRealTimeChannel } from './realtime-channel';

function* watchMessagesSaga(action: ReturnType<typeof actions.subscribeToMessages>) {
  const bulletinId = action.payload.bulletinId;
  const source = getRealtimeMessages(bulletinId);
  const channel: EventChannel<Message[]> = yield call(createRealTimeChannel, source);

  try {
    while (true) {
      const { message, cancel } = yield race({
        message: take(channel),
        cancel: take(actions.UNSUBSCRIBE_TO_MESSAGES),
      });

      if (message && isEndMessage(message)) {
        // Just close the channel, notification is handled by the watchBulletin saga
        channel.close();
      } else if (cancel) channel.close();
      else if (message) yield put(actions.updateMessages(message));
    }
  } catch (error) {
    yield* handleSagaError(error);
  } finally {
    channel.close();
  }
}

function* addBulletinMessageSaga(action: ReturnType<typeof actions.addBulletinMessage>) {
  try {
    const { bulletinId, body } = action.payload;
    yield call<typeof addBulletinMessage>(addBulletinMessage, bulletinId, body);
  } catch (error) {
    yield* handleSagaError(error);
  }
}

export function* messagesSaga() {
  yield all([
    takeLatest(actions.SUBSCRIBE_TO_MESSAGES, watchMessagesSaga),
    takeLatest(actions.ADD_BULLETIN_MESSAGE, addBulletinMessageSaga),
  ]);
}
