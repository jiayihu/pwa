/* eslint-disable */

import { useCallback, useState } from 'react';
// import { useEventListener } from '../../../hooks/useEventListener';
import { useSelector } from 'react-redux';
import { selectBulletinVisitorId, selectBulletinOwnerId } from '../../../store/reducers';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { differenceInDays } from 'date-fns/esm';

const STORAGE_KEY = 'daisyhub/install-prompt-date';

export const AddToHomeScreen = () => {
  const [isInstallable, setIsInstallable] = useState(false);
  const visitorId = useSelector(selectBulletinVisitorId);
  const ownerId = useSelector(selectBulletinOwnerId);

  // Used to avoid prompting the request again immediately
  const [lastDate, setLastDate] = useLocalStorage({
    key: STORAGE_KEY,
    initialValue: new Date(1970, 0, 1),
    reviver: (_, value) => new Date(value),
  });

  // TODO

  const handleCancel = useCallback(() => {
    setIsInstallable(false);
    setLastDate(new Date());
  }, [setIsInstallable, setLastDate]);
  const handleConfirm = useCallback(() => {
    setIsInstallable(false);

    // TODO
  }, [setIsInstallable]);

  if (!isInstallable) return null;

  const isOpen =
    isInstallable && Boolean(visitorId || ownerId) && differenceInDays(new Date(), lastDate) >= 1;
  const message = visitorId ? "Such as when it's your turn in the queue." : ownerId ? '' : '';

  return (
    <Modal isOpen={isOpen} toggle={handleCancel}>
      <ModalHeader toggle={handleCancel}>Add to the Home screen</ModalHeader>
      <ModalBody>
        <p>
          You can add the application to your Home screen to open it quickly the next time. We're
          sending you as few notifications as possible. {message}
        </p>
      </ModalBody>
      <ModalFooter>
        <Button type="button" color="light" onClick={handleCancel}>
          Cancel
        </Button>{' '}
        <Button type="button" color="success" onClick={handleConfirm}>
          Confirm
        </Button>
      </ModalFooter>
    </Modal>
  );
};
