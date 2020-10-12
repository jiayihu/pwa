import { all } from 'redux-saga/effects';
import { bulletinsSaga } from './bulletin.sagas';
import { visitorsSaga } from './visitors.sagas';
import { messagesSaga } from './messages.sagas';

export function* rootSaga() {
  yield all([bulletinsSaga(), visitorsSaga(), messagesSaga()]);
}
