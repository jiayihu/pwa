import { all, call, take, takeLatest, race, select } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';
import * as actions from '../actions/visitors.actions';
import {
  getRealtimeVisitors,
  removeBulletinVisitor,
  addBulletinVisitor,
} from '../../services/visitors.service';
import { handleSagaError } from './handleSagaError';
import { EventChannel } from 'redux-saga';
import { Visitor } from '../../types/visitor';
import { selectBulletinVisitorId } from '../reducers';
import {
  saveVisitorToHistory,
  removeVisitorFromHistory,
  readVisitorId,
} from '../../services/bulletin-history.service';
import { isEndMessage, createRealTimeChannel } from './realtime-channel';

function* watchVisitorsSaga(action: ReturnType<typeof actions.subscribeToVisitors>) {
  const bulletinId = action.payload.bulletinId;
  const source = getRealtimeVisitors(bulletinId);
  const channel: EventChannel<Visitor[]> = yield call(createRealTimeChannel, source);

  const id = yield call(readVisitorId, bulletinId);
  if (id) yield put(actions.setBulletinVisitorId(id));

  try {
    while (true) {
      const { message, cancel } = yield race({
        message: take(channel),
        cancel: take(actions.UNSUBSCRIBE_TO_VISITORS),
      });

      if (message && isEndMessage(message)) {
        // Just close the channel, notification is handled by the watchBulletin saga
        channel.close();
      } else if (cancel) channel.close();
      else if (message) {
        const visitors: Visitor[] = message;
        yield put(actions.updateVisitors(message));

        // Check if user has been removed by the host
        const visitorId = yield select(selectBulletinVisitorId);
        if (visitorId && !visitors.find(x => x.id === visitorId)) {
          removeVisitorFromHistory(visitorId);
          yield put(actions.setBulletinVisitorId(null));
        }
      }
    }
  } catch (error) {
    yield* handleSagaError(error);
  } finally {
    channel.close();
  }
}

function* addBulletinVisitorSaga(action: ReturnType<typeof actions.addBulletinVisitor>) {
  try {
    const { bulletinId, name } = action.payload;
    const response = yield call<typeof addBulletinVisitor>(addBulletinVisitor, bulletinId, name);
    yield put(actions.setBulletinVisitorId(response.id));
    yield call(saveVisitorToHistory, bulletinId, response.id);
  } catch (error) {
    yield* handleSagaError(error);
  }
}

/**
 * The saga is invoked for both when an owner is removing a visitor and when
 * the visitor is leaving the queue
 */
function* removeBulletinVisitorSaga(action: ReturnType<typeof actions.removeBulletinVisitor>) {
  try {
    const { bulletinId, visitorId } = action.payload;
    yield call<typeof removeBulletinVisitor>(removeBulletinVisitor, bulletinId, visitorId);
    const activeVisitorId = yield select(selectBulletinVisitorId);

    if (activeVisitorId === visitorId) {
      // The user is removing himself, aka leaving the queue
      yield put(actions.setBulletinVisitorId(null));
      yield call(removeVisitorFromHistory, visitorId);
    }
  } catch (error) {
    yield* handleSagaError(error);
  }
}

export function* visitorsSaga() {
  yield all([
    takeLatest(actions.SUBSCRIBE_TO_VISITORS, watchVisitorsSaga),
    takeLatest(actions.ADD_BULLETIN_VISITOR, addBulletinVisitorSaga),
    takeLatest(actions.REMOVE_BULLETIN_VISITOR, removeBulletinVisitorSaga),
  ]);
}
