/* eslint-disable */

import { useCallback, useEffect, useState } from 'react';
import { Button } from 'reactstrap';
// import { urlBase64ToUint8Array } from '../../../utilities/utils';
// import { createPushSubscription } from '../../../services/push-notifications.service';

type Props = {
  bulletinId: string;
};

export const PushNotifications = (props: Props) => {
  const { bulletinId } = props;
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleEnable = useCallback(() => {
    // TODO
  }, []);
  const handleDisable = useCallback(() => {
    /**
     * TO COMPLETE
     */
  }, [bulletinId]);

  useEffect(() => {
    // TODO
  }, [bulletinId, setIsSubscribed]);

  if (!PushNotifications.isSupported()) return null;

  return isSubscribed ? (
    <Button color="dark" size="sm" onClick={handleDisable}>
      Disable notifications
    </Button>
  ) : (
    <Button color="dark" size="sm" onClick={handleEnable}>
      Enable notifications
    </Button>
  );
};

PushNotifications.isSupported = function () {
  return 'serviceWorker' in navigator && 'Notification' in window && window.PushManager;
};
