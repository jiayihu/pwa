import './QueueHost.scss';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { lockBulletinQueue } from '../../../../store/actions/bulletin.actions';
import {
  subscribeToVisitors,
  unsubscribeToVisitors,
  removeBulletinVisitor,
} from '../../../../store/actions/visitors.actions';
import { Button, Table, Badge } from 'reactstrap';
import { selectBulletinVisitors } from '../../../../store/reducers';
import { Bulletin } from '../../../../types/bulletin';
import { useSubscription } from '../../../../hooks/useSubscription';

export type Props = {
  bulletin: Bulletin;
};

export const QueueHost = (props: Props) => {
  const { bulletin } = props;
  const dispatch = useDispatch();
  const subscription = useMemo(
    () => ({
      selector: selectBulletinVisitors,
      subscribe: () => {
        dispatch(subscribeToVisitors(bulletin.id));
        return () => dispatch(unsubscribeToVisitors(bulletin.id));
      },
    }),
    [bulletin.id, dispatch],
  );
  const visitors = useSubscription(subscription, [bulletin.id]);

  const preferences = bulletin.preferences;
  const isLocked = bulletin.queue.isLocked;

  const orderedVisitors = [...visitors].sort((a, b) =>
    new Date(a.joinDate) > new Date(b.joinDate) ? 1 : -1,
  );

  return (
    <div className="py-3">
      <h3>Visitors</h3>
      <p className="d-flex justify-content-end">
        {isLocked ? (
          <Button
            color="primary"
            size="sm"
            onClick={() => dispatch(lockBulletinQueue(bulletin.id, false))}
          >
            Unlock queue
          </Button>
        ) : (
          <Button
            color="dark"
            size="sm"
            onClick={() => dispatch(lockBulletinQueue(bulletin.id, true))}
          >
            Lock queue
          </Button>
        )}
      </p>
      <Table className="visitors-table" responsive striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orderedVisitors.length ? (
            orderedVisitors.map((visitor, index) => (
              <tr key={visitor.id}>
                <td>{visitor.name}</td>
                <td>
                  {index < preferences.concurrent ? (
                    <Badge color="success">Active</Badge>
                  ) : (
                    <Badge color="dark">Waiting</Badge>
                  )}
                </td>
                <td>
                  <Button
                    color="danger"
                    size="sm"
                    onClick={() => dispatch(removeBulletinVisitor(bulletin.id, visitor.id))}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>There are currently no visitors.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};
