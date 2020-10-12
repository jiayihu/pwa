import { EventSource } from '../../services/real-time';
import { eventChannel } from 'redux-saga';

export type END_REALTIME = { type: 'END_REALTIME' };

export const isEndMessage = (message: any): message is END_REALTIME =>
  (message as END_REALTIME).type === 'END_REALTIME';

export function createRealTimeChannel<T>(source: EventSource<T>) {
  return eventChannel<T | END_REALTIME>(emit => {
    source.subscribe(data => {
      // If there is no data then it has been deleted probably
      data ? emit(data) : emit({ type: 'END_REALTIME' });
    });

    return () => source.unsubscribe();
  });
}
