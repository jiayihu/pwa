import { useEffect } from 'react';

export function useEventListener<E extends Event = Event>(
  element: EventTarget,
  eventName: string,
  handler: (event: E) => void,
) {
  useEffect(() => {
    element.addEventListener(eventName, handler as EventListener);

    return () => {
      element.removeEventListener(eventName, handler as EventListener);
    };
  }, [eventName, handler, element]);
}
