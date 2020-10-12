import './BulletinHost.scss';
import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  subscribeToBulletin,
  unsubscribeToBulletin,
  deleteBulletin,
} from '../../../../store/actions/bulletin.actions';
import {
  selectBulletin,
  selectIsUnsubBulletin,
  selectBulletinOwnerId,
} from '../../../../store/reducers';
import { useRouteMatch } from 'react-router-dom';
import { Spinner, Button, Alert } from 'reactstrap';
import { BulletinDetails } from '../../BulletinDetails/BulletinDetails';
import { QueueHost } from '../QueueHost/QueueHost';
import { ConfirmModal } from '../../../ui/ConfirmModal/ConfirmModal';
import { MessagesHost } from '../MessagesHost/MessagesHost';
import { useSubscription } from '../../../../hooks/useSubscription';
import { NarrowContainer } from '../../../ui/NarrowContainer/NarrowContainer';

function renderAlert() {
  return (
    <Alert color="dark">
      <h3>Lost connection to the island!</h3>
      <p>
        Whoopsie! Try to refresh the page once or twice,{' '}
        <strong>unless you have deleted the island</strong>.
      </p>
    </Alert>
  );
}

export const BulletinHost = () => {
  const match = useRouteMatch<{ bulletinId: string }>();
  const bulletinId = match.params.bulletinId;
  const ownerId = useSelector(selectBulletinOwnerId);
  const isUnsubscribed = useSelector(selectIsUnsubBulletin);
  const dispatch = useDispatch();
  const subscription = useMemo(
    () => ({
      selector: selectBulletin,
      subscribe: () => {
        dispatch(subscribeToBulletin(bulletinId));
        return () => dispatch(unsubscribeToBulletin(bulletinId));
      },
    }),
    [bulletinId, dispatch],
  );
  const bulletin = useSubscription(subscription, [bulletinId]);

  const [isDeleting, setIsDeleting] = useState(false);

  if (!bulletin || !ownerId) {
    return (
      <NarrowContainer>{isUnsubscribed ? renderAlert() : <Spinner type="grow" />}</NarrowContainer>
    );
  }

  return (
    <NarrowContainer>
      <p className="d-flex justify-content-end">
        <Button color="light">Edit island</Button>
        <Button color="danger" className="ml-3" onClick={() => setIsDeleting(true)}>
          Delete island
        </Button>
      </p>
      <div className="bulletin-host">
        {isUnsubscribed ? renderAlert() : null}
        <BulletinDetails bulletin={bulletin} />
        <QueueHost bulletin={bulletin} />
        <MessagesHost bulletin={bulletin} />
        <p className="f6 text-right">
          Image credits:{' '}
          <a
            href="https://dribbble.com/shots/11137115-Turnip"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cherryink
          </a>
        </p>
      </div>

      {isDeleting ? (
        <ConfirmModal
          isOpen={isDeleting}
          onCancel={() => setIsDeleting(false)}
          onConfirm={() => {
            dispatch(deleteBulletin(bulletinId, ownerId));
            setIsDeleting(false);
          }}
          color="danger"
        >
          Deleting the island will remove it from the website and no further people will receive
          your DODO code.
        </ConfirmModal>
      ) : null}
    </NarrowContainer>
  );
};
