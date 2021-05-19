import { useState } from 'react';
import { Alert } from 'reactstrap';
import { useEventListener } from '../../../hooks/useEventListener';

export const OfflineNotification = () => {
  const [isOffline, setIsOffline] = useState(false);

  useEventListener(window, 'offline', () => setIsOffline(true));
  useEventListener(window, 'online', () => setIsOffline(false));

  if (!isOffline) return null;

  return (
    <Alert color="dark">
      <strong>You are offline.</strong> It seems there is a problem with your connection, try to
      reconnect and then reload the page.
    </Alert>
  );
};
